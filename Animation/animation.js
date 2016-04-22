;(function () {
    /**
     * 获取元素的样式值
     * @param ele : 元素
     * @param attr : 样式名
     * @returns {*}
     */
    animate.getCss = function (ele, attr) {
        if (window.getComputedStyle) {
            return parseFloat(getComputedStyle(ele)[attr]);
        }
        else {
            if (attr == "opacity") {
                var value = ele.currentStyle.filter;
                var reg = /alpha\(opacity *= *(\d+(\.\d+)?)\)/;
                if (reg.test(value)) {
                    return RegExp.$1 / 100;
                }
                else {
                    return 1;
                }
            }
            return parseFloat(ele.currentStyle[attr]);
        }
    }

    /**
     * 设置元素的样式值
     * @param ele : 元素
     * @param attr : 样式
     * @param value : 值
     */
    animate.setCss = function (ele, attr, value) {
        if (attr == "opacity") {
            ele.style.opacity = value;
            ele.style.filter = "alpha(opacity=" + value * 100 + ")";
        }
        else {
            ele.style[attr] = value + "px";
        }
    }

    /**
     * 设置元素的动画
     * @param ele : 元素
     * @param obj : 运动的参数集合
     * @param duration : 运动的时间
     * @param callback : 运动完的回调函数（可选）
     */
    function animate(ele, obj, duration, callback) {
        var times = 0;
        var interval = 15;
        var oChange = {};
        var oBegin = {};
        var flag = 0;
        for (var attr in obj) {
            var target = obj[attr];
            var begin = animate.getCss(ele, attr);
            var change = target - begin;
            if (change) {
                oBegin[attr] = begin;
                oChange[attr] = change;
                flag++;
            }
        }
        if (flag == 0) {
            return;
        }
        window.clearInterval(ele.timer);
        function step() {
            times += interval;
            if (times < duration) {
                for (var attr in oChange) {
                    var value = times / duration * oChange[attr] + oBegin[attr];
                    animate.setCss(ele, attr, value);
                }
            }
            else {
                for (var attr in oChange) {
                    animate.setCss(ele, attr, obj[attr]);
                }
                window.clearInterval(ele.timer);
                ele.timer = null;
                if (typeof callBack == "function") {
                    callBack.call(ele);
                }
            }
        }
        ele.timer = window.setInterval(step, interval);
    }
})();

/**
 * 示例：
 * var ele = 获得元素
 * var obj = {'left' : 1000, 'height': 300}; 设置运动目标参数集合
 * animate(ele, obj, 1000, function(){console.log("sucess!")})
 * //ele开始运动，运动时间为1s,运动完后打印字符串"sucess";
 */
