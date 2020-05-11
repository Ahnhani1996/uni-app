<template>
    <view>
        <view class="countdown">
            <view>{{end}} 结束</view>
            距离截止剩余：{{countdown}}
        </view>
        <view class="rank">
            <view class="title">票数排行榜</view>
            <view class="playerGroup">
                <view class="playerList">
                    <view :class="['item','item'+(i+1)]" v-for="(item,i) in playerList" :key="i"
                          @click="intentToVote(item.id)">
                        <view class="no">NO.{{i+1}}</view>
                        <image class="avater" :src="item.coverImg"></image>
                        <view class="name">{{item.name}}</view>
                        <view class="ticket">{{item.ticket}}票</view>
                    </view>
                </view>
                <view class="playerList1">
                    <view class="item" v-for="(item,i) in playerList1" :key="i" @click="intentToVote(item.id)">
                        <img class="avater" :src="item.coverImg" alt="">
                        <view class="mid">
                            <view class="name">{{item.name}}</view>
                            <view class="ticket">{{item.ticket}}票</view>
                        </view>
                        <view class="no">{{i+4}}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                end: '',
                countdown: '',
                playerList: [],
                playerList1: []
            }
        },
        onLoad() {
            this.getPlayerRank();
        },
        methods: {
            getCountdown(date) {
                const formatTime = date.replace(/-/g, '/');
                setInterval(() => {
                    //获取当前时间
                    let nowTime = new Date().getTime();
                    //获取截止时间
                    let endTime = new Date(date).getTime();
                    //获取时间差
                    let difference = (endTime - nowTime) / 1000;
                    //时间差转换成时分秒
                    const res = {
                        'day': difference / 24 / 3600,
                        'hour': difference / 3600 % 24,
                        'minute': difference / 60 % 60,
                        'second': difference % 60
                    };
                    //时分秒分别向下取整
                    const day = Math.floor(res.day);
                    const hours = Math.floor(res.hour);
                    const minutes = Math.floor(res.minute);
                    const seconds = Math.floor(res.second);
                    //拼接倒计时
                    this.countdown = day + '天 ' + hours + '时 ' + minutes + '分 ' + seconds + '秒';
                }, 1000)
            },
            intentToVote(id) {
                uni.navigateTo({
                    url: '../vote/vote?id=' + id
                });
            },
            getPlayerRank() {
                this.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/playerRank', {
                    activityId: 1
                }).then(res => {
                    console.log(res.data.data);
                    this.end = res.data.data.hdActivity.end;
                    this.getCountdown(res.data.data.hdActivity.end);
                    this.playerList.push(...res.data.data.playerList);
                    this.playerList1.push(...res.data.data.playerList1);
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .countdown {
        padding: 3% 0;
        color: #758697;
        font-size: 14px;
        text-align: center;

        view {
            line-height: 2;
        }
    }

    .rank {
        width: 96%;
        margin: 0 auto 2%;

        .title {
            color: #ffffff;
            line-height: 2;
            text-align: center;
            background-color: #31c8b1;
        }

        .playerGroup {
            background-color: #fefefe;
            padding: 2% 2% 0 2%;
            
            .playerList {
                position: relative;
                display: flex;
                padding: 6% 0 4%;
                border-bottom: 1px solid #f4f4f4;

                .item {
                    width: 33%;
                    text-align: center;

                    .no {
                        color: #fec433;
                        margin-bottom: 5%;
                    }

                    .avater {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        margin-bottom: 5%;
                    }

                    .name {
                        color: #758697;
                        margin-bottom: 5%;
                    }

                    .ticket {
                        color: #31c8b1;
                    }
                }

                .item1 {
                    position: absolute;
                    top: 12%;
                    left: 33.3%;

                    .no {
                        display: none;
                    }

                    .avater {
                        width: 70px;
                        height: 70px;
                        border: 2px solid #ffde85;
                    }

                    .name {
                        font-weight: 700;
                    }
                }

                .item3 {
                    position: absolute;
                    left: 66.6%;
                }
            }

            .playerList1 {
                .item {
                    color: #758697;
                    display: flex;
                    padding: 4% 0 4% 4%;
                    border-bottom: 1px solid #f4f4f4;

                    &:last-child {
                        border: none;
                    }

                    .avater {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        margin-right: 3%;
                    }

                    .mid {
                        position: relative;
                        width: 70%;

                        .ticket {
                            position: absolute;
                            bottom: 0;
                        }
                    }

                    .no {
                        line-height: 50px;
                    }
                }
            }
        }

    }
</style>
