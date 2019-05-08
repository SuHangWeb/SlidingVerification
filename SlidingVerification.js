/**
 * 滑动验证
 *
 * @param {*} dom 元素id
 */
function SlidingVerification(dom) {


    /**
     * 引入动态css样式表
     *
     * @param {*} url 路径
     */
    function loadStyle(url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(link);
    }
    loadStyle('SlidingVerification.css');


    /**
     * 选择器封装
     *
     * @param {*} name 选择器名字
     * @returns DOM
     */
    function $(name) {
        if (name.indexOf("#") != -1) {
            return document.getElementById(name.split('#')[1]);
        } else {
            return document.querySelector(name);
        }
    }


    //插入 子DOM
    var _html = '<div class="sv-btn"></div><p class="sv-text">拖动滑块验证</p><div class="sv-bg"></div>';

    //验证 
    var _sv_box = $(dom);
    _sv_box.innerHTML = _html;
    var _sv_btn = $('.sv-btn'); //滑块
    var _sv_text = $('.sv-text'); //文字
    var _sv_bg = $('.sv-bg'); //背景
    var _sv_flag = false; //默认值验证未成功
    _sv_btn.onmousedown = function(event) {
        var downX = event.clientX;
        _sv_btn.onmousemove = function(event) {

            var moveX = event.clientX - downX;
            //最小的移动范围
            if (moveX > 0) {
                this.style.left = moveX + 'px'; //设置滑动块的距离
                _sv_bg.style.width = moveX + 'px'; //设置背景的宽度
                //最大的移动范围
                if (moveX >= _sv_box.offsetWidth - this.offsetWidth) {
                    //验证成功
                    _sv_flag = true;
                    //文字提醒
                    _sv_text.innerText = '通过验证';
                    _sv_text.style.color = '#fff';
                    //事件清除
                    this.onmousedown = null;
                    this.onmousemove = null;
                }
            }
        };
    };


    //鼠标松开
    _sv_btn.onmouseup = function(event) {
        //事件清除
        this.onmousemove = null;
        //判断验证是否成功
        if (_sv_flag) {
            return
        }
        this.style.left = 0; //设置滑动块的距离
        _sv_bg.style.width = 0; //设置背景的宽度
    };
}