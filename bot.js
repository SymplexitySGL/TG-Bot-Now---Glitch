const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config({path: __dirname + '/.env'})
const token = process.env.TG_TOKEN;
//console.log(token);

var request = require('request');





//const token = '955655196:AAH-XO8-72f-JxMlYdaa83_QyYWO4-cFtRw'
const bot = new TelegramBot(token, {polling: true});

console.log('bot server started...');

let date_ob = new Date();

let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

var strains = "big-bud,trainwreck,green-crack,hindu-kush"
var menucaption = "Here are our strains of the day"
var imgurl = "http://www.canacure.co.za/IRFS"+year+month+date + ".jpg"
var imgurlcs = "http://www.canacure.co.za/IFCOMS.jpg"




var opts = {
    url :imgurl
};
request.get(opts, function (error, response, body) {
    //Handle error, and body
    
    
if (response && response.statusCode===404){
    
      imgurl=imgurlcs.toString()
    menucaption = "Our Menu will be up soon!"} 
});



console.log(imgurl)


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

   

    



   // if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    //bot.sendMessage(msg.chat.id,"Hi " + Fname);
    //} 

    if (txt === 'Main Menu') {
        bot.sendMessage(msg.chat.id,"Store Menu",{
            "reply_markup": {
                "keyboard": [["Menu 🥦", "Get Some 🥦"],   ["Get Help 🆘"], ["Strain Info 🍾"]]
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
    
    
    if (txt === 'Menu 🥦') {
        bot.sendPhoto(msg.chat.id,imgurl,{caption : menucaption} );
        } 
    
    
        if (txt === 'Contact Us 🆘') {
            bot.sendMessage(msg.chat.id,"Thank You " + Fname + " . a Message have been send to the store , a store representative will contact you via Telegram shortly");
            bot.sendMessage(msg.chat.id, "The location of our store");    
            bot.sendLocation(msg.chat.id,-25.8422533,28.2433618);
            bot.sendMessage(pchannelid,"Assistance Alert from " + Fname + " " + Lname + " - " + uname );
            } 
    
    
            if (txt === 'Get Some 🥦') {
                bot.sendMessage(msg.chat.id,"Hi " + Fname + " .Feel free to browse the <a href=\""+imgurl+"\">MENU</a> if you have not yet ,to see what's available . If you are ready please type in your order in the following format : The word <b>ORDER</b> followed by the code and quantity e.g order GC 3 , TW 4",{parse_mode : "HTML"});
               
                } 
        


                if (txt === 'Strain Info 🍾') {
                    bot.sendMessage(msg.chat.id,"Hi " + Fname + "Select one of the strains below for more info",{
                        "reply_markup": {
                            "keyboard": [["Green-Crack", "Hindu-Kush"],   ["TrainWreck", "Big-Bud"] ,["Main Menu"]]
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
   



    
