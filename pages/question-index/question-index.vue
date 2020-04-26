<template>
    <view>
        <logo></logo>
        <view class="welcome">
            <view>您好！</view>
            <view class="text">
                感谢您对武汉宏鹏教育的支持与信任，我们秉承教育改变生活的理念，在我校全体教职员工的努力下，已经帮助数万学生，实现了自己的人生理想和学习目标。您的宝贵意见将指导我们在今后的工作中不断努力改进，请务必认真填写！
            </view>
        </view>
        <button class="question-btn" @click="intentToQuestionItem">开始调查问卷</button>
    </view>
</template>

<script>
    import logo from "../../components/logo";

    export default {
        data() {
            return {}
        },
        methods: {
            intentToQuestionItem() {
                uni.navigateTo({
                    url: '../question-item/question-item?index=0'
                })
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

    .welcome {
        width: 80%;
        padding: 6% 5%;
        margin: 2% auto 3%;
        border: 1px solid #000000;
        border-radius: 5px;
        line-height: 1.4;

        .text {
            text-indent: 2em;
        }
    }

    .question-btn {
        width: 50%;
        margin: 0 auto;
        color: #ffffff;
        background-color: #1aad19;
        border: 1px solid #168a15;

        &:after {
            border: none;
        }
    }
</style>
