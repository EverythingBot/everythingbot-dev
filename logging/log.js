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
        if(message.guild.channels.get(serv.logChannel.toString()) == null)
          return;

        var l = message.guild.channels.get(serv.logChannel.toString());

        var loggedMessage = {
          embed: {
            color: 16711680,
            description: `Message sent by ${message.author.username} in ${message.channel.name} was deleted`,
            fields: [{
                name: "Message",
                value: `${message.content}`
              }
            ]
          }
        };

        l.send(loggedMessage);

      //  l.send(`Message sent by ${message.author.username} was deleted`);
      //  l.send(message.content);
      }

      if (type == "edit") {
        if(message.guild.channels.get(serv.logChannel.toString()) == null)
          return;
        var l = message.guild.channels.get(serv.logChannel.toString());
        var loggedMessage = {
          embed: {
            color: 16776960,
            description: `Message sent by ${message.author.username} in ${message.channel.name} was edited`,
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
      }
      db.close();
    });
  });
}
