<template>
    <view>
        <swipers :background="imgUrls"></swipers>
        <view class="data">
            <view class="item">
                <view>{{enroll}}</view>
                <view>已报名</view>
            </view>
            <view class="item">
                <view>{{sumVote}}</view>
                <view>总报名</view>
            </view>
            <view class="item">
                <view>{{browse}}</view>
                <view>浏览量</view>
            </view>
        </view>
        <button class="enroll-btn" @click="intentToEnroll">我要报名</button>
        <view class="countdown">距离活动结束：{{countdown}}</view>
        <view class="search">
            <input type="text" placeholder="姓名" v-model="name">
            <button>搜索</button>
        </view>
        <view class="picker">
            <picker @change="selectSchool" :value="schoolIndex" :range="schoolArray">
                {{schoolArray[schoolIndex]}}
            </picker>
        </view>
        <view class="player">
            <view class="item" v-for="(item,i) in players" :key="i" @click="intentToVote">
                <view class="id">编号：{{item.id}}</view>
                <view class="cover">
                    <img :src="item.coverImg" alt="">
                </view>
                <view>{{item.name}}</view>
                <view class="ticket">{{item.ticket}}票</view>
                <button>投票</button>
            </view>
        </view>
        <view class="bottom" v-if="index>=total">
            已经到底了~
        </view>
        <view class="music" @click="backgroundMusicControl">
            音乐
        </view>
        <view class="fixed">
            <view @click="intentToActivity">列表</view>
            <view>关注</view>
            <view>客服</view>
        </view>
    </view>
</template>

<script>
    import swiper from "../../components/swiper";

    const innerAudioContext = uni.createInnerAudioContext();

    export default {
        components: {
            "swipers": swiper
        },
        data() {
            return {
                imgUrls: [],
                enroll: 0,
                sumVote: 0,
                browse: 0,
                countdown: "",
                schoolArray: ['选择分组'],
                schoolIndex: "0",
                players: [],
                backgroundMusicStatus: true,
                total: 0,
                index: 10,
                name: ''
            }
        },
        onLoad() {
            this.backgroundMusic();
        },
        created() {
            this.getIndexData();
            this.getActivityPlayer();
            this.searchPlayer()
        },
        onReachBottom() {
            this.getActivityPlayer();
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
            },
            selectSchool(e) {
                this.schoolIndex = e.target.value
            },
            intentToEnroll() {
                uni.navigateTo({
                    url: '../enroll/enroll'
                });
            },
            backgroundMusic() {
                this.backgroundMusicStatus = true;
                //innerAudioContext.autoplay = true;
            },
            backgroundMusicControl() {
                if (this.backgroundMusicStatus === true) {
                    this.backgroundMusicStatus = !this.backgroundMusicStatus;
                    innerAudioContext.pause();
                } else {
                    this.backgroundMusicStatus = !this.backgroundMusicStatus;
                    innerAudioContext.play();
                }
            },
            intentToActivity() {
                uni.navigateTo({
                    url: '../activity/activity'
                });
            },
            intentToVote() {
                uni.navigateTo({
                    url: '../vote/vote'
                });
            },
            getIndexData() {
                this.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/list', {
                    activityId: 1
                }).then(res => {
                    //console.log(res.data.data);
                    res.data.data.coverList.forEach(data => {
                        this.imgUrls.push(data.url)
                    });
                    this.enroll = res.data.data.hdActivity.enroll;
                    this.sumVote = res.data.data.hdActivity.sumVote;
                    this.browse = res.data.data.hdActivity.browse;
                    this.getCountdown(res.data.data.hdActivity.end);
                    innerAudioContext.src = res.data.data.hdActivity.music;
                })
            },
            getActivityPlayer() {
                this.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/activityPlayer', {
                    'activityId': 1
                }).then(res => {
                    console.log(res.data);
                    this.total = res.data.total;
                    this.players = res.data.rows.splice(0, this.index);
                    this.index += 10;
                    res.data.rows.forEach(data => {
                        this.schoolArray.push(data.groupName)
                    });
                    this.schoolArray = this.duplicateRemoval(this.schoolArray);
                })
            },
            duplicateRemoval(arr) {
                let newArray = []
                arr.forEach(item => {
                    if (!newArray.includes(item)) {
                        newArray.push(item)
                    }
                });
                return newArray;
            },
            searchPlayer() {
                this.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/activityPlayer', {
                    'activityId': 1,
                    'name': '张'
                }).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .data {
        width: 95%;
        min-height: 65px;
        margin: 3% auto 3%;
        color: #ffffff;
        background-color: #31c8b1;
        border-radius: 5px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;

        .item {
            width: 33.3%;
            text-align: center;
        }
    }

    .enroll-btn {
        width: 70%;
        color: #ffffff;
        background-color: #32c8b1;
        margin-bottom: 3%;

        &:after {
            border: none;
        }
    }

    .countdown {
        width: 95%;
        margin: 0 auto 3%;
        color: #758697;
        background-color: #f5fefe;
        border: 1px solid #c8ebf1;
        border-bottom: none;
        border-radius: 5px 5px 0 0;
        line-height: 2.5;
        text-align: center;
    }

    .search {
        width: 96%;
        margin: 0 auto 3%;
        display: flex;

        input {
            width: 66.6%;
            height: 35px;
            padding-left: 3%;
            background-color: #fefefe;
        }

        button {
            width: 33.3%;
            height: 35px;
            line-height: 35px;
            color: #ffffff;
            background-color: #31c8b1;
            border-radius: 0;

            &:after {
                border: none;
            }
        }
    }

    .picker {
        width: 96%;
        margin: 0 auto 3%;

        picker {
            width: 49%;
            color: #ffffff;
            line-height: 2;
            text-align: center;
            background-color: #31c8b1;
        }
    }

    .player {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 96%;
        margin: 0 auto;

        .item {
            width: 49%;
            background-color: #fefefe;
            position: relative;
            margin-bottom: 2%;

            view {
                width: 90%;
                margin: 0 auto;
                font-size: 13px;
                line-height: 2;
                color: #758697;
            }

            .id {
                margin: 0;
                max-width: 50%;
                color: #ffffff;
                opacity: .5;
                background-color: #000;
                font-size: 13px;
                padding: 0 5px;
                text-align: center;
                position: absolute;
            }

            .cover {
                width: 100%;
                padding-top: 100%;
                position: relative;

                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            }

            .ticket {
                color: #31c8b1;
            }

            button {
                width: 90%;
                color: #ffffff;
                background-color: #31c8b1;
                font-size: 16px;
                text-align: center;
                line-height: 2;
                border-radius: 0;
                margin-bottom: 3%;

                &:after {
                    border: none;
                }
            }
        }
    }

    .music {
        position: fixed;
        right: 0;
        top: 5%;
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
            border-bottom: 1px solid #c9ebf1;

            &:last-child {
                border: none;
            }
        }
    }

    .bottom {
        color: #cbcbcb;
        text-align: center;
        line-height: 4;
    }
</style>
