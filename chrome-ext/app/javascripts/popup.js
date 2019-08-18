(function ($) {
    "use strict";
    console.log("init popup");

    /**
     * badge 是在图标上显示一些文本，可以用来更新一些小的扩展状态提示信息。
     * 因为badge空间有限，所以只支持4个以下的字符（英文4个，中文2个）。
     * badge无法通过配置文件来指定，必须通过代码实现，设置badge文字和背景颜色
     */
    chrome.browserAction.setBadgeText({text: '2'});
    chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});

    $("#page_popup_edit").click(function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var message = {cmd: 'test', value: '你好，我是popup！'}
            chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
                console.log('来自content的回复：' + response);
            });
        });
    });

    // 监听消息
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log(request);
        sendResponse('我已收到你的消息popup：' +JSON.stringify(request));
    });
})(jQuery);
