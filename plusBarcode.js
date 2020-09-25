/* eslint-disable default-case */
/* eslint-disable no-undef */
(function () {

    var plusReady = function (callback) {
        if (window.plus) {
            callback();
        } else {
            document.addEventListener('plusready', callback);
        }
    }

    /* --------- */
    // 扩展API加载完毕后调用onPlusReady回调函数 
    // document.addEventListener("plusready", onPlusReady, false);
    // 扩展API加载完毕，现在可以正常调用扩展API
    // 扩展API加载完毕后调用onPlusReady回调函数 
    document.addEventListener("plusready", onPlusReady, false);
    // 扩展API加载完毕，现在可以正常调用扩展API
    function onPlusReady() {
        var e = document.getElementById("scan");
        e.removeAttribute("disabled");
    }
    var scan = null;
    function onmarked(type, result) {
        var text = '未知: ';
        switch (type) {
            case plus.barcode.QR:
                text = 'QR: ';
                break;
            case plus.barcode.EAN13:
                text = 'EAN13: ';
                break;
            case plus.barcode.EAN8:
                text = 'EAN8: ';
                break;
        }
        result = result.replace(/\n/g, '');
        console.log('result---', result);
        if (result.indexOf('http://') == 0 || result.indexOf('https://') == 0) {
            plus.nativeUI.confirm(result, function (i) {
                if (i.index == 0) {
                    // self.back() // 返回上个页面

                    plus.runtime.openURL(result)
                    console.log(result) // 扫出来的值
                    t.scan.close() //扫码成功后关闭扫码
                    t.$router.push({ path: 'Info', query: { id: result } })   // 跳转到对应的页面 
                } else {
                    // self.back() // 返回上个页面
                    console.log(result)
                    t.scan.close()
                    window.localStorage.scan = result
                    t.$router.push({ path: 'Info', query: { id: result } })
                }
            }, '', ['打开', '取消'])
        } else {
            // self.back() // 返回上个页面
            console.log(result)
        }
    }
    function startRecognize() {
        scan = new plus.barcode.Barcode('bcid');
        startScan();
        scan.onmarked = onmarked;
    }
    function startScan() {
        scan.start();
        console.log('start');
    }

    window.plusBarcode = startRecognize// open;
})();