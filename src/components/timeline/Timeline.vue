<template>
    <div id="timeline_container">
        <div id="toolbox">
            <HomeTwoTone :style="{ fontSize: '20px' }" @click="toolClick('home')" />
            <PlayCircleTwoTone :style="{ fontSize: '20px' }" @click="toolClick('play')" v-if="!recording" />
            <PauseCircleTwoTone :style="{ fontSize: '20px' }" @click="toolClick('stop')" v-if="recording" />
            <PlusCircleTwoTone :style="{ fontSize: '20px' }" @click="toolClick('magnify')" />
            <MinusCircleTwoTone :style="{ fontSize: '20px' }" @click="toolClick('reduce')" />
        </div>
        <div class="baseline_v" :style="{ left: `${timeline['baseLineOffset'] * 100}%` }"></div>
        <div class="baseline_h"></div>
        <div class="dragable_container" :style="{ left: timeline.offset + 'px' }"
            v-TimelineDrag="{ timeline: timeline, refreshFlag: refreshFlag }">
            <div class="flagwraper">
                <div v-for="(flag, index) in flags" :key="index"
                    v-TimelineFlag="{ flag: flag, timeline: timeline, refreshFlag: refreshFlag, index: index }"
                    class="timeflag" @click="clickFlag(index)">
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

<script setup lang='ts'>
import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import axios from 'axios';
import timelineConfig from '@/components/timeline/timeline.config.js';
import iconURL from '@/assets/icon.jpg';
import { renderTimeline } from '@/components/timeline/renderTimeline.js';
import { PlusCircleTwoTone, MinusCircleTwoTone, HomeTwoTone, PlayCircleTwoTone, PauseCircleTwoTone } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { recordVideo, stopRecordVideo } from '@/utils/record.js';
const ANIMATEDURATION = 2700 + 2000 + 550
const router = useRouter()

const timelineData = timelineConfig;
const flags = timelineData["flags"];
const timeline = timelineData["timeline"];
const refreshFlag = ref(true)
const store = useStore();
let recording = ref(false);
const vm = new renderTimeline()


onMounted(() => {
    renderFlags();
    // setTimeout(()=>{
    //     clickFlag(0);
    // }, 50)

    // play()
})

const renderFlags = () => {
    vm.render(timelineData);
    refreshFlag.value = !refreshFlag.value
}
const clickFlag = (index) => {
    goToFlag(index);
    refreshFlag.value = !refreshFlag.value
    const flag = flags[index]
    store.commit('updateContent', {
        content: {
            'content': flag['content'],
            'img': flag['img']
        },
        location: flag['location']
    });
};

const goToFlag = (index) => {
    timeline.activeFlag = index;
    vm.positionFlags(timelineData);
    timeline.init = true;
};

const toolClick = async (type) => {
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
    } else if (type == 'play') {
        recording.value = true
        await recordVideo();
        play(0);
    } else if (type == 'stop') {
        await stopRecordVideo();
        recording.value = false
    }
    renderFlags();
};

const play = (flagIndex) => {
    // if (index == 0) {
    //     renderFlags();
    // }
    let duration = 2000 + ANIMATEDURATION
    clickFlag(flagIndex);
    setTimeout(() => {
        flagIndex += 1
        if (flagIndex != flags.length) {
            play(flagIndex)
        } else {
            toolClick('stop')
        }

    }, duration)
}

</script>

<style scoped>
#timeline_container {

    position: absolute;
    bottom: 0px;
    box-shadow: inset 0 10px 10px 0px rgba(255, 255, 255, 0.6);
    background: linear-gradient(to right top, rgba(100, 200, 199, 1), rgba(50, 147, 230, 1));
    
    /* background-image: url('@/assets/background2.jpg');
    background-position: right;
    background-repeat: no-repeat;
    background-size: contain; */

    width: 100%;
    height: 220px;
    overflow: hidden;

    #toolbox {
        position: absolute;
        top: 42%;
        transform: translate(0%, -50%);
        /* 使用translate属性水平垂直居中 */
        font-size: 12px;
        height: 76%;
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
        width: 1.5px;
        left: 10%;
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
            z-index: 100;
            height: 14px;
            line-height: 12px;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            /* left: 50%; */
            width: 70px;
            /* background: red;
            border-right: 1px solid black; */
            overflow: hidden;

            &::after {
                content: "";
                position: absolute;
                background: rgba(225, 225, 225, 1);
                width: 1px;
                height: 6px;
                bottom: 18px;
                /* left: 50%; */

            }
        }

        .year_type {
            font-size: 10px;
            width: 70px;
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
                    position: absolute;
                    border-radius: 5px;
                    background: linear-gradient(to bottom, rgba(181, 228, 207, 0.95), rgba(181, 228, 207, 0.8));
                    border-radius: 0px 10px 10px 0px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    &::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 99.5%;
                        height: 100%;
                        border-radius: 0px 10px 10px 0px;
                    }

                    .icon {
                        margin: 4px;
                        width: 35px;
                        height: auto;
                    }

                    .content {
                        color: black;
                        padding: 0 4px;
                        text-align: left;
                        width: 100%;
                        font-size: 12px;
                        font-weight: bold;
                        line-height: 40px;
                    }
                }

                .marker_active {
                    background: rgba(167, 247, 139, 1);
                    /* z-index: 999; */
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