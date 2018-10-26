exports.run = (message, mongo, srvURL, clURL, type, oldMessage, oldChan, newChan, client) => {

  mongo.connect(srvURL, {
    useNewUrlParser: true
  }, function(err, db) {
    var dbo = db.db("servers");

    if (message != null)
      var query = {
        "serverID": message.guild.id
      };

    dbo.collection("servers").find(query).toArray(function(err, result) {
      var serv = result[0];
      if (err)
        throw err;

      if (serv.logChannel == null)
        return;

      if (message != null)
        if (message.guild.channels.get(serv.logChannel.toString()) == null)
          return;

      if (type == "delete") {
        var l = message.guild.channels.get(serv.logChannel.toString());

        var loggedMessage = {
          "embed": {
            "color": 16711680,
            "author": {
              "name": `${message.author.username}`,
              "icon_url": `${message.author.displayAvatarURL}`
            },
            "description": `Message sent in ${message.channel.name} was deleted`,
            "fields": [{
              "name": "Message",
              "value": `${message.content}`
            }],
            "timestamp": new Date()
          }
        };

        l.send(loggedMessage);
      }

      if (type == "edit") {
        var l = message.guild.channels.get(serv.logChannel.toString());
        var loggedMessage = {
          "embed": {
            "color": 16776960,
            "author": {
              "name": `${message.author.username}`,
              "icon_url": `${message.author.displayAvatarURL}`
            },
            "description": `Message sent in ${message.channel.name} was edited`,
            "fields": [{
                "name": "Old Message",
                "value": `${oldMessage.content}`
              },
              {
                "name": "New Message",
                "value": `${message.content}`
              }
            ],
            "timestamp": new Date()
          }
        };
        l.send(loggedMessage);
      }
      /*
            if (type == "channelCreate") {
              var l = client.channels.get(oldChan.id);
              var loggedMessage = {
                "embed": {
                  "color": 16776960,
                  "author": {
                    "name": `${oldChan.client.user.username}`,
                    "icon_url": `${oldChan.client.user.displayAvatarURL}`
                  },
                  "description": `Channel was Created`,
                  "fields": [{
                      "name": "Channel ID",
                      "value": `${oldChan.id}`
                    },
                    {
                      "name": "Channel Type",
                      "value": `${oldChan.type}`
                    }
                  ],
                  "timestamp": new Date()
                }
              };
              l.send(loggedMessage);
            }

            if (type == "channelDelete") {
              var l = client.channels.get(oldChan.id);
              var loggedMessage = {
                "embed": {
                  "color": 16711680,
                  "author": {
                    "name": `${oldChan.client.user.username}`,
                    "icon_url": `${oldChan.client.user.displayAvatarURL}`
                  },
                  "description": `Channel was Deleted`,
                  "fields": [{
                      "name": "Channel ID",
                      "value": `${oldChan.id}`
                    },
                    {
                      "name": "Channel Type",
                      "value": `${oldChan.type}`
                    }
                  ],
                  "timestamp": new Date()
                }
              };
              l.send(loggedMessage);
            }
      */
      db.close();
    });
  });
}
