<template>
    <view>
        <view class="gift">
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
            <view class="title">送礼物加票数</view>
            <view class="content">
                <view class="item" v-for="(item,i) in giftList" :key="i" @click="selectGift(i)">
                    <view :class="{selected:i === currentSelected}">
                        <view class="icon">
                            <image :src="item.icon"/>
                        </view>
                        {{item.name}}
                    </view>
                    <view class="ticket">+{{item.ticket}}票</view>
                </view>
            </view>
            <view class="quantity">
                <view class="num">
                    <view class="price">￥{{price}}</view>
                    <view class="ticket">+{{ticket}}票</view>
                </view>
                <view class="btn">
                    <button @click="reduceGift">-</button>
                    <view>{{quantity}}</view>
                    <button @click="incrementGift">+</button>
                </view>
            </view>
        </view>
        <button class="send-btn" @click="sendBtnClickEvent">立即送出</button>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                id: 0,
                player: {},
                giftList: [
                    {price: 0}
                ],
                currentSelected: 0,
                quantity: 1
            }
        },
        computed: {
            price: {
                get() {
                    return this.giftList[this.currentSelected].price * this.quantity;
                },
                set(val) {
                }
            },
            ticket: {
                get() {
                    return this.ticket = this.giftList[this.currentSelected].ticket * this.quantity;
                },
                set(val) {
                }
            }
        },
        onLoad: function (option) {
            this.id = option.id;
            this.getPlayerData(option.id);
            this.selectGift(this.currentSelected);
            this.getGiftList();
        },
        methods: {
            getPlayerData(id) {
                this.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/player', {
                    activityId: 1,
                    id: id
                }).then(res => {
                    this.player = res.data.data.player;
                })
            },
            getGiftList() {
                this.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/giftList', {
                    activityId: 1,
                    id: this.id
                }).then(res => {
                    console.log(res.data.data);
                    this.giftList = res.data.data.hdGift
                })
            },
            selectGift(index) {
                this.currentSelected = index;
                this.quantity = 1
            },
            incrementGift() {
                this.quantity += 1;
            },
            reduceGift() {
                if (this.quantity >= 2) {
                    this.quantity -= 1;
                }
            },
            sendBtnClickEvent() {
                const that = this;
                const total_fee = this.price * 100;
                const openid = uni.getStorageSync('openid');
                const userInfo = uni.getStorageSync('userInfo');
                uni.login({
                    success: res => {
                        that.$fly.post('https://mp.zymcloud.com/hp-hd/applet/pay/wxMiniProgramPay', {
                            total_fee: total_fee,
                            js_code: res.code
                        }).then(res => {
                            if (res.data.code == 0) {
                                uni.requestPayment({
                                    nonceStr: res.data.data.nonceStr,
                                    package: res.data.data.package,
                                    paySign: res.data.data.paySign,
                                    signType: res.data.data.signType,
                                    timeStamp: res.data.data.timeStamp,
                                    success: function (res) {
                                        that.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/giftVote', {
                                            extend1: openid,
                                            extend2: userInfo.nickName,
                                            extend3: userInfo.avatarUrl,
                                            playerId: that.id,
                                            giftId: that.giftList[that.currentSelected].id,
                                            quantity: that.quantity,
                                            amount: that.price,
                                            ticket: that.ticket,
                                            activityId: 1
                                        }).then(res => {
                                            console.log(res);
                                        }).catch(err => {
                                            console.log(err);
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    page {
        background-color: #ebebec;
        padding-bottom: 17%;
    }


    .gift {
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

        .title {
            color: #868f9a;
            padding: 2% 3%;
            background-color: #fff;
        }

        .content {
            display: flex;
            flex-wrap: wrap;
            background-color: #efefef;

            .item {
                background-color: #fff;
                width: 30%;
                color: #868f9a;
                text-align: center;
                margin: 2.5% 0 0 2.5%;
                border-bottom: 2px solid #92c341;

                .ticket {
                    background-color: #b3e657;
                }

                .selected {
                    background-color: #eeeeee;
                }

                .icon {
                    width: 100%;
                    padding-top: 100%;
                    position: relative;

                    image {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .quantity {
            display: flex;
            justify-content: space-between;
            padding: 2.5%;
            background-color: #efefef;

            .num {
                display: flex;
                color: #868f9a;
                align-items: center;

                .price {
                    font-size: 18px;
                }

                .ticket {
                    font-size: 14px;
                }
            }

            .btn {
                display: flex;
                flex-wrap: nowrap;
                color: #868f9a;
                width: 40%;
                border: 1px solid #dadada;

                button {
                    width: 31%;
                    background-color: #efefef;
                    border-radius: 0;
                    margin: 0;
                    line-height: 1.4;
                    color: #868f9a;

                    text-align: center;

                    &:after {
                        border: none;
                    }

                    &:first-child {
                        border-right: 1px solid #dadada;
                    }

                    &:last-child {
                        border-left: 1px solid #dadada;
                    }

                }

                view {
                    width: 40%;
                    text-align: center;
                    padding-top: 1%;
                }
            }
        }
    }

    .send-btn {
        position: fixed;
        bottom: 0;
        color: #ffffff;
        background-color: #1bba0f;
        width: 100%;
        height: 8%;
        line-height: 3.1;
        border-radius: 0;

        &:after {
            border: none;
        }
    }
</style>
