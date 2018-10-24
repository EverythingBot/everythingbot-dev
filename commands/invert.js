exports.run = (client, message, args, mongo) => {

  var Jimp = require('jimp');

  if (message.mentions.members.first()) {
    invertFunction(message, message.mentions.members.first().user.displayAvatarURL);
  } else if (args[0] == null) {
    invertFunction(message, message.author.displayAvatarURL);
  } else invertFunction(message, args[0]);

  function invertFunction(message, im) {
    Jimp.read(im, function(err, image) {
      if (err) {
        console.log(err);
        message.reply('are you sure this is a link?');
        //catch(err);
      } else {
        message.channel.startTyping(1);
        image.invert(function(err, image) {
          image.write("/app/tempPic.png", function(err) {
            if (err) throw err;
            message.channel.send("", {
              files: ["/app/tempPic.png"]
            }).then(message.channel.stopTyping());
          });
        });
      }
    });
  }
}
