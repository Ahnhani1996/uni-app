<template>
    <view>
        <swipers :background="imgUrls"></swipers>
        <view class="title">热门活动</view>
        <view class="activity">
            <view class="item" v-for="(item,i) in activityList" :key="i" @click="intentToLogin">
                <view class="id">{{item.id}}</view>
                <view class="name">{{item.name}}</view>
                <view class="browse">{{item.browse}}</view>
            </view>
        </view>
        <view class="fixed">
            <view @click="intentToOption">首页</view>
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
                ],
                activityList: []
            }
        },
        onLoad() {
            this.getActivityList();
        },
        methods: {
            getActivityList() {
                this.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/getActivityList').then(res => {
                    this.activityList = res.data.data;
                })
            },
            intentToOption() {
                uni.navigateTo({
                    url: '../options/options'
                })
            },
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

        .item {
            display: flex;
            line-height: 2.8;
            border-bottom: 1px solid #ededed;

            .id {
                width: 10%;
                color: #eb7568;
                text-align: center;
            }

            .name {
                width: 40%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-right: 2%;
            }

            .browse {
                color: #c9c9c9;
            }
        }
    }

    .fixed {
        position: fixed;
        left: 0;
        top: 80%;
        z-index: 999;

        view {
            width: 35px;
            height: 35px;
            line-height: 35px;
            color: #8796b2;
            text-align: center;
            font-size: 12px;
            background-color: #f5fefe;
            border: 1px solid #c9ebf1;
            border-left: none;
        }
    }
</style>
