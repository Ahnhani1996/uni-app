<template>
    <view>
        <logo></logo>
        <!--单选-->
        <view class="question" v-if="question.type===1">
            <view class="num">当前第{{question.id}}题/共{{length}}题</view>
            <view class="title">{{question.id}}.{{question.name}}(单选)</view>
            <radio-group class="content" @change="radioChange">
                <label>
                    <radio class="item" v-for="(item,i) in question.items" :key="i" :value="item.value">
                        {{item.name}}
                    </radio>
                </label>
                <textarea class="text-type1" v-if="showStatus" auto-height="true" disable-default-padding="true"
                          placeholder="请提出您宝贵的意见" @blur="textareaBulr"></textarea>
            </radio-group>
        </view>
        <!--多选-->
        <view class="question" v-if="question.type===2">
            <view class="num">当前第{{question.id}}题/共{{length}}题</view>
            <view class="title">{{question.id}}.{{question.name}}(多选)</view>
            <checkbox-group class="content" @change="radioChange">
                <label>
                    <checkbox class="item" v-for="(item,i) in question.items" :key="i" :value="item.value">
                        {{item.name}}
                    </checkbox>
                </label>
                <textarea class="text-type1" v-if="showStatus" auto-height="true" disable-default-padding="true"
                          placeholder="请提出您宝贵的意见" @blur="textareaBulr"></textarea>
            </checkbox-group>
        </view>
        <!--填空-->
        <view class="question" v-if="question.type===3">
            <view class="num">当前第{{question.id}}题/共{{length}}题</view>
            <view class="title">{{question.id}}.{{question.name}}(必填)[填空题]</view>
            <textarea class="text-type2" auto-height="true" disable-default-padding="true" placeholder="请提出您宝贵的意见"
                      @blur="radioChange"></textarea>
        </view>
        <button class="next-btn" @click="next">下一题</button>
    </view>
</template>

<script>
    import logo from "../../components/logo";

    export default {
        components: {
            logo
        },
        data() {
            return {
                length: 0,
                question: {},
                showStatus: false
            }
        },
        onLoad(option) {
            this.length = getApp().globalData.questionArray.length;
            this.question = getApp().globalData.questionArray[option.index];
        },
        onUnload() {
            getApp().globalData.index -= 1;
        },
        methods: {
            unloadEvent() {
                if (getApp().globalData.index > 0) {

                    console.log(getApp().globalData.index)
                } else {
                    console.log(111)
                }
            },
            toast() {
                uni.showToast({
                    title: '请至少选择一个答案',
                    icon: 'none',
                    duration: 2000
                })
            },
            intentToNext() {
                getApp().globalData.index = parseInt(getApp().globalData.index) + 1
                uni.navigateTo({
                    url: '../question-item/question-item?index=' + getApp().globalData.index
                })
            },
            next() {
                switch (getApp().globalData.index) {
                    case 0:
                        if (getApp().globalData.lesson == '') {
                            this.toast()
                        } else {
                            this.intentToNext()
                        }
                        break;
                    case 1:
                        if (getApp().globalData.advantage == '') {
                            this.toast()
                        } else {
                            this.intentToNext()
                        }
                        break;
                    case 2:
                        if (getApp().globalData.place == '') {
                            this.toast()
                        } else {
                            this.intentToNext()
                        }
                        break;
                    case 3:
                        if (getApp().globalData.cause == '') {
                            this.toast()
                        } else {
                            this.intentToNext()
                        }
                        break;
                    case 4:
                        if (getApp().globalData.changee == '') {
                            uni.showToast({
                                title: '请留下您宝贵的意见',
                                icon: 'none',
                                duration: 2000
                            })
                        } else {
                            this.intentToNext()
                        }
                        break;
                    case 5:
                        if (getApp().globalData.satisfaction == '') {
                            this.toast()
                        } else {
                            this.intentToNext()
                        }
                        break;
                    case 6:
                        if (getApp().globalData.current == '') {
                            this.toast()
                        } else {
                            this.intentToNext()
                        }
                        break;
                    case 7:
                        if (getApp().globalData.education == '') {
                            this.toast()
                        } else {
                            uni.navigateTo({
                                url: '../submit/submit'
                            })
                        }
                        break;
                }
            },
            radioChange(e) {
                if (e.target.value.includes('其他') || e.target.value.includes('不满意（原因必填）')) {
                    this.showStatus = true
                } else {
                    this.showStatus = false
                }
                switch (getApp().globalData.index) {
                    case 0:
                        getApp().globalData.lesson = e.target.value;
                        break;
                    case 1:
                        getApp().globalData.advantage = e.target.value;
                        break;
                    case 2:
                        getApp().globalData.place = e.target.value;
                        break;
                    case 3:
                        getApp().globalData.cause = e.target.value;
                        break;
                    case 4:
                        getApp().globalData.changee = e.target.value;
                        break;
                    case 5:
                        getApp().globalData.satisfaction = e.target.value;
                        break;
                    case 6:
                        getApp().globalData.current = e.target.value;
                        break;
                    case 7:
                        getApp().globalData.education = e.target.value;
                        break;
                }
            },
            textareaBulr(e) {
                console.log(e.target.value);
            }
        }
    }
</script>

<style lang="scss">
    page {
        background-color: #fefefe;
    }

    .question {
        width: 90%;
        margin: 0 auto 3%;

        .num {
            line-height: 2;
        }

        .title {
            font-weight: 700;
            margin-bottom: 2.5%;
        }

        .content {
            border: 1px solid #eeecec;

            .item {
                display: block;
                line-height: 2;
                border-bottom: 1px solid #eeecec;
                padding-left: 2%;

                &:last-child {
                    border-bottom: none;
                }

                span {
                    margin-left: 2%;
                }
            }
        }

        .text-type1 {
            width: 85.5%;
            border: 1px solid #eeecec;
            border-radius: 5px;
            padding: 5%;
            margin: 0 auto 1.5%;
        }

        .text-type2 {
            min-height: 100px;
            border: 1px solid #eeecec;
            border-radius: 5px;
            padding: 5%;
        }
    }

    .next-btn {
        width: 50%;
        color: #ffffff;
        margin: 0 auto 2%;
        background-color: #1aad19;
        border: 1px solid #168a15;

        &:after {
            border: none;
        }
    }
</style>
