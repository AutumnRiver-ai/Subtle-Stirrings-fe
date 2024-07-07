<template>
    <div id="globe-container" class="globe-container">
        <transition name="slide-fade">
            <div id="globe" v-show="!cardShow"></div>
        </transition>
    </div>
    <transition name="slide-fade">
        <div class="card" v-show="cardShow">
            <a-card hoverable style="max-width: 100%; max-height: 100%; z-index: -1;">
                <template #cover>
                    <img alt="example" :src="cardInfo.cardImg" />
                </template>
                <a-card-meta :title="cardInfo.cardContent">
                    <template #description>
                        {{ cardInfo.cardContent }}
                    </template>
                </a-card-meta>
            </a-card>
        </div>
    </transition>
</template>

<script setup lang='ts'>
import * as d3 from 'd3';
import { onMounted, computed, render, h, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { EnvironmentTwoTone } from '@ant-design/icons-vue';
import { Tooltip } from 'ant-design-vue';
import styleConfig from '@/utils/styleConfig.js';
const store = useStore();

interface CardInfo {
    cardContent: string;
    cardImg: string;
}

const cardInfo: CardInfo = reactive({
    cardContent: "纽约州法院取消特朗普前私人律师朱利安尼的律师资格",
    cardImg: 'https://mediabluk.cnr.cn/record/img/cnr/CNRCDP/2023/0609/a9597944f437430fbee597cab4c9bf7e10.jpg'
})
let cardShow = ref(false)
// const LANDCOLOR = 'lightblue'
// const COUNTRYCOLOR = 'lightblue'
// const OCEANCOLOR = '#bbb'

const OCEANCOLOR = styleConfig['earth']['ocean-color']
const LANDCOLOR = styleConfig['earth']['land-color']
const COUNTRYCOLOR = styleConfig['earth']['country-color']
const COUNTRYBORDER = styleConfig['earth']['country-border']
const SIZE = styleConfig['earth']['globe-size']
onMounted(() => {
    // return
    // 地图投影
    const projection = d3.geoOrthographic()
        .scale(SIZE / 2 - 0.5)
        .translate([SIZE / 2, SIZE / 2])

    const path = d3.geoPath().projection(projection);
    store.subscribe((mutation, state) => {
        if (mutation.type === 'updateContent') {
            cardInfo.cardImg = state.content.img;
            cardInfo.cardContent = state.content.content;
            console.log(cardInfo);
        }
    });

    // 创建 SVG 元素
    const svg = d3.select("#globe")
        .append("svg")
        .attr("width", SIZE)
        .attr("height", SIZE)
        .style("background-color", OCEANCOLOR)
        .style('border-radius', '50%');

    // 粗糙地图 https://raw.githubusercontent.com/epistler999/GeoLocation/master/world.json
    d3.json("https://raw.githubusercontent.com/epistler999/GeoLocation/master/world.json")
        .then(data => {
            svg.append("g")
                .selectAll("path")
                .data(data['features'])
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", LANDCOLOR)
                .attr("stroke", COUNTRYCOLOR)
                .attr("stroke-width", COUNTRYBORDER);
            // 添加旋转动画
            centerPosition(svg, projection, path, [-116, 23 - 40], [-116, 23 - 40], false);
            store.subscribe((mutation, state) => {
                if (mutation.type === 'updateLocation') {
                    const longitude = state.location[0];
                    const latitude = state.location[1];
                    const preLongitude = state.preLocation[0]
                    const preLatitude = state.preLocation[1]
                    // const preLongitude = 116
                    // const preLatitude = 40
                    centerPosition(svg, projection, path, [-preLongitude, 23 - preLatitude], [-longitude, 23 - latitude]);
                }
            });
        })
});
const centerPosition = (svg, projection, path, pointStart, pointEnd, animate = true) => {
    cardShow.value = false
    svg.select('foreignObject').remove();
    let duration = 2500;
    if (!animate) {
        duration = 0;
    }
    svg.transition()
        .duration(duration) // 设置动画持续时间为 2 秒
        .tween("rotate", () => {
            const interpolateRotation = d3.interpolate(pointStart, pointEnd);
            return function (t) {
                projection.rotate(interpolateRotation(t));
                svg.selectAll("path").attr("d", path);
            };
        })
        .on("end", () => {
            createMarker(svg, projection, path, pointEnd);
            setTimeout(() => {
                cardShow.value = true
            }, 1500)
        });


}
const createMarker = (svg, projection, path, point) => {
    const longitude = point[0];
    const latitude = point[1];
    const [x, y] = projection([-longitude, 23 - latitude]);
    let [offsetX, offsetY] = projection.translate()
    offsetX = offsetX - SIZE / 2;
    offsetY = offsetY - SIZE / 2
    const iconSize = 40
    svg.append("foreignObject")
        .attr("x", x + offsetX - iconSize / 2)
        .attr("y", y + offsetY - iconSize)
        .attr("width", iconSize)
        .attr("height", iconSize)
        // .html("<div id='marker' style='background: red'></div>");
        .html("<div id='marker'></div>");
    svg.selectAll("path").attr("d", path);
    const container = document.getElementById('marker');
    const icon = h(EnvironmentTwoTone, { spin: false, rotate: 0, style: { fontSize: '40px', color: 'red' } });
    // const tooltip = h(Tooltip, { title: '当前位置', id: 'tooltip' }, { default: () => icon });
    render(icon, container);
}
</script>

<style scoped>
/* .v-enter-active,
.v-leave-active {
    transition: opacity 2.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
} */

.slide-fade-enter-active {
    transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}


.globe-container {
    top: 0px;
    /* left: -10%; */
    position: absolute;
    min-width: 100%;
    max-width: 100%;
    padding: 0 20% 0 0;
    height: calc(100vh - 220px);

    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;

    /* border: 1px solid black;
    background: rgba(0, 0, 0, 0.1); */
    /* background: rgba(0, 0, 0, 0.1);
    background: linear-gradient(to right bottom, rgba(249, 248, 113, 0.3), rgba(249, 100, 13, 0.5)); */
    background-image: url('@/assets/background8.jpeg');
    background-size: cover;
    background-position: center;
}


.card {
    position: absolute;
    right: 50px;
    top: 190px;
    margin: 0 auto;
    max-width: 500px;
    max-height: 500px;
    padding: 0;
    /* box-shadow: inset 0 5px 20px rgba(255, 255, 255, 0.7); */
    box-shadow: 10px 10px 10px #ccc;
    border-radius: 10px;
    /* border: 10px; */
}
</style>