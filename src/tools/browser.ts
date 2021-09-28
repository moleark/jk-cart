/* eslint-disable */
export let browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1,                            //IE内核
            presto: u.indexOf('Presto') > -1,                              //opera内核
            webKit: u.indexOf('AppleWebKit') > -1,                         //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,    //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),                    //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),               //ios终端
            android: u.indexOf('Android') > -1, //android终端或者uc浏览器
            uc: u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1,                              //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1,                                  //是否iPad
            webApp: u.indexOf('Safari') === -1,                             //是否web应该程序，没有头部与底部
            html5Plus: u.indexOf('Html5Plus') > -1                      //是否微信 （2015-01-22新增）
        };
    }()
};

export let xs = (function () {

    function getViewportSize(w?: any) {
        w = w || window;
        if (w.innerWidth != null) return { w: w.innerWidth, h: w.innerHeight };
        var d = w.document;
        if (document.compatMode === "CSS1Compat")
            return { w: d.documentElement.clientWidth, h: d.documentElement.clientHeight };
        return { w: d.body.clientWidth, h: d.body.clientHeight };
    }
    return getViewportSize().w < 576;
})();

export let xsOrIpad = xs || browser.versions.iPad;