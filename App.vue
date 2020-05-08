<script>
    export default {
        globalData: {
            questionArray: [
                {
                    id: 1,
                    name: '你选择学习的课程是？',
                    type: 1,
                    items: [
                        {id: 1, value: '1', name: 'A.软件工程师'},
                        {id: 1, value: '2', name: 'B.ACCP',},
                        {id: 1, value: '3', name: 'C.北美大数据工程师',},
                        {id: 1, value: '4', name: 'D.Java中级程序员',},
                        {id: 1, value: '5', name: 'E.互联网架构师',},
                        {id: 1, value: '6', name: 'F.Web前端工程师',},
                        {id: 1, value: '7', name: 'G.UI设计师',},
                        {id: 1, value: '8', name: 'H.Python工程师',},
                        {id: 1, value: '9', name: 'I.云计算工程师',}
                    ]
                },
                {
                    id: 2,
                    name: '你选择学校最看中哪方面？',
                    type: 2,
                    items: [
                        {id: 1, value: '教学质量', name: 'A.教学质量'},
                        {id: 1, value: '就业保障', name: 'B.就业保障'},
                        {id: 1, value: '品牌知名度', name: 'C.品牌知名度'},
                        {id: 1, value: '课程设置', name: 'D.课程设置'},
                        {id: 1, value: '口碑美誉度', name: 'E.口碑美誉度',},
                        {id: 1, value: '办学规模', name: 'F.办学规模',},
                        {id: 1, value: '校园环境', name: 'G.校园环境',},
                        {id: 1, value: '住宿条件', name: 'H.住宿条件',},
                        {id: 1, value: '性价比', name: 'I.性价比',},
                        {id: 1, value: '其他', name: 'J.其他', type: 0}
                    ]
                },
                {
                    id: 3,
                    name: '你通过哪种渠道找到我们学校的？',
                    type: 1,
                    items: [
                        {id: 1, value: '在读生推荐', name: 'A.在读生推荐'},
                        {id: 1, value: '毕业生推荐', name: 'B.毕业生推荐'},
                        {id: 1, value: '老师介绍', name: 'C.老师介绍'},
                        {id: 1, value: '百度', name: 'D.百度'},
                        {id: 1, value: '360', name: 'E.360'},
                        {id: 1, value: '抖音', name: 'F.抖音'},
                        {id: 1, value: '头条', name: 'G.头条'},
                        {id: 1, value: '其它网络搜索', name: 'H.其它网络搜索'},
                        {id: 1, value: '公交车站广告牌', name: 'I.公交车站广告牌'},
                        {id: 1, value: '地铁广告', name: 'J.地铁广告'},
                        {id: 1, value: '校园宣讲', name: 'K.校园宣讲'},
                        {id: 1, value: '招聘会', name: 'L.招聘会'},
                        {id: 1, value: '户外单页', name: 'M.户外单页'},
                        {id: 1, value: '其他', name: 'N.其他', type: 0}
                    ]
                },
                {
                    id: 4,
                    name: '你选择我们学校的原因主要是？',
                    type: 2,
                    items: [
                        {id: 1, value: '课程体系优', name: 'A.课程体系优'},
                        {id: 1, value: '口碑好', name: 'B.口碑好'},
                        {id: 1, value: '就业前景好', name: 'C.就业前景好'},
                        {id: 1, value: '教学质量佳', name: 'D.教学质量佳'},
                        {id: 1, value: '校区规模大', name: 'E.校区规模大'},
                        {id: 1, value: '性价比高', name: 'F.性价比高'},
                        {id: 1, value: '校园环境好', name: 'G.校园环境好'},
                        {id: 1, value: '试听效果好', name: 'H.试听效果好'},
                        {id: 1, value: '品牌知名度', name: 'I.品牌知名度'},
                        {id: 1, value: '师资力量', name: 'J.师资力量'},
                        {id: 1, value: '课程模式', name: 'K.课程模式'},
                        {id: 1, value: '父母决定', name: 'L.父母决定'},
                        {id: 1, value: '亲友的决定', name: 'M.亲友的决定'},
                        {id: 1, value: '专业兴趣', name: 'N.专业兴趣'},
                        {id: 1, value: '其他', name: 'O.其他', type: 0},
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
                        {id: 1, value: '1', name: 'A.非常满意'},
                        {id: 1, value: '2', name: 'B.满意'},
                        {id: 1, value: '3', name: 'C.一般'},
                        {id: 1, value: '4', name: 'D.不满意（原因必填）', type: 0}
                    ]
                },
                {
                    id: 7,
                    name: '你是应届生/非应届？',
                    type: 1,
                    items: [
                        {id: 1, value: '1', name: 'A.应届'},
                        {id: 1, value: '2', name: 'B.非应届'}
                    ]
                },
                {
                    id: 8,
                    name: '你的学历是？',
                    type: 1,
                    items: [
                        {id: 1, value: '1', name: 'A.初中'},
                        {id: 1, value: '2', name: 'B.中专'},
                        {id: 1, value: '3', name: 'C.高中'},
                        {id: 1, value: '4', name: 'D.大专'},
                        {id: 1, value: '5', name: 'E.本科'},
                        {id: 1, value: '6', name: 'F.硕士'},
                        {id: 1, value: '7', name: 'G.博士'},
                    ]
                }
            ],
            index: 0,
            name: '',//姓名
            cause: '',//4.原因
            lesson: '',//1.课程
            advantage: '',//2.看重
            place: '',//3.渠道
            changee: '',//5.改变
            satisfaction: '',//6.接待
            negativeComment: '',//姓名
            education: '',//8.学历
            current: '',//7.应届
            sex: '',//性别
            birthday: '',//生日
            tel: '',//电话
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
