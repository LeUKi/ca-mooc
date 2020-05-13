<template>
    <div class="d">
        <card style="width: 800px">

            <p slot="title">简介</p>
            <Input v-model="jj" type="textarea" :autosize="{minRows: 8}" placeholder="Enter something..."/>
            <Button @click="jjchange" type="primary" style="float: right;margin:17px ">修改</Button>
        </card>
    </div>
</template>

<script>
    export default {
        name: "jj",
        mounted() {
            this.getjj()
        },
        data() {
            return {
                jj: "拉取中..",
            }
        },
        methods: {
            getjj() {
                this.axios.get('http://118.178.125.139:8060/guest/introduce/find')
                    .then(res => {
                        this.jj = res.data.extended.Introduce.introduce_destination
                    })
            },
            jjchange() {
                var data1 = {
                    'iid': localStorage.getItem('userid'),
                    'introduce_destination': this.jj,
                    'id': 1,
                    'introduce_title': ' “电路分析”课程简介',
                }
                this.axios.post('http://118.178.125.139:8060/admin/introduce/update', this.qs.stringify(data1),
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'token': localStorage.getItem('token')
                        }
                    }).then(res=>{
                        this.$Message.success('修改成功！')
                })


            }

        }
    }
</script>

<style scoped>
    .d {
        margin: auto;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
