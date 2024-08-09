<script setup>
import News from '@/views/news.vue'
import Timeline from '@/components/timeline/timeline.vue'
import Earth from '@/components/earth/earth.vue'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()

const gogogo = (name) => {

    if (name == 'news') {
        const res = router.push({ 'name': 'news' }); // 跳转到关于页面
        console.log(res)
    }
    if (name == 'map') {
        const res = router.push({ 'name': 'timemap' }); // 跳转到关于页面
        console.log(res)
    }

}

</script>
<template>

    <div class="home">
        <a-button @click="gogogo('news')">news</a-button>
        <a-button @click="gogogo('map')">map</a-button>
    </div>
</template>

<style scoped>
.home {
    width: 100%;
    height: 100vh;
    background: rgba(0, 255, 0, 0.1);
    z-index: -3;
}
</style>