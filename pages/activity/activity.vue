<template>
    <view>
        <swipers :background="imgUrls"></swipers>
        <view class="title">热门活动</view>
        <ul class="activity">
            <li class="activity-item" @click="intentToLogin">
                <view>1</view>
                <view class="name">宏鹏教育程序员美学摄影展</view>
                <view>6760</view>
            </li>
        </ul>
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
        methods: {
            intentToLogin() {
                uni.getStorage({
                    key: 'userInfo',
                    success(res) {
                        uni.switchTab({
                            url: '../index/index'
                        })
                    },
                    fail(res) {
                        uni.navigateTo({
                            url: '../login/login'
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    page {
        background-color: #ffffff;
    }

    .title {
        width: 96%;
        margin: 0 auto;
        line-height: 2.5;
        border-bottom: 1px solid #ededed;
    }

    .activity {
        width: 96%;
        margin: 0 auto;

        .activity-item {
            display: flex;
            line-height: 2.2;
            border-bottom: 1px solid #ededed;

            .name {
                width: 40%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>
