exports.run = async function(client, message, args, mongo) {

  var ServerURL = process.env.SERVER;

  if (message.member.hasPermission("ADMINISTRATOR")) {
    if (args[0] == "welcome" || args[0] == "w")
      welcomeSetup(message, message.author.tag);
    else if (args[0] == "role" || args[0] == "r")
      roleSetup(message, message.author.tag);
    else if (args[0] == "logs" || args[0] == "l")
      logSetup(message, message.author.tag);
    else if (args[0] == "balance" || args[0] == "b")
      balPicSetup(message, args);
    else if (args[0] == "mute" || args[0] == "m")
      muteSetup(message, args);
    else {
      message.reply("available categories are: `welcome, role, logs, mute`");
      message.channel.send("You can also enable/disable sending the balance as a picture with `balance true/false`");
    }
  } else {
    message.reply("you're not allowed to use this command!");
  }

  function welcomeSetup(message, author) {
    message.reply("please reply with your welcome channel").then(message => {
      const filter = m => m.author.tag.includes(author);
      message.channel.awaitMessages(filter, {
          max: 1,
          time: 60000,
          errors: ['time']
        })
        .then(collected => {
          var done = false;

          var query = {
            "serverID": message.guild.id
          };
          var c1 = collected.first().content.toString().replace(/[<#>]/g, '');
          var x = collected.first().content;
          if (message.guild.channels.get(c1)) {
            var ser = {
              $set: {
                "welcomeChannel": c1
              }
            };
            mongo.connect(ServerURL, function(err, db) {
              var dbo = db.db("servers");
              dbo.collection("servers").updateOne(query, ser, function(err, result) {
                if (err)
                  console.log(err);
                else {
                  message.channel.send(`Guild welcome channel set to ${x}`);
                }
                db.close();
              });
            });
          } else {
            message.channel.send("That wasn't a channel! Are you sure you said a channel name? (Ex. `#general`)");
          }
        })
        .catch(collected => {
          if (collected.size < 1)
            message.channel.send("Setup cancelled, you took longer than 1 minute!");
        });
    });
  }

  function logSetup(message, author) {
    message.reply("please reply with your log channel").then(message => {
      const filter = m => m.author.tag.includes(author);
      message.channel.awaitMessages(filter, {
          max: 1,
          time: 60000,
          errors: ['time']
        })
        .then(collected => {
          var done = false;

          var query = {
            "serverID": message.guild.id
          };
          var c1 = collected.first().content.toString().replace(/[<#>]/g, '');
          var x = collected.first().content;
          if (message.guild.channels.get(c1)) {
            var ser = {
              $set: {
                "logChannel": c1
              }
            };
            mongo.connect(ServerURL, function(err, db) {
              var dbo = db.db("servers");
              dbo.collection("servers").updateOne(query, ser, function(err, result) {
                if (err)
                  console.log(err);
                else {
                  message.channel.send(`Guild logging channel set to ${x}`);
                }
                db.close();
              });
            });
          } else {
            message.channel.send("That wasn't a channel! Are you sure you said a channel name? (Ex. `#general`)");
          }
        })
        .catch(collected => {
          if (collected.size < 1)
            message.channel.send("Setup cancelled, you took longer than 1 minute!");
        });
    });
  }

  function roleSetup(message, author) {
    const filter = m => m.author.tag.includes(author);
    message.reply("please reply with your default role").then(message => {
      message.channel.awaitMessages(filter, {
          max: 1,
          time: 60000,
          errors: ['time']
        })
        .then(collected => {
          var done = false;

          var query = {
            "serverID": message.guild.id
          };

          var c = collected.first().content.toString().replace(/[<#>]/g, '');
          var x = collected.first().content;
          var role = c.first().content.toString();

          if (message.channel.guild.roles.exists("name", x)) {

            var ser = {
              $set: {
                "welcomeRole": x
              }
            };
            mongo.connect(ServerURL, function(err, db) {
              var dbo = db.db("servers");
              dbo.collection("servers").updateOne(query, ser, function(err, result) {
                if (err)
                  console.log(err);
                else {
                  message.channel.send(`Guild default role set to ${x}`);
                }
                db.close();
              });
            });
          } else {
            message.channel.send("That wasn't a role! Are you sure you said a role? (Ex. `Members`)");
          }
        })
        .catch(collected => {
          if (collected.size < 1)
            message.channel.send("Setup cancelled, you took longer than 1 minute!");
        });
    });
  }

  function balPicSetup(message, args) {

    if (args[1] == null) {
      message.reply("correct command usage example: `e!setup balance true`");
      return;
    }

    var final = false;

    if (args[1] == "true" || args[1] == "enable" || args[1] == "enabled")
      final = true;
    else if (args[1] == "false" || args[1] == "disable" || args[1] == "disabled")
      final = false;

    mongo.connect(ServerURL, function(err, db) {
      var dbo = db.db("servers");

      var query = {
        "serverID": message.guild.id
      };

      var ser = {
        $set: {
          "balPic": final
        }
      };

      dbo.collection("servers").updateOne(query, ser, function(err, result) {
        if (err)
          console.log(err);
        else {
          if (final)
            message.channel.send("Balance picture: `enabled`");
          else
            message.channel.send("Balance picture: `disabled`");
        }
        db.close();
      });
    });
  }
}

function muteSetup(message, args) {
  const filter = m => m.author.tag.includes(message.author.tag);
  message.reply("enabling this function will allow EverythingBot to create a role named `eBot Mute` (if needed) and add channel overrides. If you accept, reply `Yes`. If you do not accept this, do not reply, or reply `No`. This command will expire in two minutes.").then(msg => {
    msg.channel.awaitMessages(filter, {
        max: 1,
        time: 120000,
        errors: ['time']
      })
      .then(collected => {
        console.log(collected.first().content.toLowerCase());
        if (collected.first().content.toLowerCase() == "yes")
          updateMute(msg, true);
        else
          updateMute(msg, false);
      }).catch(collected => {
        if (collected.size < 1) {
          updateMute(msg, false);
          msg.channel.send("Command expired.");
        }
      });
  });
}

function updateMute(m, state) {

  var query = {
    "serverID": m.guild.id
  };

  var ser = {
    $set: {
      "canMute": state
    }
  };

  mongo.connect(ServerURL, function(err, db) {
    var dbo = db.db("servers");

    console.log(state);

    if (state == true)
      m.channel.send("EverythingBot will now take care of adding channel overrides for the `eBot Mute` role");
    else
      m.channel.send("EverythingBot will not add channel overrides for the `eBot Mute` role");

    dbo.collection("servers").updateOne(query, ser, function(err, result) {
      if (err)
        console.log(err);

      console.log("Updated");
      db.close();
    });
  });
}

/*
  function setup(message, author) {
    message.reply("please reply with your welcome channel").then(message => {
        const filter = m => m.author.tag.includes(author);
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 60000,
            errors: ['time']
          })
          .then(collected => {
            var done = false;

            var query = {
              "serverID": message.guild.id
            };
            var c1 = collected.first().content.toString().replace(/[<#>]/g, '');
            var x = collected.first().content;
            if (message.guild.channels.get(c1)) {
              //ser.welcomeChannel = c;
              message.channel.send("Now send the name of the role you want people to get when they join").then(message => {
                const filter2 = m => m.author.tag.includes(author);
                message.channel.awaitMessages(filter2, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                  })
                  .then(c => {
                    //console.log(c.first().content);
                    var role = c.first().content.toString();
                    //console.log(message.channel.guild.roles.exists("name", role));
                    if (message.channel.guild.roles.exists("name", role)) {
                      //  ser.welcomeRole = role;
                      message.channel.send('Guild default role set to `' + role + '`');
                      message.channel.send(`Guild welcome channel set to ${x}`);
                      message.channel.send("Setup complete! (For now)");
                      var ser = {
                        $set: {
                          "welcomeRole": role,
                          "welcomeChannel": c1
                        }
                      };
                      mongo.connect(ServerURL, function(err, db) {
                        var dbo = db.db("servers");
                        dbo.collection("servers").updateOne(query, ser, function(err, result) {
                          if (err)
                            console.log(err);
                          db.close();
                        });
                      });
                    } else {
                      message.channel.send("That's not a valid role!");
                    }
                  })
                  .catch(c => {
                    if (c.size < 1) {
                      message.channel.send("Setup cancelled, you took longer than 1 minute!");
                    }
                  });
              });
            } else {
              message.channel.send("That wasn't a channel! Are you sure you said a channel name? (Ex. `#general`)");
            }
          });
      })
      .catch(collected => {
        if (collected.size < 1)
          message.channel.send("Setup cancelled, you took longer than 1 minute!");
      });
  }
}
*/
