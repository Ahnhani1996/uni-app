<template>
    <view>
        <view class="gift">
            <view class="title">送礼物加票数</view>
            <view class="content">
                <view class="item" v-for="(item,index) in giftList" :key="index" @click="selectGift(index)">
                    <view :class="{selected:index === currentSelected}">{{item.name}}</view>
                    <view class="poll">+{{item.poll}}票</view>
                </view>
            </view>
            <view class="count">
                <view class="num">
                    <view class="price">￥{{price}}</view>
                    <view class="poll">+{{poll}}票</view>
                </view>
                <view class="btn">
                    <button @click="reduceGift">-</button>
                    <view>{{count}}</view>
                    <button @click="incrementGift">+</button>
                </view>
            </view>
        </view>
        <button class="send-btn">立即送出</button>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                giftList: [
                    {id: 1, name: '棒棒糖', price: 0.01, poll: 20},
                    {id: 2, name: '花花', price: 18, poll: 65},
                    {id: 3, name: '么么哒', price: 25, poll: 99},
                    {id: 4, name: '666', price: 50, poll: 240},
                    {id: 5, name: '告白气球', price: 98, poll: 550},
                    {id: 6, name: '小心心', price: 168, poll: 1000}
                ],
                currentSelected: 0,
                count: 1
            }
        },
        computed: {
            price: {
                get() {
                    return this.giftList[this.currentSelected].price * this.count;
                },
                set(val) {
                }
            },
            poll: {
                get() {
                    return this.poll = this.giftList[this.currentSelected].poll * this.count;
                },
                set(val) {
                }
            }
        },
        methods: {
            selectGift(index) {
                this.currentSelected = index;
                this.count = 1
            },
            incrementGift() {
                this.count += 1;
            },
            reduceGift() {
                if (this.count >= 2) {
                    this.count -= 1;
                }
            }
        },
        onLoad() {
            this.selectGift(this.currentSelected);
        }
    }
</script>

<style lang="scss">
    page {
        background-color: #ebebec;
    }

    .gift {
        width: 96%;
        margin: 0 auto;
        background-color: #efefef;

        .title {
            color: #868f9a;
            padding: 2% 3%;
            background-color: #fff;
        }

        .content {
            display: flex;
            flex-wrap: wrap;

            .item {
                background-color: #fff;
                width: 30%;
                color: #868f9a;
                text-align: center;
                margin: 2.5% 0 0 2.5%;
                border-bottom: 2px solid #92c341;

                .poll {
                    background-color: #b3e657;
                }

                .selected {
                    background-color: #eeeeee;
                }

            }
        }

        .count {
            display: flex;
            justify-content: space-between;
            padding: 2.5%;

            .num {
                display: flex;
                color: #868f9a;
                align-items: center;

                .price {
                    font-size: 18px;
                }

                .poll {
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
        border-radius: 0;

        &:after {
            border: none;
        }
    }
</style>
