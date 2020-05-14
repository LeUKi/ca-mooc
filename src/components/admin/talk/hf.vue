<template>
    <div>
        <div>
            <div style="float: right;margin-top: 13px">
                <span style="margin:30px">#对项目右键以编辑或删除</span>
                <Button @click="showmodal(0)" type="success" icon="md-add">新建</Button>
            </div>
            <span style="font-size: 35px">{{typeit}}</span>
        </div>

        <Table size="large"
               stripe border
               :columns="ggT"
               :data="ggdata"
               context-menu
               show-context-menu
               @on-contextmenu="handleContextMenu"
        >
            <template slot="contextMenu">
                <DropdownItem @click.native="showmodal(1)">编辑</DropdownItem>
                <DropdownItem @click.native="del" style="color: #ed4014">删除</DropdownItem>
            </template>
        </Table>
        <Page :total="page.all"
              show-elevator
              show-total
              page-size="8"
              @on-change="getgg"
              style="text-align: center;margin-top: 10px"
        />
        <Modal
                v-model="modal1"
                :title="mod.tit"
                @on-ok="ok">
            <Input v-model="mod.v1" type="textarea" :autosize="true" placeholder="问题ID.."/>
            <Input v-model="mod.v2" type="textarea" :autosize="{minRows: 2,maxRows:15}"
                   placeholder="回复.."/>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "hf",
        mounted() {
            this.getgg(1)
        },
        data() {
            return {
                page: {
                    show: '1',
                    all: '50'
                },
                typeit: '回复',
                modal1: false,
                mod: {
                    tit: "我是标题",
                    v1: "",
                    v2: "",
                    v3: ""
                },
                modaltype: 0,//0new,1edit,2del
                ggT: [{
                    title: 'ID',
                    key: 'aid',
                    width: 70
                }, {
                    title: '回复内容',
                    key: 'answer',
                    minWidth: 300
                }, {
                    title: '问题及问题ID',
                    key: 'q',
                    minWidth: 100
                }, {
                    title: '时间',
                    key: 'interactionAnswer_time',
                    minWidth: 100
                }],
                ggdata: [
                    {
                        'aid': 'id拉取中..',
                        'answer': '内容拉取中..',
                        'practicalTeach_time': '时间拉取中..',
                        'qid': '问题拉取中..',
                    }],
                choosen: {}
            }
        },
        methods: {
            showmodal(ss) {
                this.modal1 = true
                switch (ss) {
                    case 0: {
                        this.mod = {
                            tit: '新建' + this.typeit,
                            v1: '',
                            v2: '',
                            v3: ''
                        }
                        this.modaltype = 0
                        break
                    }
                    case 1: {
                        this.modaltype = 1
                        this.mod = {
                            tit: '编辑' + this.typeit,
                            v1: this.choosen.qid,
                            v2: this.choosen.answer,
                        }
                        break
                    }

                }
            },
            ok() {
                switch (this.modaltype) {
                    case 0: {
                        var data1 = {
                            'questionId': this.mod.v1,
                            'answer': this.mod.v2,
                        }
                        this.axios.post('http://118.178.125.139:8060/admin/interactionAnswer/add', this.qs.stringify(data1),
                            {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'token': localStorage.getItem('token')
                                }
                            }).then(res => {
                            this.$Message.success('新建成功！')
                            this.getgg(this.page.show)
                        })
                        break
                    }
                    case 1: {
                        var data2 = {
                            'questionId': this.mod.v1,
                            'answer': this.mod.v2,
                            'id': this.choosen.aid,
                        }
                        this.axios.post('http://118.178.125.139:8060/admin/interactionAnswer/update', this.qs.stringify(data2),
                            {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'token': localStorage.getItem('token')
                                }
                            }).then(res => {
                            this.$Message.success('修改成功！')
                            this.getgg(this.page.show)
                        })
                        break
                    }
                }
            }
            ,
            getgg(s) {
                this.page.show = s
                var ss = s - 1
                this.axios.get('http://118.178.125.139:8060/admin/interactionAnswer/findAll?page='+ss+'&size=8',
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'token': localStorage.getItem('token')
                        }
                    }).then(res => {
                    for (var i = 0; i < res.data.extended.InteractionAnswers.content.length; i++) {
                        res.data.extended.InteractionAnswers.content[i].q = "[" +
                            res.data.extended.InteractionAnswers.content[i].interactionQuestion.qid + "] " +
                            res.data.extended.InteractionAnswers.content[i].interactionQuestion.interactionQuestion_title
                        res.data.extended.InteractionAnswers.content[i].qid =
                            res.data.extended.InteractionAnswers.content[i].interactionQuestion.qid
                    }
                    this.ggdata = res.data.extended.InteractionAnswers.content
                    this.page.all = res.data.extended.InteractionAnswers.totalElements
                    this.$Message.success('加载成功！')
                })
            }
            ,
            handleContextMenu(row) {
                const index = this.ggdata.findIndex(item => item.id === row.id);
                this.choosen = row
                var i = index + 1
                this.$Message.info('你选中了第' + i + '行（ID:' + row.id + '）');
            }
            ,
            del() {
                this.axios.delete('http://118.178.125.139:8060/admin/interactionAnswer/deleteById?id=' + this.choosen.aid,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'token': localStorage.getItem('token')
                        }
                    }).then(res => {
                    this.$Message.success('删除成功！')
                    this.getgg(this.page.show)
                })
            }
        }
    }
</script>

<style scoped>

</style>