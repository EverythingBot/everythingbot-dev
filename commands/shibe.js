exports.run = async function (client, message, args, mongo) {
var dissapoint = ['http://www.tierversicherung.biz/gallery/images/146091549_ShibaInu1farbkombinat-Fotolia.com.jpg'];
var happy = ['https://myfirstshiba.com/wp-content/uploads/2017/06/kitsu-cheeks_reduced.jpg'];
var half = ['https://vignette.wikia.nocookie.net/doge2048/images/8/8c/Big_Doge.gif/revision/latest?cb=20161105165014'];

var numCorrect;
var tag = message.author.tag;
var question = null;
var questions = ["Is this your username?","Question 2","Question 3", "Question 3"];
var questIndex;

  message.channel.send("Hey! I'm the 𝕊𝕙𝕚𝕓𝕒 𝕀𝕟𝕦 𝕠𝕗 𝕎𝕚𝕤𝕕𝕠𝕞! I'm just gonna ask you some questions. Please answer with `Yes` or `No`", {files:['https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12224408/Shiba-Inu-On-White-03.jpg']}).then (msg => {
    questIndex = Math.floor(Math.random() * questions.length);
    msg.channel.send("First question: " + questions[questIndex]);
  });
}
