// ==UserScript==
// @name       Twitch GM jQuery
// @namespace  https://github.com/SonOfLysander
// @version    0.428
// @description  Fight for democracy
// @match      http://www.twitch.tv/twitchplayspokemon
// @copyright  2012+, You
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

$(document).ready(function(){
    highlightPeeps();
    setInterval(function(){
        if (isChatConnected()){
            var rnd = Math.random();
            console.log(rnd);
            // I probably should have just iterated over a JSON object for future flexibility.
            // I don't think this wil see much more maintenence as a one-off-chat-bot. Changes
            // might arise in the future though, so we'll see.
            var msg = rnd >= 0.5 ? 'democracy' : rnd >= 0.1 ? 'b' : rnd >= 0.05 ? 'a' : 'select';
            $('#chat_speak').click(); //makes sure that you don't have anything in the "buffer" that will interfere with what we want to bot-in.
            $('#chat_text_input').val(msg);
            $('#chat_speak').click();
        }
    }, 3000);
});

var timeLatencyMark = 0;

function isChatConnected(){
    // This is an odd condictional structure, but it's really due to the
    // fact Twitch has an odd flow that I can't access directly by API with
    // out putting more effort into this script, and less effort into my home-
    // work that matters.
    if ($('#chat_text_input').prop('disabled') == true){
        return false;
    } else if ($('.js-chat_countdown').length == 0){
        return true;
    } else if (parseInt($('.js-chat_countdown:last').text(), 10) == 0 && Date.now() - timeLatencyMark >= 9000){
        return true;               
    } else {
        timeLatencyMark = Date.now();
        return false;
    }
}

function highlightPeeps(){ //Adds CSS styles for myself and one of my friends so I can see the chats as they wiz by.
    hideall();
    // should iterate over JSON, but it's just me and Brian so it's not important.
    // (Maybe if we had our REST server fully setup and needed dynamic content then
    // I'd change my mind.)
    user('sonoflysander');          //me
    user('bjwyxrs', '#BBF');		//my friend brian
}

function hideall(){
    var hdstl = $('<style>ul#chat_line_list li{ display: none; } li.line.fromjtv{ display: block!important; }</style>').appendTo($('html > head')); //hides all the chats.
}
function user(usrnm, hxclr){
    var stl = $('<style>li[data-sender="' + usrnm + '"] { display: block!important;'  + (hxclr !== undefined ? 'background-color: ' + hxclr + ';' : '' ) +  '}</style>');
    $('html > head').append(stl);
}