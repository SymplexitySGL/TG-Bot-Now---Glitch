const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config({path: __dirname + '/.env'})
const token = process.env.TG_TOKEN;
//console.log(token);

var request = require('request');






const bot = new TelegramBot(token, {polling: true});

console.log('bot server started...');

var date_ob = new Date();

var date = ("0" + date_ob.getDate()).slice(-2);

// current month
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
var year = date_ob.getFullYear();

var strains = "big-bud,trainwreck,green-crack,hindu-kush,chemdawg,swazi-gold,durban-poison,super-lemon-haze,purple-punch"
var menucaption = "Here are our strains of the day"
var imgurl = "http://www.canacure.co.za/IRFS"+year+month+date + "-1.jpg"
var imgurlcs = "http://www.canacure.co.za/IFCOMS.jpg"
var unametut = "We have noticed that you do not have a username specified , please specify one in your settings menu (shown above) so we can comunicate in private via telegram";



/*var opts = {
    url :imgurl
};
request.get(opts, function (error, response, body) {
    //Handle error, and body
    
    
if (response && response.statusCode===404){
    
      imgurl=imgurlcs.toString()
    menucaption = "Our daily MENU will be up soon!"} 
});
*/


//console.log(imgurl)


bot.on('message', (msg) => {
    
    var Hi = "hi";
    var Fname = msg.chat.first_name;
    var Lname = msg.chat.last_name;
    var uname = "(@" + msg.chat.username + ")";
    var pchannelid = "-1001256710784";
    var txt = msg.text;
    var order = "order";
    var ordermsgid = msg.message_id;
    var chatid = msg.chat.id

    var unametut = "We have noticed that you do not have a username specified , please specify one in your settings menu (shown above) so we can comunicate in private via telegram";
    var unameimg = "http://www.canacure.co.za/uname.jpg"
 
    



   // if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    //bot.sendMessage(msg.chat.id,"Hi " + Fname);
    //} 

    if (txt === 'Main Menu') {
        bot.sendMessage(msg.chat.id,"Store Menu",{
            "reply_markup": {
                "keyboard": [["Menu 🥦", "Get Some 🥦"],   ["Contact Us 🆘"], ["Strain Info 🍾"]]
                }
            });
       
        } 

    if (strains.includes(msg.text.toString().toLowerCase())) {
        bot.sendMessage(msg.chat.id,"Info on : " + txt + "<a href=\"https://www.leafly.com/strains/" + txt.toLowerCase()+ "\"> HERE</a> ",{parse_mode : "HTML"});
        
        } 
            


        
    if (msg.text.toString().toLowerCase().indexOf(order) === 0) {
        bot.sendMessage(msg.chat.id,"Thank you for your order " + Fname + ". Our store rep will be in contact shortly to confirm your order");
        bot.sendMessage(pchannelid,"Order Alert from " + Fname + " " + Lname + " - " + uname );
        bot.forwardMessage(pchannelid,chatid,ordermsgid)
        } 

     //Evaluate all menu option replies
    
    if (uname === "(@undefined)") {
        bot.sendPhoto(msg.chat.id,unameimg,{caption : unametut});
        
    }  
  
    if (txt === 'Menu 🥦') {
       var date_ob = new Date();

      var date = ("0" + date_ob.getDate()).slice(-2);

      // current month
      var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

      // current year
        var year = date_ob.getFullYear();
        
      var imgurl = "http://www.canacure.co.za/IRFS" + year + month + date + "-1.jpg"
        var imgurlcs = "http://www.canacure.co.za/IFCOMS.jpg"
        //check url
        var request = require('request');
        request(imgurl, function (error, response, body) {

           // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            if (response.statusCode === 404) { bot.sendPhoto(msg.chat.id, imgurlcs, { caption: "Our daily Menu will be up SOON" }); } else { bot.sendPhoto(msg.chat.id, imgurl, { caption: menucaption }); }
        });
            }
    
    
        if (txt === 'Contact Us 🆘') {
            bot.sendMessage(msg.chat.id,"Thank You " + Fname + " . a Message have been send to the store , a store representative will contact you via Telegram shortly");
            bot.sendMessage(msg.chat.id, "The location of our store");    
            bot.sendLocation(msg.chat.id,-25.8422533,28.2433618);
            bot.sendMessage(pchannelid,"Assistance Alert from " + Fname + " " + Lname + " - " + uname );
            } 
    
    
            if (txt === 'Get Some 🥦') {
       var date_ob = new Date();

      var date = ("0" + date_ob.getDate()).slice(-2);

      // current month
      var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

      // current year
        var year = date_ob.getFullYear();
        var imgurl = "http://www.canacure.co.za/IRFS" + year + month + date + "-1.jpg"
        var imgurlcs = "http://www.canacure.co.za/IFCOMS.jpg"
        //check url
        var request = require('request');
        request(imgurl, function (error, response, body) {

           // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            if (response.statusCode === 404) { bot.sendMessage(msg.chat.id, "Hi " + Fname + " .Our daily <a href=\"" + imgurlcs + "\">MENU</a> will be avialable <b>SOON</b>", { parse_mode: "HTML" });} 
            else { bot.sendMessage(msg.chat.id, "Hi " + Fname + " .Feel free to browse the <a href=\"" + imgurl + "\">MENU</a> if you have not yet ,to see what's available . If you are ready please type in your order in the following format : The word <b>ORDER</b> followed by the code and quantity e.g order GC 3 , TW 4", { parse_mode: "HTML" }); }
        });
       
       
       
       // bot.sendMessage(msg.chat.id, "Hi " + Fname + " .Feel free to browse the <a href=\"" + imgurl + "\">MENU</a> if you have not yet ,to see what's available . If you are ready please type in your order in the following format : The word <b>ORDER</b> followed by the code and quantity e.g order GC 3 , TW 4", { parse_mode: "HTML" });

    }
        


               if (txt === 'Strain Info 🍾') {
        bot.sendMessage(msg.chat.id, "Hi " + Fname + " Select one of the strains below for more info", {
            "reply_markup": {
                "keyboard": [["Green-Crack", "Hindu-Kush", "ChemDawg"], ["TrainWreck", "Big-Bud", "Swazi-Gold"],  ["Durban-Poison", "Super-Lemon-Haze", "Purple-Punch"],["Main Menu"]]
            }
        });

    }

    });



    bot.onText(/\/start/, (msg) => {
        var user = msg.chat.first_name
        bot.sendMessage(msg.chat.id, "Welcome to our Shop " + user, {
        "reply_markup": {
            "keyboard": [["Menu 🥦", "Get Some 🥦"],   ["Contact Us 🆘"], ["Strain Info 🍾"]]
            }
        });
            
        });
   



    
