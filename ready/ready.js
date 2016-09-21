var ready = (function () {
    var isReady = false;
    // 标准浏览器
    if (window.addEventListener) {
        return function (callback) {
            if (isReady) {
                callback();
                return;
            }
            // dom树加载完成就会触发该事件
            window.addEventListener('DOMContentLoaded', function () {
                isReady = true;
                callback();
            }, false);
        }
    }
    // ie 需要检测两个地方 onreadystatechange/document.doScroll
    return function (callback) {
        var complete = function () {
            isReady = true;
            callback();
        };
        // 因为在ie里 只绑定onreadystatechange来检测dom树加载是否完成是远远不够的
        document.onreadystatechange = function () {
            if (isReady === false && (document.readyState === 'interactive' || document.readyState === 'complete')) {
                complete();
            }
        };
        setTimeout(function () {
            // 当dom树加载完成的时候，就可以执行这个方法，否则执行出错
            try {
                document.doScroll('left');
                document.onreadystatechange = null;
                isReady === false && complete();
            } catch (ex) {
                setTimeout(arguments.callee, 50)
            }
        }, 50)
    }
})();