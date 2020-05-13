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
            <Input v-model="mod.v2" type="textarea" :autosize="{minRows: 2,maxRows:15}"
                   placeholder="内容.."/>
            <Input v-model="mod.v3" type="textarea" :autosize="true" placeholder="URL.."/>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "wlk",
        mounted() {
            this.getgg()
        },
        data() {
            return {
                typeit: '网络课',
                modal1: false,
                mod: {
                    tit: "我是标题",
                    v1: "",
                    v2: "",
                    v3: ""
                },
                modaltype: 0,//0new,1edit,2del
                ggT: [
                    {
                        title: 'ID',
                        key: 'ocid',
                        width: 70
                    },
                    {
                        title: '标题',
                        key: 'onlineClass_title',
                        minWidth: 100
                    },
                    {
                        title: '内容',
                        key: 'onlineClass_destination',
                        minWidth: 300
                    }, {
                        title: 'URL',
                        key: 'onlineClass_url',
                        minWidth: 300
                    }, {
                        title: '时间',
                        key: 'onlineClass_time',
                        minWidth: 100
                    }],
                ggdata: [
                    {
                        'ocid': 'id拉取中..',
                        'onlineClass_title': '标题拉取中..',
                        'onlineClass_destination': '内容拉取中..',
                        'onlineClass_time': '时间拉取中..',
                        'onlineClass_url': 'URL拉取中..',
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
                            v1: this.choosen.onlineClass_title,
                            v2: this.choosen.onlineClass_destination,
                            v3: this.choosen.onlineClass_url
                        }
                        break
                    }

                }
            },
            ok() {
                switch (this.modaltype) {
                    case 0: {
                        var data1 = {
                            'onlineClass_title': this.mod.v1,
                            'onlineClass_destination': this.mod.v2,
                            'onlineClass_url': this.mod.v3
                        }
                        this.axios.post('http://118.178.125.139:8060/admin/onlineClass/add', this.qs.stringify(data1),
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
                            'ocid': localStorage.getItem('userid'),
                            'onlineClass_title': this.mod.v1,
                            'onlineClass_destination': this.mod.v2,
                            'onlineClass_url': this.mod.v3,
                            'id': this.choosen.ocid,
                        }
                        this.axios.post('http://118.178.125.139:8060/admin/onlineClass/update', this.qs.stringify(data2),
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
                this.axios.get('http://118.178.125.139:8060/admin/onlineClass/findAll?page=0&size=100',
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'token': localStorage.getItem('token')
                        }
                    }).then(res => {
                    console.log(res)
                    this.ggdata = res.data.extended.OnlineClasss.content
                    this.$Message.success('加载成功！')
                })
            }
            ,
            handleContextMenu(row) {
                const index = this.ggdata.findIndex(item => item.ocid === row.ocid);
                this.choosen = row
                var i = index + 1
                this.$Message.info('你选中了第' + i + '行（ID:' + row.ocid + '）');
            }
            ,
            del() {
                this.axios.delete('http://118.178.125.139:8060/admin/onlineClass/deleteById?id=' + this.choosen.ocid,
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