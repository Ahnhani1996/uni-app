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
            //this.checkOpenId();
        },
        methods: {
            bindGetUserInfo(e) {
                //用户授权，存储userInfo
                if (e.detail.userInfo) {
                    uni.setStorageSync('userInfo', e.detail.userInfo);
                    const that = this;
                    uni.getSetting({
                        success(res) {
                            if (res.authSetting['scope.userInfo']) {
                                uni.getUserInfo({
                                    success(res) {
                                        uni.setStorageSync('nickName', res.userInfo.nickName);
                                        uni.login({
                                            success: res => {
                                                that.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/getAppid', {
                                                    code: res.code
                                                }).then((res) => {
                                                    uni.setStorageSync('openid', res.data.data.openid);
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
            }
            /*checkOpenId() {
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
            }*/
        }
    }
</script>

<style lang="scss">

</style>
