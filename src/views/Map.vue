<script setup>
import Timeline from '@/components/timeline/Timeline.vue'
import Earth from '@/components/earth/Earth.vue'
</script>
<template>
    <div class="map">
        <Timeline />
        <Earth />
    </div>
</template>

<style scoped>
.map {
    width: 100%;
    height: 100vh;
    /* background: rgba(156, 173, 188, 0.9); */
    z-index: -1000;
}
</style>