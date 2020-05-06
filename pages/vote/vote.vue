<template>
    <view>
        <view class="vote">
            <view class="avater">
                <img :src="player.coverImg" alt="">
                <view>{{player.name}}</view>
            </view>
            <view class="data">
                <view class="item">
                    <view>{{player.i}}</view>
                    <view>排名</view>
                </view>
                <view class="item">
                    <view>{{player.ticket}}</view>
                    <view>票数</view>
                </view>
                <view class="item">
                    <view>{{player.gift}}</view>
                    <view>礼物</view>
                </view>
                <view class="item">
                    <view>{{player.browse}}</view>
                    <view>浏览量</view>
                </view>
            </view>
            <view class="file">
                <view class="title">选手描述</view>
                <view v-if="player.describes===null" class="introduction">这人很懒什么都没有留下~</view>
                <view v-else class="introduction">{{player.describes}}</view>
            </view>
            <view class="file">
                <view class="title">选手照片</view>
                <view class="coverImg">
                    <image v-for="(item,i) in playerImg" :key="i" :src="item.url" mode="widthFix"></image>
                </view>
            </view>
            <view class="file">
                <view class="contribute">票数贡献榜</view>
                <scroll-view scroll-y="true" style="height: 265px" v-if="hdPlayerGiftlist.length>0">
                    <view class="hdPlayerGiftlist">
                        <view class="item" v-for="(item,i) in hdPlayerGiftlist" :key="i">
                            <img class="extend3" :src="item.extend3" alt="">
                            <view class="name">{{item.extend2}}</view>
                            <view class="ticket">{{item.ticket}}票</view>
                        </view>
                    </view>
                </scroll-view>
                <view class="noHdPlayerGiftlist" v-else>
                    <view>喜欢我的人 在这里驻留</view>
                    <button>送ta礼物加票</button>
                </view>
            </view>
            <view class="file">
                <view class="title">投票记录</view>
                <view class="ticket">
                    <view class="item" v-for="(item,i) in playerTicket" :key="i">
                        <view class="left">
                            <view>{{item.extend2}}</view>
                            <view>{{item.createTime}}</view>
                        </view>
                        <view class="extend3">+{{item.extend3}}</view>
                    </view>
                    <button v-if="playerTicket.length<total" @click="getPlayerTicket(id)">查看更多</button>
                    <button v-else>没有更多了</button>
                </view>
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
            return {
                id: 0,
                hdPlayerGiftlist: [],
                player: {},
                playerImg: [],
                pageNum: 1,
                playerTicket: [],
                total: 0
            }
        },
        onLoad: function (option) {
            this.id = option.id
            this.getPlayerData(option.id);
            this.getPlayerTicket(option.id);
        },
        methods: {
            intentToIndex() {
                uni.switchTab({
                    url: '../index/index'
                })
            },
            intentToGift() {
                uni.navigateTo({
                    url: '../gift/gift'
                });
            },
            getPlayerData(id) {
                this.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/player', {
                    'activityId': 1,
                    'id': id
                }).then(res => {
                    //console.log(res.data.data);
                    this.hdPlayerGiftlist = res.data.data.hdPlayerGiftlist;
                    this.player = res.data.data.player;
                    this.playerImg = res.data.data.playerImg;
                })
            },
            getPlayerTicket(id) {
                this.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/playerTicket', {
                    'playerId': id,
                    'pageSize': 5,
                    'pageNum': this.pageNum
                }).then(res => {
                    console.log(res.data);
                    this.pageNum += 1
                    this.playerTicket.push(...res.data.rows);
                    this.total = res.data.total;
                })
            }
        }
    }
</script>

<style lang="scss">
    page {
        background-color: #f9f9f9;
        padding-bottom: 13%;
    }

    .vote {
        width: 96%;
        margin: 0 auto;

        .avater {
            color: #868f9a;
            text-align: center;
            margin: 8% auto 5%;

            img {
                width: 85px;
                height: 85px;
                border-radius: 50%;
                margin-bottom: 1%;
            }
        }

        .data {
            min-height: 65px;
            margin: 3% auto 3%;
            color: #ffffff;
            background-color: #31c8b1;
            border-radius: 5px;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;

            .item {
                width: 25%;
                text-align: center;
            }
        }

        .file {
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
                min-height: 66px;
                padding: 3%;
            }

            .coverImg {
                padding: 2%;

                image {
                    width: 100%;
                    margin-bottom: 1%;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }

            .hdPlayerGiftlist {
                padding: 2%;

                .item {
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #ededed;
                    line-height: 50px;
                    padding: 1% 0;

                    &:last-child {
                        border-bottom: none;
                    }

                    .extend3 {
                        text-align: center;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        margin: 0 3%;
                    }

                    .name {
                        width: 65%;
                    }

                    .ticket {
                        color: #31c8b1;
                    }
                }
            }

            .noHdPlayerGiftlist {
                padding: 2%;
                text-align: center;

                view {
                    margin: 5% 0;
                }

                button {
                    width: 70%;
                    color: #fff;
                    background-color: #32c8b1;
                    border: none;
                    border-radius: 23px;
                    margin-bottom: 5%;

                    &:after {
                        border: none;
                    }
                }
            }

            .ticket {
                padding: 2%;

                .item {
                    display: flex;
                    align-items: center;
                    line-height: 2;
                    border-bottom: 1px solid #ededed;

                    .left {
                        width: 87.5%;

                        view {
                            padding-left: 5%;
                        }
                    }

                    .extend3 {
                        color: #31c8b1;
                    }
                }

                button {
                    color: #fff;
                    border: none;
                    margin-top: 2%;
                    background-color: #32c8b1;

                    &:after {
                        border: none;
                    }
                }
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
            line-height: 2.8;

            &:last-child {
                border: none;
            }
        }
    }
</style>
