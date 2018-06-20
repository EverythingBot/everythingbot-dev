exports.run = (client, message, args, mongo) => {
var dissapoint = ['http://www.tierversicherung.biz/gallery/images/146091549_ShibaInu1farbkombinat-Fotolia.com.jpg'];
var happy = ['https://myfirstshiba.com/wp-content/uploads/2017/06/kitsu-cheeks_reduced.jpg'];
var half = ['https://vignette.wikia.nocookie.net/doge2048/images/8/8c/Big_Doge.gif/revision/latest?cb=20161105165014'];

var numCorrect;
var tag = message.author.tag;

  message.channel.send("Hey! I'm the Shiba Inu of Wisdom! I'm just gonna ask you some questions.").then(
    message.channel.send("First question: " + tag);
  );


}
