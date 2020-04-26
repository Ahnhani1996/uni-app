<template>
    <view>
        <view class="lottery-box">
            <view class="start" @click="clickStart">抽奖</view>
            <view v-for="(item,i) in giftList" :key="i" :class="['item','item'+(i+1),{'active':index===i}]">

            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                giftList: [
                    {"id": 1, "number": 1, "name": "1"},
                    {"id": 2, "number": 1, "name": "2"},
                    {"id": 3, "number": 1, "name": "3"},
                    {"id": 4, "number": 1, "name": "4"},
                    {"id": 5, "number": 1, "name": "5"},
                    {"id": 6, "number": 1, "name": "6"},
                    {"id": 7, "number": 1, "name": "7"},
                    {"id": 8, "number": 1, "name": "8"}
                ],
                timer: 0,//定时器
                index: 0,//动态class下标
                times: 0,//当前转动次数
                speed: 200,//速度
                cycle: 0,//总计转动次数
                drawStatus: true
            }
        },
        methods: {
            //点击抽奖按钮
            clickStart() {
                if (this.drawStatus === false) {
                    uni.showToast({
                        title: '抽奖已结束',
                        icon: 'none',
                        duration: 1000
                    });
                } else if (this.times !== 0) {
                    uni.showToast({
                        title: '抽奖已开始',
                        icon: 'none',
                        duration: 1000
                    });
                } else {
                    //初始化总计转动次数
                    this.cycle = 50 + parseInt(Math.random() * 50);
                    this.startRoll();
                }
            },
            //开始转动
            startRoll() {
                this.oneRoll();
                this.usePrice();
            },
            //单次转动
            oneRoll() {
                this.index += 1;
                this.times += 1;
                if (this.index > this.giftList.length - 1) {
                    this.index = 0
                }
            },
            usePrice() {
                if (this.times === this.cycle) {
                    clearTimeout(this.timer);
                    this.drawStatus = false;
                } else {
                    if (this.times < this.cycle - 20) {
                        this.speed -= 4;
                    } else {
                        this.speed += 10;
                    }
                    this.timer = setTimeout(this.startRoll, this.speed);
                }
            }
        }
    }
</script>

<style lang="scss">
    .lottery-box {
        width: 90%;
        padding-top: 90%;
        margin: 0 auto;
        border: 4px solid #fed900;
        position: relative;

        .start {
            position: absolute;
            left: 35%;
            top: 35%;
            width: 30%;
            height: 30%;
            border: 1px solid #fe0202;
            text-align: center;
        }

        .item {
            position: absolute;
            width: 30%;
            height: 30%;
            border: 1px solid #fe0202;
        }

        .item1 {
            left: 2.5%;
            top: 2.5%;
        }

        .item2 {
            left: 35%;
            top: 2.5%;
        }

        .item3 {
            left: 67.5%;
            top: 2.5%;
        }

        .item4 {
            left: 67.5%;
            top: 35%;
        }

        .item5 {
            left: 67.5%;
            top: 67.5%;
        }

        .item6 {
            left: 35%;
            top: 67.5%;
        }

        .item7 {
            left: 2.5%;
            top: 67.5%;
        }

        .item8 {
            left: 2.5%;
            top: 35%;
        }

        .active {
            background: #FFF2B1;
        }
    }
</style>
