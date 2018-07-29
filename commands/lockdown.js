exports.run = (client, message, args, mongo) => {
  var ServerURL = process.env.SERVER;

  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.reply("sorry, you don't have permissions to use this.");

  mongo.connect(ServerURL, function(err, db) {
    if (err) throw err;
    var dbo = db.db("servers");
    var query = {
      "serverID": message.guild.id
    };
    dbo.collection("servers").find(query).toArray(function(err, result) {
      if (err) throw err;
      var serv = result;

      if (args[0] === "on") {
        var serv =  { $set: {  "locked": true  }  };
        dbo.collection("servers").update(query, serv, function(err, res) {
          if (err) throw err;
          message.reply("**lockdown activated!** All members will be muted until the lockdown is deactivated.");
          var u;
          let muteRole = message.guild.roles.find("name", "eBot Mute");
          for (u in message.guild.members) {
            var memb = message.guild.members[u];
            memb.addRole(muteRole.id);
          }
          dbo.close();
        });
      } else if (args[0] === "off") {
        var serv =  { $set: {  "locked": false  }  };
      //  serv.locked = "false";
        dbo.collection("servers").updateOne(query, serv, function(err, res) {
          if (err) throw err;
          message.reply("**lockdown deactivated!** All members will be unmuted");
          for (u in message.guild.members) {
            var memb = message.guild.members[u];
            memb.removeRole(muteRole.id);
          }
          dbo.close();
        });
      }
      db.close();
    });
  });
}
