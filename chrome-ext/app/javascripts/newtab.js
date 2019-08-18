(function($) {
    "use strict";
    console.log("init newtab");

    var slideSwitch = function () {
        var curr = $('.slideshow .slideshow-image.active');
        var imgArr = $('.slideshow .slideshow-image');
        var next = $(imgArr[getRandomInteger(0, imgArr.length -1)]);
        var clsArr = [
            "rotate", "rotateX", "rotateY", "rotate_reverse", "scale_half", "scale" , "scaleX", "scaleY" ,
            "skew", "skewX" , "skewY", "skew_reverse", "skewX_reverse" , "skewY_reverse",
            "translate_right", "translate_left", "translate_up", "translate_down", "translate_right_up", "translate_right_down", "translate_left_up", "translate_left_down",
            "transform_right_up", "transform_right_down", "transform_left_up", "transform_left_down"
        ];
        var cls = "transition_" + clsArr[getRandomInteger(0, clsArr.length -1)];
        curr.addClass("last-active").addClass(cls);

        next.css({opacity: 0.0}).addClass('active').animate({opacity: 1.0}, 2000, function() {
            curr.removeClass('active last-active').removeClass(cls);
        });
    };

    var createQrcode = function(text){
        $('#page_qrcode').empty();
        if(text){
            $('#page_qrcode').qrcode({
                render: "canvas",
                width: "500",
                height: "500",
                text: text
            });
        }
    };

    setInterval(function(){
        slideSwitch();
    }, 4000);

    $("#page_tab_barcode").click(function(){
        chrome.storage.local.get({app_id: ''}, function(items) {
            var app_id = items.app_id;
            createQrcode(app_id);
            $('#page_qrcode').attr("app_id", app_id);
            $("#page_show_barcode").modal("show");
        });
    });

    $("#page_show_download").click(function(){
        var app_id = $('#page_qrcode').attr("app_id");
        var canvas = $("#page_qrcode canvas").get(0);
        convertCanvasToImage(app_id, canvas);
    });

    var convertCanvasToImage = function (app_id, canvas) {
        var url = canvas.toDataURL("image/png");
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = app_id + ".png";
        //执行下载
        a.click();
    };

    /**
     * 返回min（包含）～ max（包含）之间的随机数字
     * @param min
     * @param max
     * @returns {*}
     */
    var getRandomInteger = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    };

})(jQuery);
