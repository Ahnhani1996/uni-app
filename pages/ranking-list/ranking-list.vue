<template>
    <view>
        <view class="countdown">
            <view>2020-06-01 00:00:00 结束</view>
            距离截止剩余：{{countdown}}
        </view>
        <view class="rank">
            <view class="title">票数排行榜</view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                countdown: ''
            }
        },
        onLoad() {
            this.getCountdown('2020/06/01 00:00:00');
        },
        methods: {
            getCountdown(date) {
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
        margin: 0 auto;

        .title {
            color: #ffffff;
            line-height: 2;
            text-align: center;
            background-color: #31c8b1;
        }
    }
</style>
