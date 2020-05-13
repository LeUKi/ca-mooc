<template>
    <div>
        <div>
            <div style="float: right;margin-top: 13px">
                <span style="margin:30px">#对项目右键以编辑或删除</span>
                <Button type="success" icon="md-add">新建</Button>
            </div>
            <span style="font-size: 35px">公告</span>
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
                <DropdownItem @click.native="handleContextMenuEdit">编辑</DropdownItem>
                <DropdownItem @click.native="handleContextMenuDelete" style="color: #ed4014">删除</DropdownItem>
            </template>
        </Table>

        <Modal
                v-model="modal1"
                title="Common Modal dialog box title"
                @on-ok="ok">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "gg",
        mounted() {
            this.getgg()
        },
        data() {
            return {
                modal1:false,
                ggT: [
                    {
                        title: 'ID',
                        key: 'nid',
                        width: 60
                    },
                    {
                        title: '标题',
                        key: 'notice_title',
                        minWidth: 100
                    },
                    {
                        title: '内容',
                        key: 'notice_destination',
                        minWidth: 500
                    }, {
                        title: '时间',
                        key: 'notice_time',
                        minWidth: 100
                    }],
                ggdata: [
                    {
                        nid: 'id拉取中..',
                        notice_title: '标题拉取中..',
                        notice_destination: '内容拉取中..',
                        notice_time: '时间拉取中..',
                    }],
                choosenid: 0
            }
        },
        methods: {
            ok(){

            },
            getgg() {
                this.axios.get('http://118.178.125.139:8060/admin/notice/findAll?page=0&size=5',
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'token': localStorage.getItem('token')
                        }
                    }).then(res => {
                    this.ggdata = res.data.extended.notices.content
                    this.$Message.success('加载成功！')
                })
            },
            handleContextMenu(row) {
                const index = this.ggdata.findIndex(item => item.nid === row.nid);
                this.choosenid = row.nid
                var i = index +1
                this.$Message.info('你选中了第' + i + '行（ID:' + this.choosenid + '）');
            },
            handleContextMenuEdit() {

            },
            handleContextMenuDelete() {

            }
        }
    }
</script>

<style scoped>

</style>