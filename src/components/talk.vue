<template>
    <div class="d">

        <Card v-for="i in t" :name="i.index" :key="i.index" style="width: 420px;margin: 30px">
            <p slot="title">{{ i.interactionQuestion_title }} {{ i.interactionQuestion_time }}</p>
            <div v-for="j in i.interactionAnswers" :name="j.index" :key="j.index">
                <h4>{{ j.answer }}</h4>
                <p>{{ j.interactionAnswer_time }}<br></p>
            </div>
        </Card>

    </div>
</template>

<script>
    export default {
        name: "talk",
        data() {
            return {
                t: [{
                    "qid": 1,
                    "interactionQuestion_title": "电路的三种工作状态分别是什么?",
                    "interactionQuestion_time": "2020-05-01",
                    "interactionAnswers": [
                        {
                            "aid": 1,
                            "answer": "1.通路状态2.短路状态3.开路状态",
                            "interactionAnswer_time": "2020-05-01"
                        }
                    ]
                }]
            }
        },
        mounted() {
            this.gett()
        },
        methods: {
            gett() {
                this.axios.get('http://118.178.125.139:8060/guest/interactionQuestion/findAll?page=0&size=100')
                    .then(res => {
                        this.zxpc = res.data.extended.InteractionQuestions.content
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
