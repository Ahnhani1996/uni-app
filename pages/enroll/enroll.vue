<template>
    <view class="enroll">
        <view class="name">在线报名</view>
        <view>
            <view class="item">
                <view class="title">选手名称</view>
                <input type="text" placeholder="请输入选手名称" v-model="name">
            </view>
            <view class="item">
                <view class="title">手机号</view>
                <input type="digit" placeholder="请输入手机号" v-model.number="tel">
            </view>
            <view class="item">
                <view class="title">分组</view>
                <picker @change="selectSchool" :value="schoolIndex" :range="schoolArray">
                    {{schoolArray[schoolIndex]}}
                </picker>
            </view>
            <view class="item des">
                <view class="title des-title">选手描述</view>
                <textarea auto-height="true" disable-default-padding="true"
                          placeholder="请输入选手描述" v-model="describes"></textarea>
            </view>
        </view>
        <view class="img-upload">
            <view class="title">上传选手图片(1-3张)</view>
            <view class="btn" v-if="images.length===0" @click="imgUpload">+</view>
            <view v-else class="img-group">
                <view class="img-for" v-for="(item,index) in images" :key="index" @click="actionSheet(index)">
                    <image class="img" :src="item"></image>
                </view>
                <view v-if="images.length<3" class="img-btn" @click="imgUpload">+</view>
            </view>
        </view>
        <button type="primary" class="submit" @click="enrollClickEvent">提交</button>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: -1,
                name: '',
                tel: '',
                describes: '',
                schoolArray: ['全部'],
                schoolIndex: '0',
                schoolIdArray: [],
                schoolId: '',
                images: [],
                pics: [],
                picString: ''
            }
        },
        onLoad() {
            this.getGroupList()
        },
        methods: {
            selectSchool(e) {
                this.schoolIndex = e.target.value;
                this.schoolId = this.schoolIdArray[parseInt(e.target.value) - 1];
            },
            imgUpload() {
                uni.chooseImage({
                    count: 1,
                    success: res => {
                        this.images = this.images.concat(res.tempFilePaths[0]);
                        this.imgToBase64(res.tempFilePaths[0]);
                    }
                })
            },
            imgToBase64(imgPath) {
                uni.getFileSystemManager().readFile({
                    filePath: imgPath,
                    encoding: 'base64',
                    success: res => {
                        this.pics.push({img: 'data:image/png;base64,' + res.data});
                        this.picString = JSON.stringify(this.pics)
                    }
                })
            },
            actionSheet(index) {
                uni.showActionSheet({
                    itemList: ['预览', '删除'],
                    success: (res) => {
                        if (res.tapIndex === 0) {
                            uni.previewImage({
                                urls: this.images
                            })
                        } else if (res.tapIndex === 1) {
                            this.images.splice(index, 1)
                        }
                    }
                })
            },
            getGroupList() {
                this.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/groupList', {
                    activityId: 1
                }).then(res => {
                    console.log(res.data.data);
                    res.data.data.groupList.forEach(data => {
                        this.schoolArray.push(data.name);
                        this.schoolIdArray.push(data.id);
                    })
                    this.userInfo = res.data.data.hdActivity.audit
                })
            },
            enrollClickEvent() {
                const nameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
                const phoneReg = /^1[3456789]\d{9}$/;
                let extend1;
                if (this.userInfo === 1) {
                    extend1 = 0
                } else {
                    extend1 = 1
                }
                if (this.name === '') {
                    uni.showToast({
                        title: '用户名不能为空',
                        icon: 'none',
                        duration: 2000
                    });
                    return false;
                } else if (nameReg.test(this.name) === false) {
                    uni.showToast({
                        title: '用户名格式错误',
                        icon: 'none',
                        duration: 2000
                    });
                    return false;
                }
                if (this.tel === '') {
                    uni.showToast({
                        title: '手机号不能为空',
                        icon: 'none',
                        duration: 2000
                    });
                    return false;
                } else if (phoneReg.test(this.tel) === false) {
                    uni.showToast({
                        title: '手机号格式错误',
                        icon: 'none',
                        duration: 2000
                    });
                    return false;
                } else if (this.pics.length <= 0) {
                    uni.showToast({
                        title: '至少上传一张图片',
                        icon: 'none',
                        duration: 2000
                    });
                    return false;
                } else {
                    this.$fly.post('https://mp.zymcloud.com/hp-hd/applet/activity/add', {
                        activityId: 1,
                        name: this.name,
                        tel: this.tel,
                        describes: this.describes,
                        pics: this.picString,
                        extend1: extend1,
                        groupId: this.schoolId
                    }).then(res => {
                        console.log(res.data)
                        if (res.data.code === 0) {
                            uni.showModal({
                                title: '提示',
                                content: '本活动报名须进行资料审核，请您耐心等待',
                                showCancel: false,
                                success: function (res) {
                                    if (res.confirm) {
                                        uni.reLaunch({
                                            url: '../index/index'
                                        })
                                    }
                                }
                            })
                        } else {
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'none',
                                duration: 2000
                            });
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
    page {
        background-color: #fefefe;
    }

    .enroll {
        width: 96%;
        margin: 0 auto;

        .name {
            color: #738973;
            font-size: 18px;
            text-align: center;
            font-weight: 700;
            border-bottom: 1px solid #ededed;
            line-height: 3.5;
            margin-bottom: 2%;
        }
    }

    .item {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: start;
        line-height: 3.2;

        .title {
            color: #929ebb;
            width: 30%;
        }

        picker {
            width: 100%;
            height: 35px;
            line-height: 35px;
            margin: auto 0;
            padding-left: 10px;
            color: #808080;
            background-color: #fafafd;
            border: 1px solid #ededed;
        }

        input {
            width: 100%;
            margin: auto 0;
            padding-left: 10px;
            min-height: 35px;
            background-color: #fafafd;
            border: 1px solid #ededed;
        }
    }

    .des {
        margin-top: 2%;

        .des-title {
            line-height: 1;
            padding-top: 8px;
        }

        textarea {
            width: 100%;
            line-height: 1;
            min-height: 100px;
            background-color: #fafafd;
            border: 1px solid #ededed;
            padding-left: 10px;
            padding-top: 8px;
        }
    }

    .img-upload {
        color: #b7b7b7;
        margin-top: 4%;

        .name {
            color: #929ebb;
        }

        .btn {
            border: 1px dashed #b7b7b7;
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: 25px;
            font-weight: 700;
            margin-top: 4%;
        }

        .img-group {
            display: flex;
            margin-top: 4%;

            .img-for {
                margin-right: 4%;

                .img {
                    width: 60px;
                    height: 60px;
                }
            }

            .img-btn {
                border: 1px dashed #b7b7b7;
                width: 60px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                font-size: 25px;
                font-weight: 700;
            }
        }
    }

    .submit {
        position: absolute;
        bottom: 2%;
        width: 96%;
    }
</style>
