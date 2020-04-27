<template>
    <view>
        <swipers class="swiper" :background="imgUrls"></swipers>
        <view class="option">
            <view class="option-item" @click="intentToActivity">
                活动
            </view>
            <view class="option-item" @click="intentToQuestion">
                问卷
            </view>
            <view class="option-item" @click="developing">
                夏令营
            </view>
            <view class="option-item" @click="developing">
                课程
            </view>
        </view>
    </view>
</template>

<script>
    import swiper from "../../components/swiper";

    export default {
        components: {
            "swipers": swiper
        },
        data() {
            return {
                imgUrls: [
                    'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6',
                    'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/coursePicture/0fbcfdf7-0040-4692-8f84-78bb21f3395d',
                    'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870'
                ]
            }
        },
        created() {
            this.apiTest()
        },
        methods: {
            intentToActivity() {
                uni.navigateTo({
                    url: '../activity/activity'
                })
            },
            intentToQuestion() {
                uni.navigateTo({
                    url: '../question-index/question-index'
                })
            },
            developing() {
                uni.showModal({
                    title: '温馨提示',
                    content: '正在努力开发中，敬请期待~'
                })
            },
            apiTest() {
                let that = this;
                uni.login({
                    success: (res) => {
                        that.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/getAppid', {
                            code: res.code
                        }).then((res) => {
                            console.log(res)
                        })
                    }
                })
                /*uni.getSetting({
                    success(res) {
                        uni.getUserInfo({
                            success(res) {
                                uni.login({
                                    success: (res) => {
                                        that.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/getAppid', {
                                            code: res.code
                                        }).then((res) => {
                                            console.log(res)
                                        })
                                    }
                                })
                            }
                        })
                    }
                })*/
            }
        }
    }
</script>

<style scoped lang="scss">
    .option {
        width: 96%;
        margin: 2% auto 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .option-item {
            width: 49%;
            margin-bottom: 2%;
            padding-top: 1%;
            padding-bottom: 1%;
            text-align: center;
            border: 1px solid #dcecef;
            background-color: #f6ffff;
        }
    }
</style>
