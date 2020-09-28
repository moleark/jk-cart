/* eslint-disable default-case */
/* eslint-disable no-undef */
(function () {
    var ws = null, wo = null;
    var scan = null;
    // H5 plus事件处理
    function plusReady() {
        // 获取窗口对象
        ws = plus.webview.currentWebview();
        wo = ws.opener();
        // 开始扫描
        ws.addEventListener('show', function () {
            scan = new plus.barcode.Barcode('bcid');
            scan.onmarked = onmarked;
            scan.start({ conserve: true, filename: '_doc/barcode/' });
            createSubview();
        }, false);
        // 显示页面并关闭等待框
        ws.show('pop-in');
    }
    document.addEventListener('plusready', plusReady, false);

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
        wo.evalJS("scaned('" + type + "','" + result + "','" + file + "');");
        back();
    }
    // 创建子窗口
    function createSubview() {
        //
    }
    // 从相册中选择二维码图片 
    function scanPicture() {
        plus.gallery.pick(function (path) {
            plus.barcode.scan(path, onmarked, function (error) {
                plus.nativeUI.alert('无法识别此图片');
            });
        }, function (err) {
            console.log('Failed: ' + err.message);
        });
    }

    window.plusBarcode = plusReady
})();