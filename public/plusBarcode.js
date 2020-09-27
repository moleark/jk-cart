/* eslint-disable default-case */
/* eslint-disable no-undef */
(function () {
    // var wo = null;
    var scan = null;
    // H5 plus事件处理
    function plusReady() {
        scan = new plus.barcode.Barcode('bcid');
        scan.onmarked = onmarked;
        console.log('bcid-start');
        scan.start();
    }
    // document.addEventListener('plusready', plusReady, false);

    // 二维码扫描成功
    function onmarked(type, result, file) {
        switch (type) {
            case plus.barcode.QR:
                type = 'QR';
                break;
            case plus.barcode.EAN13:
                type = 'EAN13';
                break;
            case plus.barcode.EAN8:
                type = 'EAN8';
                break;
            default:
                type = '其它' + type;
                break;
        }
        result = result.replace(/\r\n/g, '');
        console.log('result---------------------------------------------------------', result);
        // wo.evalJS("scaned('" + type + "','" + result + "','" + file + "');");
        // back();
    }

    window.plusBarcode = plusReady
})();