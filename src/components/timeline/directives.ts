import { watchEffect, reactive } from 'vue';
const renderFlag = (el, binding) => {
    const { flag, timeline, refreshFlag } = binding.value
    const marker = el.querySelector('div.marker');
    Object.assign(el.style, {
        "left": flag["position"] + 'px',
        "height": timeline["flagHeight"]
    })
    Object.assign(marker.style, {
        "top": flag["layer"] + 'px',
        "width": timeline["flagWidth"] + 'px',
        // "background": "background: rgba(79, 251, 223, 0.8);"
    })
}

const dragTimeline = (el, binding) => {
    const { timeline, refreshFlag } = binding.value
    const offset = timeline['offset']
    const offsetOld = timeline['offsetOld']
    const containerWidth = timeline["containerWidth"];
    let animate = null;
    el.animate([{
        left: offsetOld + 'px'
    }, {
        left: offset + 'px'
    }], {
        duration: 550,   // 动画时长
        easing: 'ease-in-out' // 缓动函数，可选
    });


}

export const TimelineFlag = {
    updated(el, binding) {
        renderFlag(el, binding)
    }
}

export const TimelineDrag = {
    updated(el, binding) {
        dragTimeline(el, binding)
    }
}