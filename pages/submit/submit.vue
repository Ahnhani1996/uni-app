<template>
    <view>
        <logo></logo>
        <view class="remind">
            <span style="color: red">*</span>
            请留下您的联系方式，您提交完问卷后可参与抽奖，中奖后工作人员会第一时间联系您！
        </view>
        <view class="form">
            <view class="form-item">
                <view class="title">姓名：</view>
                <input type="text" v-model="name">
            </view>
            <view class="form-item">
                <view class="title">电话：</view>
                <input type="text" v-model="phone">
            </view>
            <view class="form-item">
                <view class="title">性别：</view>
                <radio-group>
                    <label v-for="(item, index) in gender" :key="item">
                        <radio :value="item"></radio>
                        {{item}}
                    </label>
                </radio-group>
            </view>
            <view class="form-item">
                <view class="title">出生日期：</view>
                <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="dateChange">
                    {{date}}
                </picker>
            </view>
        </view>
        <button class="submit-btn" @click="intentToLottery">
            提交
        </button>
    </view>
</template>

<script>
    import logo from "../../components/logo";

    export default {
        data() {
            const currentDate = this.getDate({
                format: true
            })
            return {
                name: '',
                phone: '',
                gender: ['男', '女'],
                date: currentDate
            }
        },
        computed: {
            startDate() {
                return this.getDate('start');
            },
            endDate() {
                return this.getDate('end');
            }
        },
        methods: {
            getDate(type) {
                const date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();

                if (type === 'start') {
                    year = year - 60;
                } else if (type === 'end') {
                    year = date.getFullYear();
                }
                month = month > 9 ? month : '0' + month;
                day = day > 9 ? day : '0' + day;
                return `${year}-${month}-${day}`;
            },
            dateChange: function (e) {
                this.date = e.target.value
            },
            intentToLottery() {
                const nameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
                const phoneReg = /^1[3456789]\d{9}$/;
                if (this.name === '') {
                    uni.showToast({
                        title: '姓名不能为空',
                        icon: 'none',
                        duration: 2000
                    });
                    return false;
                } else if (nameReg.test(this.name) === false) {
                    uni.showToast({
                        title: '姓名格式错误',
                        icon: 'none',
                        duration: 2000
                    });
                    return false;
                }
                if (this.phone === '') {
                    uni.showToast({
                        title: '手机号不能为空',
                        icon: 'none',
                        duration: 2000
                    });
                    return false;
                } else if (phoneReg.test(this.phone) === false) {
                    uni.showToast({
                        title: '手机号格式错误',
                        icon: 'none',
                        duration: 2000
                    });
                    return false;
                }
                uni.navigateTo({
                    url: '../lottery/lottery'
                });
            }
        },
        components: {
            logo
        }
    }
</script>

<style lang="scss">
    page {
        background-color: #fefefe;
    }

    .remind {
        width: 96%;
        margin: 2% auto 0;
    }

    .form {
        width: 85%;
        margin: 0 auto;

        .form-item {
            display: flex;
            align-items: start;
            justify-content: space-between;
            margin: 4% 0 4%;
            height: 35px;
            line-height: 35px;

            .title {
                width: 45%;
            }

            input {
                width: 100%;
                height: 35px;
                border: 1px solid #cbcbcb;
                padding-left: 10px;
            }

            radio-group {
                width: 100%;

                label {
                    margin-right: 4%;
                }
            }

            picker {
                width: 100%;
                height: 35px;
                line-height: 35px;
                margin: auto 0;
                padding-left: 10px;
                color: #808080;
                border: 1px solid #cbcbcb;
            }
        }
    }

    .submit-btn {
        width: 50%;
        color: #ffffff;
        background-color: #1aad19;
        border: 1px solid #168a15;

        &:after {
            border: none;
        }
    }
</style>
