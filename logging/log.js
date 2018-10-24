exports.run = (message, mongo, srvURL, clURL, type, oldMessage) => {

  mongo.connect(srvURL, {
    useNewUrlParser: true
  }, function(err, db) {
    var dbo = db.db("servers");

    var query = {
      "serverID": message.guild.id
    };

    dbo.collection("servers").find(query).toArray(function(err, result) {
      var serv = result[0];
      if (err)
        throw err;

      if (type == "delete") {

      }

      if (type == "edit") {
        console.log("Message edited");
        console.log(serv.logChannel);
        var l = message.guild.channels.get(serv.logChannel.toString());
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
        console.log(`Sent in ${serv.logChannel}`);
      }
      db.close();
    });
  });
}
