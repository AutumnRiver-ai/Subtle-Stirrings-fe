<template>
    <div id="timeline_container">
        <div id="toolbox">
            <HomeTwoTone :style="{ fontSize: '20px' }" @click="toolClick('home')" />
            <PlusCircleTwoTone :style="{ fontSize: '20px' }" @click="toolClick('magnify')" />
            <MinusCircleTwoTone :style="{ fontSize: '20px' }" @click="toolClick('reduce')" />
        </div>
        <div class="baseline_v"></div>
        <div class="baseline_h"></div>
        <div class="dragable_container" :style="{ left: timeline.offset + 'px' }"
            v-TimelineDrag="{ timeline: timeline, refreshFlag: refreshFlag }" @mousedown="onDragStart"
            @mousemove="onDragMove" @mouseup="onDragEnd">
            <div class="flagwraper">
                <div v-for="(flag, index) in flags" :key="index"
                    v-TimelineFlag="{ flag: flag, timeline: timeline, refreshFlag: refreshFlag }" class="timeflag"
                    @click="clickFlag(index)">
                    <div class="marker" :class="{ 'marker_active': index == timeline.activeFlag }">
                        <img class="icon" :src=iconURL>
                        <div class='content'>{{ flag['title'] }}</div>
                    </div>
                    <div class="pole">
                        <div class="poleheader"></div>
                        <div class="polefooter"></div>
                    </div>
                </div>

                <div v-for="(rulermarker, i) in timeline.rulerMarkers" :key="i" class="rulermarker"
                    :style="{ left: rulermarker.position + 'px' }"
                    :class="{ 'year_type': rulermarker.timeType == 'year' }">
                    {{ rulermarker.content }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import axios from 'axios';
import timelineConfig from '@/components/timeline/timeline.config.js';
import iconURL from '@/assets/icon.jpg';
import { renderTimeline } from '@/components/timeline/renderTimeline';
import { PlusCircleTwoTone, MinusCircleTwoTone, HomeTwoTone } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()

const timelineData = timelineConfig;
const flags = timelineData["flags"];
const timeline = timelineData["timeline"];
const refreshFlag = ref(true)
const store = useStore();
const testID = ref(1);
const vm = new renderTimeline()


onMounted(() => {
    renderFlags();
    // setTimeout(()=>{
    //     clickFlag(0);
    // }, 50)

    // auto()
})

const renderFlags = () => {
    vm.render(timelineData);
    refreshFlag.value = !refreshFlag.value
}
const clickFlag = (index) => {
    goToFlag(index);
    refreshFlag.value = !refreshFlag.value
    const flag = flags[index]
    store.commit('updateLocation', flag['location']);
    store.commit('updateContent', {
        'content': flag['content'],
        'img': flag['img']
    });
};

const goToFlag = (index) => {
    timeline.activeFlag = index;
    vm.positionFlags(timelineData);
    timeline.init = true;
};

const toolClick = (type) => {
    const factor = 1.5
    if (type === 'magnify') {
        timelineData.timeline.ruler *= factor;
        timelineData.timeline.rulerNum *= factor
    } else if (type === 'reduce') {
        timelineData.timeline.ruler /= factor;
        timelineData.timeline.rulerNum /= factor
    } else if (type === 'home') {
        router.replace({
            name: 'news'
        })
    }
    renderFlags();
};

const auto = () => {
    let index = 0
    let intervalId = setInterval(() => {
        clickFlag(index);
        index = (index + 1) % flags.length;
    }, 5000);
}

// 拖动事件
let isDragging = false;
let startX = 0;

const onDragStart = (event) => {
    isDragging = true;
    startX = event.clientX;
};

const onDragMove = (event) => {
};

const onDragEnd = () => {
    isDragging = false;
};

</script>

<style scoped>
#timeline_container {

    position: absolute;
    bottom: 0px;
    /* background: rgba(50,147,230, 1); */
    background: linear-gradient(to right top, rgba(100,200,199, 1), rgba(50,147,230, 1));
    /* background-image: url('@/assets/background.jpg');
    background-repeat: repeat-x;
    background-color: rgba(31, 180, 250, 0.8);
    background-blend-mode: overlay; */
    width: 100%;
    height: 220px;
    overflow: hidden;

    #toolbox {
        position: absolute;
        top: 50%;
        transform: translate(0%, -50%);
        /* 使用translate属性水平垂直居中 */
        font-size: 12px;
        height: 70%;
        width: 30px;
        background: rgba(253, 254, 240, 0.8);
        z-index: 100;
        display: flex;
        flex-direction: column;
        /* 设置子元素纵向排列 */
        justify-content: space-between;
        padding: 20px 0;
        box-shadow: 6px 6px 2px #ccc;
    }

    .baseline_v {
        position: absolute;
        height: 190px;
        width: 1.3px;
        left: 50%;
        background: rgb(0, 0, 0, 0.8);
        z-index: 100;
    }

    .baseline_h {
        position: absolute;
        bottom: 28px;
        height: 1px;
        width: 100%;
        left: 0;
        background: rgba(225, 225, 225, 0.3);
        z-index: 100;
    }

    .dragable_container {
        cursor: move;
        position: absolute;
        height: 215px;

        .rulermarker {
            font-size: 8px;
            position: absolute;
            bottom: 0px;
            z-index: 1000;
            height: 14px;
            line-height: 12px;
            color: rgba(255, 255, 255, 0.95);
            text-align: center;
            left: 50%;
            width: 65px;

            &::after {
                content: "";
                position: absolute;
                background: rgba(225, 225, 225, 1);
                width: 1px;
                height: 6px;
                bottom: 18px;
                left: 50%;

            }
        }

        .year_type {
            font-size: 10px;
            width: 100px;
            height: 14px;
            color: rgba(225, 225, 225, 1);
            &::after {
                content: "";
                position: absolute;
                background: rgba(225, 225, 225, 1);
                width: 2px;
                height: 8px;
                bottom: 16px;
                left: 50%;

            }
        }

        .flagwraper {
            height: 200px;

            .timeflag {
                cursor: pointer;
                position: absolute;

                .marker {
                    /* border: #fff solid 3px; */
                    position: absolute;
                    border-radius: 5px;
                    background: rgba(167,247,139,0.5);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .icon {
                        margin: 4px;
                        width: 30px;
                        height: auto;
                    }

                    .content {
                        padding: 0 10px;
                        text-align: left;
                        width: 100%;
                        font-size: 14px;
                        font-weight: bold;
                        line-height: 40px;
                    }
                }

                .marker_active {
                    background: rgba(167,247,139,0.8);
                }

                .pole {
                    width: 1px;
                    position: absolute;
                    height: 190px;
                    top: 0;
                    background: rgba(0, 0, 0, 0.1);
                    z-index: 101;

                    .polefooter {
                        position: relative;
                        top: 190px;
                        left: -1.5px;
                        width: 4px;
                        height: 4px;
                        border-radius: 2px;
                        background: rgb(0, 0, 0);
                    }

                    .poleheader {
                        position: absolute;
                        top: 0px;
                        width: 0px;
                        left: -40px;
                        height: 6px;
                        background: rgba(0, 0, 0, 0.6);
                    }
                }
            }
        }
    }
}

#testbtn {
    background: rgb(31, 180, 250);
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    width: 130px;
    margin: 60px auto;
}
</style>