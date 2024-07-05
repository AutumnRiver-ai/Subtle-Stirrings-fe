<template>
    <div id="globe" class="globe-container">
    </div>
    <div class="card">
        <a-card hoverable style="max-width: 100%; max-height: 100%; z-index: -1;">
            <template #cover>
                <img alt="example" :src="cardInfo.cardImg" />
            </template>
            <a-card-meta :title="cardInfo.cardContent">
                <!-- <template #description>
                    {{ cardInfo.cardContent }}
                    {{ cardInfo.cardImg }}
                </template> -->
            </a-card-meta>
        </a-card>
    </div>

</template>

<script setup lang='ts'>
import * as d3 from 'd3';
import { onMounted, computed, render, h, reactive } from 'vue';
import { useStore } from 'vuex';
import { EnvironmentTwoTone } from '@ant-design/icons-vue';
import { Tooltip } from 'ant-design-vue';
const store = useStore();
const size = 1000;
const cardInfo = reactive({
    cardContent: "纽约州法院取消特朗普前私人律师朱利安尼的律师资格",
    cardImg: 'https://mediabluk.cnr.cn/record/img/cnr/CNRCDP/2023/0609/a9597944f437430fbee597cab4c9bf7e10.jpg'
})
const LANDCOLOR = 'lightblue'
// const LANDCOLOR = '#F9F871'
const CONTRYCOLOR = 'black'
const OCEANCOLOR = '#bbb'
// const OCEANCOLOR = '#1FB4FA'
onMounted(() => {
    // return
    // 地图投影
    const projection = d3.geoOrthographic()
        .scale(size / 2 - 0.5)
        .translate([size / 2, size / 2])

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
        .attr("width", size)
        .attr("height", size)
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
                .attr("stroke", CONTRYCOLOR)
                .attr("stroke-width", 0.1);
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
    // svg.select('circle').remove();
    svg.select('foreignObject').remove();
    let duration = 2500;
    console.log(animate)
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
        });


}
const createMarker = (svg, projection, path, point) => {
    const longitude = point[0];
    const latitude = point[1];
    const [x, y] = projection([-longitude, 23 - latitude]);
    let [offsetX, offsetY] = projection.translate()
    offsetX = offsetX - size / 2;
    offsetY = offsetY - size / 2
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
.globe-container {
    top: 0px;
    position: absolute;
    width: 100%;
    padding-right: 10%;
    height: calc(100vh - 220px);

    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    /* border: 1px solid black;
    background: rgba(0, 0, 0, 0.1); */
    background: rgba(0, 0, 0, 0.1);
    background: linear-gradient(to right bottom, rgba(249, 248, 113, 0.3), rgba(249, 100, 13, 0.5));
    /* background-image: url('@/assets/background.jpg'); */
}

.card {
    position: absolute;
    right: 50px;
    top: 190px;
    max-width: 600px;
    max-height: 600px;
    /* background: red; */

}
</style>