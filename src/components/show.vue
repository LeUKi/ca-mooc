<template>
    <div class="d" style="user-select:none;">
        <div style="margin: 30px;max-width: 500px;">
            <img style="width: 100%" src="http://pic.lafish.fun/20200511101805.jpg">
            <h2><u>{{tit}}</u></h2>
            <h3>{{ jj }}</h3>
            <p style="float: right">{{tim}}</p>
        </div>
        <div style="margin: 30px;width: 400px;">
            <Page @on-change="getgg"
                  style="float: right"
                  :current="ggpage.show"
                  :total="ggpage.all"
                  simple/>
            <h2><u>课程公告</u></h2>
            <Collapse simple>
                <Panel v-for="i in gg" :name="i.index" :key="i.index">
                    {{ i.notice_title | dUan }} - {{ i.notice_time }}
                    <div slot="content"><h3>{{ i.notice_title }}</h3>
                        <p>{{ i.notice_destination }}</p></div>
                </Panel>
            </Collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "show",
        data() {
            return {
                ggpage: {
                    show: 1,
                    all: 50,
                },
                tit:"标题拉取中..",
                jj: '简介拉取中..',
                tim:'0000-00-00',
                gg: [{
                    "nid": 0,
                    "notice_title": "公告拉取中..",
                    "notice_destination": "公告内容拉取中..",
                    "notice_time": "0000-00-00"
                }]
            }
        },
        filters: {
            dUan: function (v) {
                if (v.length >= 12) {
                    return v.slice(0, 12) + "..."
                } else {
                    return v
                }
            }
        },
        mounted() {
            this.getjj()
            this.getgg(1)
        },
        methods: {
            getjj() {
                this.axios.get('http://118.178.125.139:8060/guest/introduce/find')
                    .then(res => {
                        this.jj = res.data.extended.Introduce.introduce_destination
                        this.tit = res.data.extended.Introduce.introduce_title
                        this.tim = res.data.extended.Introduce.introduce_time

                    })
            },
            getgg(s) {
                this.ggpage.show = s
                var ss = s - 1
                var ggurl = 'http://118.178.125.139:8060/guest/notice/findAll?page=' + ss + '&size=10'
                this.axios.get(ggurl)
                    .then(res => {
                        this.gg = res.data.extended.notices.content
                        this.ggpage.all = res.data.extended.notices.totalElements
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
