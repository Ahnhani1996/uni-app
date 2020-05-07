<template>
    <view>
        <view class="introduction" v-html="introduction"></view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                introduction: ''
            }
        },
        onLoad() {
            this.getIndexData();
        },
        methods: {
            getIndexData() {
                this.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/list', {
                    activityId: 1
                }).then((res) => {
                    console.log(res.data.data);
                    this.introduction = res.data.data.hdActivity.introduction;
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .introduction {
        width: 90%;
        margin: 2% auto;
        padding: 3%;
        background-color: #fefefe;
    }
</style>
