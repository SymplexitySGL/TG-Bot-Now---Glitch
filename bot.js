const TelegramBot = require('node-telegram-bot-api');

//const token = '1044681334:AAGPuLOxehSDbaYBhXTiC3Es_JAiKVo8yfw';
require('dotenv').config({path: __dirname + '/.env'})
const token = process.env.TG_TOKEN;
const bot = new TelegramBot(token, {polling: true});

console.log('bot server started...');

let date_ob = new Date();

let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();


var imgurl = "http://www.canacure.co.za/IRFS"+year+month+date + ".jpg"





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

    var strains = "big-bud,trainwreck,green-crack,hindu-kush"








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
        bot.sendMessage(msg.chat.id, "Welcome to our Shop " + user, {
            "ReplyKeyboardRemove": {
                "remove_keyboard": True
                }
            });
        } 
            


        
    if (msg.text.toString().toLowerCase().indexOf(order) === 0) {
        bot.sendMessage(msg.chat.id,"Thank you for your order " + Fname + ". Our store rep will be in contact shortly to confirm your order");
        bot.sendMessage(pchannelid,"Order Alert from " + Fname + " " + Lname + " - " + uname );
        bot.forwardMessage(pchannelid,chatid,ordermsgid)
        } 

     //Evaluate all menu option replies
    
    
    if (txt === 'Menu 🥦') {
        bot.sendPhoto(msg.chat.id,imgurl,{caption : "Here are our strains of the day "} );
        } 
    
    
        if (txt === 'Get Help 🆘') {
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
            "keyboard": [["Menu 🥦", "Get Some 🥦"],   ["Get Help 🆘"], ["Strain Info 🍾"]]
            }
        });
            
        });
   



    
