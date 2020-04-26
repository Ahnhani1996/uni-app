<template>
    <div>
        <swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-color="#ffffff"
                indicator-active-color="#3478f6">
            <swiper-item v-for="(item,i) in background" :key="i">
                <img :src="item" alt="">
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    export default {
        props: ['background'],
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    .swiper {
        height: 200px;

        img {
            width: 100%;
            height: 200px;
        }
    }
</style>
