<script>
    export default {
        globalData: {
            questionArray: [
                {
                    id: 1,
                    name: '你选择学习的课程是？',
                    type: 1,
                    items: [
                        {name: '软件工程师', value: 'A'},
                        {name: 'ACCP', value: 'B'},
                        {name: '北美大数据工程师', value: 'C'},
                        {name: 'Java中级程序员', value: 'D'},
                        {name: '互联网架构师', value: 'E'},
                        {name: 'Web前端工程师', value: 'F'}
                    ]
                },
                {
                    id: 2,
                    name: '你选择学校最看中哪方面？',
                    type: 2,
                    items: [
                        {name: '教学质量', value: 'A'},
                        {name: '就业保障', value: 'B'},
                        {name: '品牌知名度', value: 'C'},
                        {name: '课程设置', value: 'D'},
                        {name: '口碑美誉度', value: 'E'},
                        {name: '办学规模', value: 'F'}
                    ]
                },
                {
                    id: 3,
                    name: '你通过哪种渠道找到我们学校的？',
                    type: 1,
                    items: [
                        {name: '在读生推荐', value: 'A'},
                        {name: '毕业生推荐', value: 'B'},
                        {name: '老师介绍', value: 'C'},
                        {name: '百度', value: 'D'},
                        {name: '360', value: 'E'},
                        {name: '抖音', value: 'F'}
                    ]
                },
                {
                    id: 4,
                    name: '你选择我们学校的原因主要是？',
                    type: 2,
                    items: [
                        {name: '课程体系优', value: 'A'},
                        {name: '口碑好', value: 'B'},
                        {name: '就业前景好', value: 'C'},
                        {name: '教学质量佳', value: 'D'},
                        {name: '校区规模大', value: 'E'},
                        {name: '性价比高', value: 'F'}
                    ]
                },
                {
                    id: 5,
                    name: '你希望通过我们的学习获得哪些方面的改变？',
                    type: 3,
                },
                {
                    id: 6,
                    name: '你对咨询接待流程是否满意？',
                    type: 1,
                    items: [
                        {name: '非常满意', value: 'A'},
                        {name: '满意', value: 'B'},
                        {name: '一般', value: 'C'},
                        {name: '不满意（原因必填）', value: 'D'}
                    ]
                },
                {
                    id: 7,
                    name: '你是应届生/非应届？',
                    type: 1,
                    items: [
                        {name: '应届', value: 'A'},
                        {name: '非应届', value: 'B'}
                    ]
                },
                {
                    id: 8,
                    name: '你的学历是？',
                    type: 1,
                    items: [
                        {name: '初中', value: 'A'},
                        {name: '中专', value: 'B'},
                        {name: '高中', value: 'C'},
                        {name: '大专', value: 'D'},
                        {name: '本科', value: 'E'},
                        {name: '硕士', value: 'F'}
                    ]
                }
            ],
            answer: []
        },
        onLaunch: function (option) {
            //console.log(option)
            //console.log('App Launch')
        },
        onShow: function () {
            //console.log('App Show')
        },
        onHide: function () {
            //console.log('App Hide')
        }
    }
</script>

<style>
    /*每个页面公共css */
    page {
        background-color: #eeeeee;
    }
</style>
