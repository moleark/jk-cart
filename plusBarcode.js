/* eslint-disable default-case */
/* eslint-disable no-undef */
(function () {
    if (window.plus) {
        // 在这里调用5+ API 
        onPlusReady();
    } else {// 兼容老版本的plusready事件 
        // 扩展API加载完毕后调用onPlusReady回调函数 
        document.addEventListener("plusready", onPlusReady, false);
    }

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
        alert(text + result);
    }
    function startRecognize() {
        scan = new plus.barcode.Barcode('bcid');
        window.scan = scan;
        scan.onmarked = onmarked;
        startScan()
    }
    function startScan() {
        scan.start();
    }

    function closeScan() {
        scan.close();
        /*
        startRecognize();
        scan.cancel();
        */
    }

    window.plusBarcode = startRecognize
    window.plusBccancel = closeScan

})();