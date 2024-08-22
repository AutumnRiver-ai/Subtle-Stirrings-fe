<template>
    <transition name="card-fade" class="card">

        <a-card hoverable style="max-width: 100%; max-height: 80%; z-index: -1;" v-show="cardShow && cardInfo.cardContent">
            <template #cover>
                <img alt="example" :src="cardInfo.cardImg" />
            </template>
            <a-card-meta :title="cardInfo.cardContent">
                <!-- <template #description>
                    {{ cardInfo.cardContent }}
                </template> -->
            </a-card-meta>
        </a-card>
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

//         cardInfo.cardImg = state.content.img;
//         cardInfo.cardContent = state.content.content;
const cardInfo: CardInfo = computed(() => {
    return {
        cardContent: store.state.content.content,
        cardImg: store.state.content.img
    }
})

//cardShow 直接引用store里的showCard状态
let cardShow = computed(() => store.state.showCard)
// const LANDCOLOR = 'lightblue'
// const COUNTRYCOLOR = 'lightblue'
// const OCEANCOLOR = '#bbb'

const OCEANCOLOR = styleConfig['earth']['ocean-color']
const LANDCOLOR = styleConfig['earth']['land-color']
const COUNTRYCOLOR = styleConfig['earth']['country-color']
const COUNTRYBORDER = styleConfig['earth']['country-border']
const SIZE = styleConfig['earth']['globe-size']
onMounted(() => {
    
});


//监控store里的showCard状态，如果为true则显示卡片
store.subscribe((mutation, state) => {
    setTimeout(() => {

        // if (mutation.type === 'showCard') {
        //     if (state.content) {
        //         cardShow.value = true
        //         cardInfo.cardImg = state.content.img;
        //         cardInfo.cardContent = state.content.content;
        //     }
        // }
        // if (mutation.type === 'hideCard') {
        //         // cardShow.value = false
        // }
    }, 1500)
});

</script>

<style scoped>
.globe-container {
    top: 0px;
    position: absolute;
    min-width: 100%;
    max-width: 100%;
    padding: 0 20% 0 0;
    height: calc(100vh - 220px);
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('@/assets/background9.jpg');
    background-size: cover;
    background-position: center;
    /* opacity: 0; */

    .globe-fade-enter-active {
        transition: all 1.2s ease-out;
    }

    .globe-fade-leave-active {
        transition: all 1.2s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .globe-fade-enter-from,
    .globe-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }
}


.card {
    position: absolute;
    /**这是窄屏的 */
    left: 5%;
    top: 10%;
    width: 90%;
    /**这是宽屏的 */
    /* left: 40%;
    top: 15%;
    width: 30%; */

    padding: 0;
    box-shadow: 10px 10px 10px #ccc;
    border-radius: 10px;
}

.card-fade-enter-from,
.card-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.card-fade-enter-active {
    transition: all 1.2s ease-out;
}

.card-fade-leave-active {
    transition: all 1.2s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>