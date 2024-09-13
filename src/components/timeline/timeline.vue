<template>
    <div id="timeline_container">
        <div class="container_background">
            <div id="toolbox">
                <HomeTwoTone :style="{ fontSize: '20px' }" @click="toolClick('home')" />
                <PlayCircleTwoTone :style="{ fontSize: '20px' }" @click="toolClick('play')" v-if="!playing" />
                <PauseCircleTwoTone :style="{ fontSize: '20px' }" @click="toolClick('stop')" v-if="playing" />
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
                        <!-- <Marker :title="flag['title']"  :isActive="index == timeline.activeFlag"/> -->
                        <MarkerShadow :title="flag['title']" :subtitle="flag['subtitle']"
                            :isActive="index == timeline.activeFlag" />
                    </div>

                    <div v-for="(rulermarker, i) in timeline.rulerMarkers" :key="i" class="rulermarker"
                        :style="{ left: rulermarker.position + 'px' }"
                        :class="{ 'year_type': rulermarker.timeType == 'year' }">
                        {{ rulermarker.content }}
                    </div>
                </div>
                <div class="suffix">
                    <div class="asklike">
                        <img src="@/assets/icon.jpg">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import timelineConfig from '@/api/timeline.config.ts';
import { renderTimeline, TimelineData } from '@/components/timeline/renderTimeline.ts';
import { PlusCircleTwoTone, MinusCircleTwoTone, HomeTwoTone, PlayCircleTwoTone, PauseCircleTwoTone } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { recordVideo, stopRecordVideo } from '@/utils/record.ts';
// import Marker from './markers/markerSimple.vue';
import MarkerShadow from './markers/markerShadow.vue';
const ANIMATEDURATION = 2700 + 2000 + 550
const router = useRouter()

const timelineData: TimelineData = timelineConfig;
const flags = timelineData["flags"];
const timeline = timelineData["timeline"];
const refreshFlag = ref(true)
const store = useStore();
const rt = new renderTimeline()
let playing = ref(false);

onMounted(() => {
    renderFlags()
    toolClick('play')
})

const renderFlags = () => {
    rt.render(timelineData);
    refreshFlag.value = !refreshFlag.value
}
const clickFlag = (index) => {
    goToFlag(index);
    refreshFlag.value = !refreshFlag.value
    const flag = flags[index]
    store.commit('updateContent', {
        content: {
            'content': flag['content'],
            'imgs': flag['imgs'],
            'title': flag['title']
        },
        location: flag['location'],
        locationName: flag['locationName']
    });
};

const goToFlag = (index) => {
    timeline.activeFlag = index;
    rt.positionFlags(timelineData);
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
        playing.value = true
        if (timeline.control.record) {
            await recordVideo();
        }

        setTimeout(() => {
            play(0);
        }, timeline.control.startDelay)

    } else if (type == 'stop') {
        if (timeline.control.record) {
            await stopRecordVideo();
        }

        playing.value = false
    }
    renderFlags();
};

const orderFlags = () => {
    let playOrder = []
    flags.forEach((element, index) => {
        playOrder.push({
            order: element['order'],
            index: index
        })
    });
    playOrder.sort((a, b) => a.order - b.order)
    return playOrder
}

const play = (index) => {
    const playOrder = orderFlags()
    const flagIndex = playOrder[index]['index']
    let duration;

    if (timeline.control.record) {
        duration = flags[flagIndex]['duration'] * 1000 + ANIMATEDURATION
    } else {
        duration = timeline.control.duration + ANIMATEDURATION
    }
    clickFlag(flagIndex);
    setTimeout(() => {
        if (timeline.control.record) {
            index += 1
        } else {
            index = (index + 1) % flags.length
        }

        if (index != flags.length && playing.value) {
            play(index)
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
    background-size: 25px 25px;
    background-image:
        linear-gradient(to right, #fff 1px, transparent 2px),
        linear-gradient(to bottom, #fff 1px, transparent 2px);

    width: 100%;
    height: 220px;
    overflow: hidden;

    .container_background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* background: red; */
        background: linear-gradient(to right top, rgba(158, 35, 234, 0.6), rgba(50, 147, 230, 0.5), rgba(51, 172, 170, 0.85));

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
            height: 196px;
            width: 1.5px;
            left: 10%;
            background: rgb(0, 0, 0, 0.8);
            z-index: 100;
        }

        .baseline_h {
            position: absolute;
            bottom: 22px;
            height: 1px;
            width: 100%;
            left: 0;
            background: rgba(225, 225, 225, 1);
            /* background: linear-gradient(to right top, rgba(51, 172, 170, 0.8), rgba(50, 147, 230, 0.2), rgba(158, 35, 234, 0.5)); */

            z-index: 100;
        }

        .dragable_container {
            cursor: move;
            position: absolute;
            height: 215px;
            width: 130%;

            .suffix {
                .asklike {
                    position: absolute;
                    right: 0px;
                    top: 50%;
                    transform: translate(-130%, -50%);
                    content: '';
                    height: 160px;
                    width: 160px;
                    border-radius: 50%;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
            }

            .rulermarker {
                font-size: 8px;
                position: absolute;
                bottom: 0px;
                z-index: 100;
                height: 14px;
                line-height: 12px;
                color: rgba(255, 255, 255, 1);
                font-weight: bold;
                text-align: center;
                /* left: 50%; */
                width: 70px;
                /* background: red; */
                /* border-right: 1px solid black; */
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
                font-weight: 900;

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