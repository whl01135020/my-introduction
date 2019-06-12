    $(document).ready(function() {
        var service = {
            BASE_URL: "//activity.eebbk.com/wx-eebbk-speechScore", //正式环境接口地址
            // BASE_URL: "http://activity.eebbk.com/test/wx-eebbk-speechScore", //测试环境接口地址
            ACTNAME: "eebbkSound", //活动后台记录名称
            AUTHOR_URL: "//activity.eebbk.com/wx-server/wxUser/author", //微信授权接口
            USERINFO: null, // 微信用户保存信息
            grade: null,
            gradeName: null,
            dataUrl: null,
            getLinkParam: function(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let paramValue = window.location.search.substr(1).match(reg);
                if (paramValue != null) {
                    return decodeURI(paramValue[2]);
                }
                return null;
            },
            getUserInfo: function(phone, uuID, pd, encryptInfo, callback) {
                callback = callback || function() {};
                if (pd === encryptInfo) {
                    // $.showIndicator();
                    $.ajax({
                        url: service.BASE_URL + "/act/sentence/saveUserInfo",
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        cache: false,
                        data: {
                            actName: service.ACTNAME,
                            alias: "忍住！不能生气！孩子做作业时，家长该怎么办？",
                            phone: encodeURIComponent(Base64.decode(phone)),
                            uuid: encodeURIComponent(Base64.decode(uuID))
                        },
                        dataType: "json",
                        success: function(data) {
                            if (data && data.code === "000001") {
                                callback(data.data);
                            } else {
                                // window.location.href = service.AUTHOR_URL + "?returnUrl=" + encodeURIComponent(encodeURIComponent(location.href)) + "&actName=" + service.ACTNAME;
                            }
                        },
                        error: function(err) {
                            // window.location.href = service.AUTHOR_URL + "?returnUrl=" + encodeURIComponent(encodeURIComponent(location.href)) + "&actName=" + service.ACTNAME;
                        },
                        complete: function() {
                            // $.hideIndicator();
                        }
                    })
                }
            }
        }
        try {
            let ad = service.getLinkParam("ad") ? Base64.decode(service.getLinkParam("ad")) : "";
            let pn = service.getLinkParam("pn") ? Base64.decode(service.getLinkParam("pn")) : "";
            let address = service.getLinkParam("ad") || "";
            let phone = service.getLinkParam("pn") || "";
            let uuID = service.getLinkParam("bs") || "";
            let pd = service.getLinkParam("pd") || "";
            let encryptInfo = md5(Base64.decode(address) + "eebbk" + Base64.decode(phone) + Base64.decode(uuID)).toUpperCase();
            service.getUserInfo(phone, uuID, pd, encryptInfo, function(data) {
                //初始化日志统计相关操作
                $.init({
                    activityName: service.ACTNAME, //日志采集页面名
                    tableName: service.ACTNAME, //日志采集表名
                    openId: service.USERINFO.openId, //添加默认的用户id
                    indexkey: "index" // 用来区分同一个活动不同页面访问前缀
                });
            });
        }
        catch(err)
        {

        }
        collectData("忍住！不能生气！孩子做作业时，家长该怎么办？", "点击页面次数", '忍住！不能生气！孩子做作业时，家长该怎么办？', "忍住！不能生气！孩子做作业时，家长该怎么办？");
        if (!localStorage.getItem('notangry')) {
            collectData("忍住！不能生气！孩子做作业时，家长该怎么办？", "点击页面人数", '忍住！不能生气！孩子做作业时，家长该怎么办？', "忍住！不能生气！孩子做作业时，家长该怎么办？");
            localStorage.setItem('notangry', 1);
        }
        var imgUrl, shareTitle, descContent;
        imgUrl = "https://brand-portals-file.eebbk.com/brand-website/2018/07/04/114501733_75e92a2b715d325e.png";
        shareTitle = "忍住！不能生气！孩子做作业时，家长该怎么办？";
        descContent = "辅导孩子写作业忍不住要生气，怎么办？";
        wxConfig(imgUrl, shareTitle, descContent);
    })