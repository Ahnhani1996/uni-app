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
                        {{item.value}}.{{item.name}}
                    </radio>
                </label>
            </radio-group>
        </view>
        <!--多选-->
        <view class="question" v-if="question.type===2">
            <view class="num">当前第{{question.id}}题/共{{length}}题</view>
            <view class="title">{{question.id}}.{{question.name}}(多选)</view>
            <checkbox-group class="content" @change="radioChange">
                <label>
                    <checkbox class="item" v-for="(item,i) in question.items" :key="i" :value="item.value">
                        {{item.value}}.{{item.name}}
                    </checkbox>
                </label>
            </checkbox-group>
        </view>
        <!--填空-->
        <view class="question" v-if="question.type===3">
            <view class="num">当前第{{question.id}}题/共{{length}}题</view>
            <view class="title">{{question.id}}.{{question.name}}(必填)[填空题]</view>
            <textarea auto-height="true" disable-default-padding="true" placeholder="请提出您宝贵的意见"
                      @blur="radioChange"></textarea>
        </view>
        <button class="next-btn" @click="nextQuestion">下一题</button>
    </view>
</template>

<script>
    import logo from "../../components/logo";

    export default {
        data() {
            return {
                index: 0,
                length: 0,
                question: {}
            }
        },
        methods: {
            nextQuestion() {
                if (getApp().globalData.answer.length === this.length) {
                    console.log('已回答问题等于数组长度')
                    uni.navigateTo({
                        url: '../submit/submit'
                    })
                } else if (getApp().globalData.answer.length === parseInt(this.index) + 1) {
                    console.log('已回答问题等于当前页下标+1')
                    this.index = parseInt(this.index) + 1;
                    uni.navigateTo({
                        url: '../question-item/question-item?index=' + this.index
                    })
                } else if (getApp().globalData.answer.length === 0) {
                    console.log('已回答问题等于0')
                    uni.showToast({
                        title: '请完成填空',
                        icon: 'none',
                        duration: 2000
                    });
                } else if (getApp().globalData.answer.length < parseInt(this.index) + 1) {
                    console.log('已回答问题小于当前页下标')
                    uni.showToast({
                        title: '请完成填空',
                        icon: 'none',
                        duration: 2000
                    });
                }
            },
            radioChange(e) {
                getApp().globalData.answer.splice(this.index, 1);
                getApp().globalData.answer.splice(this.index, 0, {value: e.target.value});
            }
        },
        onLoad(option) {
            this.index = option.index;
            this.length = getApp().globalData.questionArray.length;
            this.question = getApp().globalData.questionArray[option.index];
            console.log(this.question)
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

        textarea {
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
