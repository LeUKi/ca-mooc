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
            <Input v-model="mod.v1" type="textarea" :autosize="true" placeholder="标题.."/>
            <Input v-model="mod.v2" type="textarea" :autosize="{minRows: 2,maxRows:15}"
                   placeholder="内容.."/>
            PPT <input type="file" ref="file1"><br>
            Video <input type="file" ref="file2">
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "kc",
        mounted() {
            this.getgg(1)
        },
        data() {
            return {
                page: {
                    show: '1',
                    all: '50'
                },
                typeit: '课程',
                modal1: false,
                mod: {
                    tit: "我是标题",
                    v1: "",
                    v2: "",
                    v3: "", v4: ''
                },
                modaltype: 0,//0new,1edit,2del
                ggT: [
                    {
                        title: 'ID',
                        key: 'cid',
                        width: 70
                    },
                    {
                        title: '标题',
                        key: 'case_library_title',
                        minWidth: 150
                    },
                    {
                        title: '内容',
                        key: 'case_library_destination',
                        minWidth: 100
                    }, {
                        title: 'PPT',
                        key: 'case_library_text',
                        minWidth: 200
                    }, {
                        title: 'Video',
                        key: 'case_library_video',
                        minWidth: 200
                    }, {
                        title: '时间',
                        key: 'case_library_time',
                        minWidth: 100
                    }],
                ggdata: [
                    {
                        'cid': 'id拉取中..',
                        'case_library_title': '标题拉取中..',
                        'case_library_destination': '内容拉取中..',
                        'case_library_time': '时间拉取中..',
                        'case_library_video': '视频拉取中..',
                        'case_library_text': 'PPT拉取中..'
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
                            v3: '', v4: ''
                        }
                        this.modaltype = 0
                        break
                    }
                    case 1: {
                        this.modaltype = 1
                        this.mod = {
                            tit: '编辑' + this.typeit,
                            v1: this.choosen.case_library_title,
                            v2: this.choosen.case_library_destination,
                            v4: this.choosen.case_library_text,
                            v3: this.choosen.case_library_video
                        }
                        break
                    }

                }
            },
            ok() {
                switch (this.modaltype) {
                    case 0: {
                        let formData = new FormData();
                        formData.append('case_library_title', this.mod.v1)
                        formData.append('case_library_destination', this.mod.v2)
                        formData.append('casePPT', this.$refs.file1.files[0])
                        formData.append('caseVideo', this.$refs.file2.files[0])

                        this.axios.post('http://118.178.125.139:8060/admin/case/add', formData,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    'token': localStorage.getItem('token')
                                }
                            }).then(res => {
                            this.$Message.success('新建成功！')
                            this.getgg(this.page.show)
                        })
                        break
                    }
                    case 1: {
                        let formData2 = new FormData();
                        formData2.append('id', this.choosen.cid)
                        formData2.append('case_library_title', this.mod.v1)
                        formData2.append('case_library_destination', this.mod.v2)
                        formData2.append('casePPT', this.$refs.file1.files[0])
                        formData2.append('caseVideo', this.$refs.file2.files[0])
                        this.axios.post('http://118.178.125.139:8060/admin/case/update', formData2,
                            {
                                headers: {
                                    'Content-Type': 'application/multipart/form-data',
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
                this.axios.get('http://118.178.125.139:8060/admin/case/findAll?page='+ss+'&size=8',
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'token': localStorage.getItem('token')
                        }
                    }).then(res => {
                    this.ggdata = res.data.extended.CaseLibrarys.content
                    this.page.all = res.data.extended.CaseLibrarys.totalElements
                    this.$Message.success('加载成功！')
                })
            }
            ,
            handleContextMenu(row) {
                const index = this.ggdata.findIndex(item => item.cid === row.cid);
                this.choosen = row
                var i = index + 1
                this.$Message.info('你选中了第' + i + '行（ID:' + row.cid + '）');
            }
            ,
            del() {
                this.axios.delete('http://118.178.125.139:8060/admin/case/deleteById?id=' + this.choosen.cid,
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