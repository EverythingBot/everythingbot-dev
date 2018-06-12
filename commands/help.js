exports.run = (client, message, args, mongo) => {
  var fs = require('fs');
  var helpMenu = fs.readFileSync('./helpmenu.txt');
  message.channel.send(helpMenu);
}
