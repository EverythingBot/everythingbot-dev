exports.run = async function (client, message, args, mongo) {
var dissapoint = 'http://www.tierversicherung.biz/gallery/images/146091549_ShibaInu1farbkombinat-Fotolia.com.jpg';
var happy = 'https://myfirstshiba.com/wp-content/uploads/2017/06/kitsu-cheeks_reduced.jpg';
var half = 'https://vignette.wikia.nocookie.net/doge2048/images/8/8c/Big_Doge.gif/revision/latest?cb=20161105165014';

var numCorrect;
var curQuestion;
var users = message.guild.members.array();
var tag;
var question = null;
var questions = ["Is your username ","Question 2","Question 3", "Question 3"];
var questIndex;
var author = message.author.tag;
var a = message.author.username;

  message.channel.send("Hey! I'm the 𝕊𝕙𝕚𝕓𝕒 𝕀𝕟𝕦 𝕠𝕗 𝕎𝕚𝕤𝕕𝕠𝕞! I'm just gonna ask you some questions. Please answer with `Yes` or `No`", {files:['https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12224408/Shiba-Inu-On-White-03.jpg']}).then (msg => {
    //questIndex = Math.floor(Math.random() * questions.length);
    console.log(users[Math.floor(Math.random() * users.length)].user.username);
    tag = users[Math.floor(Math.random() * users.length)].user.username;
    questIndex=0;
    if(questIndex == 0) {
      const filter = m => m.author.tag.includes(author);
      msg.channel.send("First question:\r\n `" + questions[0] + tag + "?`");
      message.channel.awaitMessages(filter, {
          max: 1,
          time: 60000,
          errors: ['time']
        })
        .then(c => {
          //console.log(c.first().content);
          if(tag == a && c.toLowerCase() == "yes"){
            message.channel.send ("Good job!" {files:[happy]});
          } else if(tag != a && c.toLowerCase() == "no"){
            message.channel.send ("Good job!" {files:[happy]});
          } else {
            message.channel.send ("Wow... That's wrong." {files:[dissapoint]});
          }
          //console.log(message.channel.guild.roles.exists("name", role));

        })
        .catch(c => {
          if (c.size < 1) {
            message.channel.send("Ok, I guess...", {files:[half]});
          }
        });
    }
  });

}
