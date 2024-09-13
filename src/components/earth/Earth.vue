<template>
    <div class="earth">
        <div id="globe-container" class="globe-container">
            <transition name="globe-fade">
                <div id="globe" v-show="!cardShow"></div>
                <!-- <div id="globe"></div> -->
            </transition>
        </div>
        <transition name="card-fade" class="card">
            <!-- <a-card hoverable style="max-width: 80%; max-height: 80%; z-index: -1;"> -->
            <a-card hoverable v-show="cardShow">
                <template #cover>
                    <div class="img-container">
                        <div v-for="(imgSrc, index) in cardInfo.cardImgs" :key="index" class="img-item">
                            <img alt="example" :src="imgSrc" />
                        </div>
                    </div>
                </template>
                <a-card-meta :title="cardInfo.cardTitle">
                    <template #description>
                        {{ cardInfo.cardContent }}
                    </template>
                </a-card-meta>
            </a-card>
        </transition>
    </div>
</template>

<script setup lang='ts'>
import * as d3 from 'd3';
import { onMounted, computed, render, h, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { EnvironmentTwoTone } from '@ant-design/icons-vue';
import { Tooltip } from 'ant-design-vue';
import styleConfig from '@/utils/styleConfig.ts';
const store = useStore();

interface CardInfo {
    cardTitle: string;
    cardContent: string;
    cardImgs: Array<string>;
}

const cardInfo: CardInfo = reactive({
    cardTitle: "",
    cardContent: "",
    cardImgs: []
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
const X_OFFSET = SIZE / 2
const Y_OFFSET = SIZE / 2
let lat_offset = 0
let lng_offset = 0
onMounted(() => {
    // return
    // 地图投影
    const projection = d3.geoOrthographic()
        .scale(SIZE / 2 - 0.5)
        .translate([X_OFFSET, Y_OFFSET])

    const path = d3.geoPath().projection(projection);

    // 创建 SVG 元素
    const svg = d3.select("#globe")
        .append("svg")
        .attr("width", SIZE)
        .attr("height", SIZE)
        // .attr("transform", `translate(0, ${1/4*SIZE})`)
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
            centerPosition(svg, projection, path, {
                location: [116, 39],
                preLocation: [116, 39]
            }, false);

            store.subscribe((mutation, state) => {
                if (mutation.type === 'updateContent') {
                    centerPosition(svg, projection, path, state);
                }
            });
        })
});
const centerPosition = (svg, projection, path, state, animate = true) => {
    const locationName = state.locationName;
    const longitude = state.location[0];
    const latitude = state.location[1];
    const preLocationName = state.preLocationName;
    const preLongitude = state.preLocation[0]
    const preLatitude = state.preLocation[1]
    // const preLongitude = 116
    // const preLatitude = 40
    const pointStart = [lng_offset - preLongitude, lat_offset - preLatitude]
    const pointEnd = [lng_offset - longitude, lat_offset - latitude]

    cardShow.value = false
    svg.selectAll('foreignObject').remove();
    let arcPath = null;
    let arcIcon = null
    const arcIconSize = 20;
    let duration = 2500;
    if (!animate) {
        duration = 10;
    }
    const locate2position = () => {
        svg.transition()
            .duration(duration) // 设置动画持续时间为 2 秒
            .tween("rotate", () => {
                const interpolateRotation = d3.interpolate(pointStart, pointEnd);
                const interpolateScale = d3.interpolate(1, 2);
                return function (t) {
                    if (arcPath) {
                        arcPath.remove()
                        arcIcon.remove()
                    }
                    projection.rotate(interpolateRotation(t));
                    const scale = interpolateScale(t); // 获取当前缩放比例
                    // svg.attr("transform", `translate(${SIZE / 2}, ${SIZE / 2}) scale(${scale}) rotate(${interpolateRotation(t)}) translate(${-SIZE / 2}, ${-SIZE / 2})`);
                    // svg.attr("transform", `scale(${1+t})`)
                    svg.selectAll("path").attr("d", path);

                    const end0 = -pointStart[0] * (1 - t) + -pointEnd[0] * t
                    const end1 = -pointStart[1] * (1 - t) + -pointEnd[1] * t
                    const greatArc = {
                        type: "LineString",
                        coordinates: [[-pointStart[0], -pointStart[1]], [end0, end1]]
                    };
                    let c_r = 5 * (1 - t) + 158
                    let c_g = 5 * t + 35
                    let c_b = 234
                    arcPath = svg.append("path")
                        .attr("d", path(greatArc))
                        .attr("stroke", `rgba(${c_r}, ${c_g}, ${c_b}, ${1 - t ** 10 + 0.01})`)
                        .attr("stroke-width", 2)
                    const [x, y] = projection([lng_offset + end0, lat_offset + end1]);
                    let [offsetX, offsetY] = projection.translate()
                    arcIcon = svg.append('circle')
                        .attr('cx', offsetX)
                        .attr('cy', offsetY)
                        .attr('r', 3)
                        .attr('fill', `rgba(255, 255, 255, ${1 - t ** 10 + 0.01})`)
                        .attr('stroke', `rgba(${c_r}, ${c_g}, ${c_b}, ${1 - t ** 10 + 0.01})`)
                        .attr("stroke-width", 1.5)

                };
            })
            .on("end", () => {
                createMarker(svg, projection, path, pointEnd, locationName);
                if (arcPath) {
                    arcPath.remove()
                    arcIcon.remove()
                }
                setTimeout(() => {
                    if (animate) {
                        cardShow.value = true
                        if (state.content) {
                            cardInfo.cardImgs = state.content.imgs;
                            cardInfo.cardContent = state.content.content;
                            cardInfo.cardTitle = state.content.title;
                        }
                    }
                }, 1500)
            });
    }
    locate2position()


}
const createMarker = (svg, projection, path, point, locationName = '') => {
    const longitude = point[0];
    const latitude = point[1];
    const [x, y] = projection([lng_offset - longitude, lat_offset - latitude]);
    let [offsetX, offsetY] = projection.translate()
    offsetX = offsetX - SIZE / 2;
    offsetY = offsetY - SIZE / 2
    const iconSize = 30
    svg.append("foreignObject")
        .attr("x", x + offsetX - iconSize / 2)
        .attr("y", y + offsetY - iconSize)
        .attr("width", iconSize)
        .attr("height", iconSize)
        .html("<div id='marker'></div>");
    svg.append("foreignObject")
        .attr("x", x + offsetX - iconSize / 2)
        .attr("y", y + offsetY)
        .attr("width", iconSize)
        .attr("height", iconSize)
        .html(`<div id='city' style='font-size:12px; color:rgba(0, 0, 0, 1)'>${locationName}</div>`);
    svg.selectAll("path").attr("d", path);
    const container = document.getElementById('marker');
    const icon = h(EnvironmentTwoTone, { spin: false, rotate: 0, style: { fontSize: '30px' } });
    // const tooltip = h(Tooltip, { title: '当前位置', id: 'tooltip' }, { default: () => icon });
    render(icon, container);
}
</script>

<style scoped>
.earth {
    position: absolute;
    width: 100%;
    height: calc(100vh - 200px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;

    .globe-container {
        top: 0px;
        position: absolute;
        min-width: 100%;
        max-width: 100%;
        padding: 0 20% 0 0;
        height: calc(100vh - 220px);
        overflow: hidden;
        z-index: -1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('@/assets/background9.jpg');
        background-size: cover;
        background-position: center;
        /* opacity: 0; */

        .globe-fade-enter-active {
            transition: all 1.0s ease-out;
        }

        .globe-fade-leave-active {
            transition: all 0.9s cubic-bezier(1, 0.5, 0.8, 1);
        }

        .globe-fade-enter-from,
        .globe-fade-leave-to {
            transform: translateX(20px);
            opacity: 0;
        }
    }

    .card {
        padding: 10px;
        background: white;
        box-shadow: 6px 6px 6px #ccc;
        border-radius: 10px;

        .img-container {
            display: flex;
            align-items: center;
            /**水平剧中 */
            justify-content: center;

            .img-item {
                margin-right: 10px;
                /* 最后一个元素margin-right为0*/
                &:last-child {
                    margin-right: 0;
                }  
                height: 100%;
                &>img {
                    max-height: calc(80vh - 220px);
                    object-fit: cover;
                    border-radius: 5px;
                }
            }
        }
    }

    .card-fade-enter-from,
    .card-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }

    .card-fade-enter-active {
        transition: all 0.9s ease-out;
    }

    .card-fade-leave-active {
        transition: all 1.0s cubic-bezier(1, 0.5, 0.8, 1);
    }
}
</style>