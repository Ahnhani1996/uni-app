<template>
    <view>
        <swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-color="#ffffff"
                indicator-active-color="#3478f6">
            <swiper-item v-for="(item,i) in background" :key="i">
                <image :src="item"></image>
            </swiper-item>
        </swiper>
    </view>
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

        image {
            width: 100%;
            height: 200px;
        }
    }
</style>
