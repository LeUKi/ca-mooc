<template>
    <div class="d" style="user-select:none;">
        <div style="margin: 30px;width: 460px;">
            <h1><u>实践教学</u></h1>
            <Collapse v-model="v1" accordion>
                <Panel v-for="i in sjjx" :name="i.index" :key="i.index">
                    {{ i.practicalTeach_title }}
                    <div slot="content">
                        <a :href="i.practicalTeach_url">
                            <Button size="small" style="float: right;">
                                <Icon type="md-link"/>
                            </Button>
                        </a>
                        <h3>{{ i.practicalTeach_title }} </h3>
                        <h4>{{ i.practicalTeach_destination }}</h4>
                        <p> {{ i.practicalTeach_time }}</p>
                    </div>
                </Panel>
            </Collapse>
        </div>

        <div style="margin: 30px;width: 460px;">
            <h1><u>网络课</u></h1>
            <Collapse v-model="v2" accordion>
                <Panel v-for="i in wlk" :name="i.index" :key="i.index">
                    {{ i.onlineClass_title }}
                    <div slot="content">
                        <a :href="i.onlineClass_url">
                            <Button size="small" style="float: right;">
                                <Icon type="ios-videocam" />
                            </Button>
                        </a>
                        <h3> {{ i.onlineClass_title }} </h3>
                        <h4>{{ i.onlineClass_destination }}</h4>
                        <p>{{ i.onlineClass_time }}</p>
                    </div>
                </Panel>
            </Collapse>
        </div>

        <div style="margin: 30px;width: 460px;">
            <h1><u>讲座</u></h1>
            <Collapse v-model="v3" accordion>
                <Panel v-for="i in jz" :name="i.index" :key="i.index">
                    {{ i.lecture_title }}
                    <div slot="content">
                        <h3> {{ i.lecture_title }} </h3>
                        <h4>{{ i.lecture_destination }}</h4>
                        <p>{{ i.lecture_time }}</p>
                    </div>
                </Panel>
            </Collapse>
        </div>

        <div style="margin: 30px;width: 460px;">
            <h1><u>在线测评</u></h1>
            <Collapse v-model="v5" accordion>
                <Panel v-for="i in zxpc" :name="i.index" :key="i.index">
                    {{ i.onlineTest_title }}
                    <div slot="content">
                        <a :href="i.onlineTest_url">
                            <Button size="small" style="float: right;">
                                <Icon type="md-checkmark-circle-outline" />
                            </Button>
                        </a>
                        <h3> {{ i.onlineTest_title }} </h3>
                        <h4>{{ i.onlineTest_destination }}</h4>
                        <p>{{ i.onlineTest_time }}</p>
                    </div>
                </Panel>
            </Collapse>
        </div>

        <div style="margin: 30px;width: 460px;">
            <h1><u>课程</u></h1>
            <Collapse v-model="v4" accordion>
                <Panel v-for="i in kc" :name="i.index" :key="i.index">
                    {{ i.case_library_title }}
                    <div slot="content">
                        <a :href="i.case_library_text">
                            <Button size="small" style="float: right;">
                                <Icon type="ios-videocam" />
                            </Button>
                        </a>
                        <a :href="i.case_library_video">
                            <Button size="small" style="float: right;">
                                <Icon type="ios-document"/>
                            </Button>
                        </a>
                        <h3> {{ i.case_library_title }} </h3>
                        <h4>{{ i.case_library_destination }}</h4>
                        <p>{{ i.case_library_time }}</p>
                    </div>
                </Panel>
            </Collapse>
        </div>

    </div>

</template>

<script>
    export default {
        name: "study",
        data() {
            return {
                v1: "1",
                v2: "1",
                v3: "1",
                v4: "1",
                v5: "1",
                sjjx: [{
                    "pid": 1,
                    "practicalTeach_title": "拉取中..",
                    "practicalTeach_destination": "拉取中..",
                    "practicalTeach_time": "0000-00-00",
                    "practicalTeach_url": "/"
                }],
                wlk: [{
                    "ocid": 1,
                    "onlineClass_title": "拉取中..",
                    "onlineClass_destination": "拉取中..",
                    "onlineClass_time": "0000-00-00",
                    "onlineClass_url": "/"
                }],
                jz: [{
                    "lid": 1,
                    "lecture_title": "拉取中..",
                    "lecture_destination": "拉取中..",
                    "lecture_time": "0000-00-00"
                }],
                kc: [{
                    "cid": 1,
                    "case_library_title": "拉取中..",
                    "case_library_destination": "拉取中..",
                    "case_library_time": "0000-00-00",
                    "case_library_video": "/",
                    "case_library_text": "/"
                }],
                zxpc: [{
                    "oid": 1,
                    "onlineTest_title": "拉取中..",
                    "onlineTest_destination": "拉取中..",
                    "onlineTest_time": "0000-00-00",
                    "onlineTest_url": "/"
                }]
            }
        },
        filters: {
            dUan: function (v) {
                if (v.length >= 15) {
                    return v.slice(0, 15) + "..."
                } else {
                    return v
                }
            }
        },
        mounted() {
            this.getsjjx()
            this.getwlk()
            this.getjz()
            this.getkc()
            this.getzxpc()
        },
        methods: {
            getsjjx() {
                this.axios.get('http://118.178.125.139:8060/guest/practicalTeach/findAll?page=0&size=100')
                    .then(res => {
                        this.sjjx = res.data.extended.PracticalTeachs.content
                    })
            },
            getwlk() {
                this.axios.get('http://118.178.125.139:8060/guest/onlineClass/findAll?page=0&size=100')
                    .then(res => {
                        this.wlk = res.data.extended.OnlineClasss.content
                    })
            },
            getjz() {
                this.axios.get('http://118.178.125.139:8060/guest/lecture/findAll?page=0&size=100')
                    .then(res => {
                        this.jz = res.data.extended.Lectures.content
                    })
            },
            getkc() {
                this.axios.get('http://118.178.125.139:8060/guest/case/findAll?page=0&size=100')
                    .then(res => {
                        this.kc = res.data.extended.CaseLibrarys.content
                    })
            },
            getzxpc() {
                this.axios.get('http://118.178.125.139:8060/guest/onlineTest/findAll?page=0&size=100')
                    .then(res => {
                        this.zxpc = res.data.extended.OnlineTests.content
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

    .ivu-collapse {
        background-color: white;
    }
</style>
