let startPoint = Object.create(null);
let isStartMove = false;

/** 判断浏览器是否为移动端 */
const isMobile = (() => {
    var userAgentInfo = navigator.userAgent;
    if (!!userAgentInfo.match(/AppleWebKit.*Mobile.*/) || !!userAgentInfo.match(/AppleWebKit/)) {
        var temp = userAgentInfo.toLowerCase();
        if (temp.indexOf('android') > -1 || temp.indexOf('iphone') > -1 ||
            temp.indexOf('ipad') > -1 || temp.indexOf('windows phone') > -1 ||
            temp.indexOf('blackberry') > -1 || temp.indexOf('hp-tablet') > -1 ||
            temp.indexOf('symbian') > -1 || temp.indexOf('phone') > -1
        ) {
            return true;
        }
    }
    return false;
})();

/** 数字加上单位'px' */
const addUnit = num => num + 'px';

/** 拖动的是不可拖动区域 */
const isPreventDrag = (resEls, el) => {
    if (resEls.includes(el)) return true;
    return resEls.some(resEl => resEl.contains(el));
};

const _downEvent = (el, resEls, e) => {
    if (isPreventDrag(resEls, e.target)) return;

    isStartMove = true;

    let eventType = e.type;
    let offsetX = null;
    let offsetY = null;
    if (eventType === 'touchstart') {
        offsetX = e.touches[0].pageX - el.getBoundingClientRect().left;
        offsetY = e.touches[0].pageY - el.getBoundingClientRect().top;
    } else if (eventType === 'mousedown') {
        offsetX = e.pageX - el.getBoundingClientRect().left;
        offsetY = e.pageY - el.getBoundingClientRect().top;
    }
    startPoint = {
        x: offsetX,
        y: offsetY,
    };
};

const _moveEvent = (el, resEls, e) => {
    if (!isStartMove) return;
    let eventType = e.type;
    let clientX = null;
    let clientY = null;
    if (eventType === 'touchmove') {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else if (eventType === 'mousemove') {
        clientX = e.clientX;
        clientY = e.clientY;
    }
    el.style.left = addUnit(clientX - startPoint.x);
    el.style.top = addUnit(clientY - startPoint.y);
};

const _upEvent = (el, resEls, e) => {
    isStartMove = false;
    startPoint = {
        x: 0,
        y: 0,
    };
};

export default {
    inserted (el, binding, vnode) {
        let resEls = Object.keys(binding.modifiers)
            .filter(ref => !!vnode.context.$refs[ref])
            .map(ref => {
                let refComp = vnode.context.$refs[ref];
                let target = null;
                if (refComp._isVue) target = refComp.$el;
                else if (refComp instanceof HTMLElement) target = refComp;
                return target;
            })
        el.addEventListener(isMobile ? 'touchstart' : 'mousedown', _downEvent.bind(this, el, resEls), false);
        window.addEventListener(isMobile ? 'touchmove' : 'mousemove', _moveEvent.bind(this, el, resEls), false);
        window.addEventListener(isMobile ? 'touchend' : 'mouseup', _upEvent.bind(this, el, resEls), false);
    },
    unbind (el) {
        el.removeEventListener(isMobile ? 'touchstart' : 'mousedown', _downEvent.bind(this, el), false);
        window.removeEventListener(isMobile ? 'touchmove' : 'mousemove', _moveEvent.bind(this, el), false);
        window.removeEventListener(isMobile ? 'touchend' : 'mouseup', _upEvent.bind(this, el), false);
    },
};
