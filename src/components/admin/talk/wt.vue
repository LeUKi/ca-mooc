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

        <Modal
                v-model="modal1"
                :title="mod.tit"
                @on-ok="ok">
            <Input v-model="mod.v1" type="textarea" :autosize="true" placeholder="标题.."/>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "wt",
        mounted() {
            this.getgg()
        },
        data() {
            return {
                typeit:'问题',
                modal1: false,
                mod: {
                    tit: "我是标题",
                    v1: "",
                },
                modaltype: 0,//0new,1edit,2del
                ggT: [
                    {
                        title: 'ID',
                        key: 'qid',
                        width: 70
                    },
                    {
                        title: '标题',
                        key: 'interactionQuestion_title',
                        minWidth: 100
                    }],
                ggdata: [
                    {
                        'qid': 'id拉取中..',
                        'interactionQuestion_title': '标题拉取中..',
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
                            tit: '新建'+this.typeit,
                            v1: ''
                        }
                        this.modaltype = 0
                        break
                    }
                    case 1: {
                        this.modaltype = 1
                        this.mod = {
                            tit: '编辑'+this.typeit,
                            v1: this.choosen.interactionQuestion_title,
                        }
                        break
                    }

                }
            },
            ok() {
                switch (this.modaltype) {
                    case 0: {
                        var data1 = {
                            'interactionQuestion_title': this.mod.v1,
                        }
                        this.axios.post('http://118.178.125.139:8060/admin/interactionQuestion/add', this.qs.stringify(data1),
                            {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'token': localStorage.getItem('token')
                                }
                            }).then(res => {
                            this.$Message.success('新建成功！')
                            this.getgg()
                        })
                        break
                    }
                    case 1: {
                        var data2 = {
                            'interactionQuestion_title': this.mod.v1,
                            'qid': this.choosen.id,
                        }
                        this.axios.post('http://118.178.125.139:8060/admin/interactionQuestion/update', this.qs.stringify(data2),
                            {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'token': localStorage.getItem('token')
                                }
                            }).then(res => {
                            this.$Message.success('修改成功！')
                            this.getgg()
                        })
                        break
                    }
                }
            }
            ,
            getgg() {
                this.axios.get('http://118.178.125.139:8060/admin/interactionQuestion/findAll?page=0&size=100',
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'token': localStorage.getItem('token')
                        }
                    }).then(res => {
                    console.log(res)
                    this.ggdata = res.data.extended.InteractionQuestions.content
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
                this.axios.delete('http://118.178.125.139:8060/admin/interactionQuestion/deleteById?id='+this.choosen.qid,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'token': localStorage.getItem('token')
                        }
                    }).then(res => {
                    this.$Message.success('删除成功！')
                    this.getgg()
                })
            }
        }
    }
</script>

<style scoped>

</style>