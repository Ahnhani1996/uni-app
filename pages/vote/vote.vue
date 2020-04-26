<template>
    <view>
        <view class="vote">
            <view class="data">
                <view>排名</view>
                <view>票数</view>
                <view>礼物</view>
                <view>浏览量</view>
            </view>
            <view class="item">
                <view class="title">选手描述</view>
                <view class="introduction">这人很懒什么都没有留下~</view>
            </view>
            <view class="item">
                <view class="title">选手照片</view>
                <!--照片-->
            </view>
            <view class="item">
                <view class="contribute">票数贡献榜</view>
            </view>
            <view class="item">
                <view class="title">投票记录</view>
            </view>
        </view>
        <view class="tabBar">
            <view @click="intentToIndex">首页</view>
            <view>投票</view>
            <view @click="intentToGift">送礼</view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            intentToIndex() {
                uni.switchTab({
                    url: '../index/index'
                })
            },
            intentToGift(){
                uni.navigateTo({
                    url: '../gift/gift'
                });
            }
        }
    }
</script>

<style lang="scss">
    page {
        background-color: #f9f9fa;
    }

    .vote {
        width: 96%;
        margin: 0 auto;

        .data {
            min-height: 65px;
            line-height: 65px;
            margin: 3% auto 3%;
            color: #ffffff;
            background-color: #31c8b1;
            border-radius: 5px;
            display: flex;
            flex-wrap: nowrap;

            view {
                width: 33.3%;
                text-align: center;
            }
        }

        .item {
            color: #868f9a;
            margin-bottom: 3%;
            background-color: #fefefe;

            .title {
                line-height: 2;
                text-align: center;
                border-bottom: 1px solid #ededed;
            }

            .contribute {
                line-height: 2;
                text-align: center;
                background-color: #9df748;
            }

            .introduction {
                min-height: 70px;
                padding: 3%;
            }

        }
    }

    .tabBar {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 8%;
        display: flex;
        align-items: center;
        background-color: #9ee686;
        text-align: center;

        view {
            width: 33.3%;
            height: 80%;
            border-right: 1px solid #ededed;
            padding-top: 5%;

            &:last-child {
                border: none;
            }
        }
    }
</style>
