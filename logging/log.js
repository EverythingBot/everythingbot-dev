exports.run = (message, mongo, srvURL, clURL, type, oldMessage) => {

  mongo.connect(srvURL, {
    useNewUrlParser: true
  }, function(err, db) {
    var dbo = db.db("servers");

    var query = {
      "serverID": message.guild.id
    };
    dbo.collection("servers").find(query).toArray(function(err, result) {
      if (err)
        throw err;

      if (type == "delete") {
        if (message.guild.channels.get(result.logChannel)) {

        }
      }

      if (type == "edit") {
        console.log("Message edited");
        var l = message.guild.channels.get(result.logChannel);
        var loggedMessage = {
          embed: {
            color: 3447003,
            description: `Message sent by ${message.author.id} was edited`,
            fields: [{
                name: "Old Message",
                value: `${oldMessage.content}`
              },
              {
                name: "New Message",
                value: `${message.content}`
              }
            ]
          }
        };
        l.send(loggedMessage);
        console.log(`Sent in ${result.logChannel}`);
      }
      db.close();
    });
  });
}
