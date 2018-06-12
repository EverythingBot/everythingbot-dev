exports.run = (client, message, args, mongo) => {
  var fs = require('fs');
  var helpMenu = fs.readFileSync('./helpmenu.txt', 'utf8');

  message.channel.send({embed:helpMenu});
}
