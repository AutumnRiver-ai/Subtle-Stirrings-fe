<script setup>
import { reactive } from 'vue';
import config from '@/config.js';
import Timeline from '@/components/timeline/timeline.vue'
import Earth from '@/components/earth/earth.vue'
import Card from '@/components/card/card.vue'

// 使用reactive创建响应式状态
const state = reactive({
    showEarth: config.showEarth,
    showCard: config.showCard
});

console.log(state.showEarth) 

</script>
<template>
    <div class="map">
        <Timeline />
        <Earth v-if="state.showEarth" />
        <Card v-if="state.showCard" />
    </div>
</template>

<style scoped>
.map {
    position: relative;
    height: 100%;
    width: 100%;
    /* height: 100vh; */
    padding-right: 100px;

    
}
</style>