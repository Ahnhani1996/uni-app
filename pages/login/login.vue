<template>
    <view>
        <button type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</button>
    </view>
</template>

<script>
    export default {
        data() {
            return {}
        },
        onLoad() {
            this.checkOpenId();
        },
        methods: {
            bindGetUserInfo(e) {
                if (e.detail.userInfo) {
                    uni.setStorage({
                        key: 'userInfo',
                        data: e.detail.userInfo
                    });
                    const that = this;
                    uni.getSetting({
                        success(res) {
                            if (res.authSetting['scope.userInfo']) {
                                uni.getUserInfo({
                                    success(res) {
                                        uni.login({
                                            success: res => {
                                                that.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/getAppid', {
                                                    code: res.code
                                                }).then((res) => {
                                                    console.log(res);
                                                    uni.switchTab({
                                                        url: '../index/index'
                                                    })
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                } else {
                    uni.showModal({
                        title: '温馨提示',
                        content: '未经授权无法使用该功能！'
                    })
                }
            },
            checkOpenId() {
                const that = this;
                uni.getSetting({
                    success(res) {
                        if (res.authSetting['scope.userInfo']) {
                            uni.getUserInfo({
                                success(res) {
                                    uni.login({
                                        success: res => {
                                            that.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/getAppid', {
                                                code: res.code
                                            }).then(res => {
                                                console.log(res)
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss">

</style>
