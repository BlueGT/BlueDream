(function ($) {
    "use strict";
    console.log("init content-script");

    var message = {type:"background", greeting: "你好，我是content-script呀，我主动发消息给后台！"};
    chrome.runtime.sendMessage(message, function (response) {
        console.log('收到来自后台的回复：' + response);
    });

    // 监听消息
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log(request);
        sendResponse('我已收到你的消息content：' +JSON.stringify(request));
    });

    chrome.storage.local.get({app_id: ''}, function(items) {
        var app_id = items.app_id;

        if(localStorage){
            localStorage.setItem("app_id", app_id);
        }

        if(sessionStorage){
            sessionStorage.setItem("app_id", app_id);
        }
    });
})(jQuery);
