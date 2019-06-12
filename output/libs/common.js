/**
 * 微信分享配置方法
 * @param  {String} imgUrl      分享图标地址
 * @param  {String} shareTitle  分享标题
 * @param  {String} descContent 分享描述
 * @return {[type]}             [description]
 */
function wxConfig(imgUrl, shareTitle, descContent) {
    var lineLink = location.href;
    var url = "https://activity.eebbk.com/wx-server/wxServer/jsconfig";
    $.ajax({
        url: url,
        type: "get",
        async: false,
        cache: true,
        data: {
            actName: "eebbkSound",
            url: location.href
        },
        dataType: "jsonp",
        jsonp: "jsoncallback",
        success: function(data) {
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
            });
        }
    });
    wx.ready(function() {
        wx.checkJsApi({
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
            success: function(res) {}
        });
        wx.onMenuShareAppMessage({
            title: shareTitle,
            desc: descContent,
            link: lineLink,
            imgUrl: imgUrl,
            type: 'link',
            dataUrl: '',
            success: function() {

            },
            cancel: function() {},
            fail: function(res) {}
        });

        wx.onMenuShareTimeline({
            title: shareTitle,
            link: lineLink,
            imgUrl: imgUrl,
            success: function() {

            },
            cancel: function() {},
            fail: function(res) {}
        });
    });
}

/**
 * 大数据收集方法
 * @param  {String} moduleDetail 模块名称
 * @param  {String} functionName 操作行为
 * @param  {String} storeInfo    售点信息
 * @param  {String} sourceType   售点类型
 * @return {[type]}              [description]
 */
function collectData(moduleDetail, functionName, storeInfo, sourceType) {
    $.ajax({
        type: "GET",
        url: "//datacollection.eebbk.net/data/collect",
        data: {
            moduleName: "名师辅导班-服务器端",
            moduleDetail: moduleDetail,
            functionName: functionName,
            extend: JSON.stringify({
                "storeInfo": storeInfo,
                "sourceType": sourceType
            })
        },
        success: function(data) {}
    });
}

/**
 * 获取链接参数值
 * @param  {String} name 参数名称
 * @return {[type]}      [description]
 */
function getLinkParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let paramValue = window.location.search.substr(1).match(reg);
    if (paramValue != null) {
        return decodeURI(paramValue[2]);
    }
    return null;
}