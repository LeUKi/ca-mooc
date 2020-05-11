<template>
    <div class="Cen">
        <Form ref="logindata" :model="logindata" inline>
            <div style="margin-bottom: 30px;font-size: 20px">管理员登入</div>
            <FormItem prop="user">
                <Input type="text" v-model="logindata.username" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>

            <FormItem prop="password">
                <Input type="password" v-model="logindata.password" placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <br>
            <FormItem>
                <Button type="primary" @click="handleSubmit('logindata')">登入</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                logindata: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            handleSubmit() {
                // // var urll = "http://118.178.125.139:8060/adminLogin?username=" + this.logindata.username + "&password=" + this.logindata.password
                this.axios.post("http://118.178.125.139:8060/adminLogin", this.qs.stringify(this.logindata))
                    .then(res => {
                        if (res.data.code === 200) {
                            this.$Message.success('登入成功！');
                            this.$router.push("/admin")
                        }
                    }).catch(error => {
                    this.$Message.error('用户名或密码错误！');
                })
            },
        }
    }
</script>

<style scoped>
    .Cen {
        margin-top: 60px;
        text-align: center;
    }
</style>
