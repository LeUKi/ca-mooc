<template>
    <div class="Cen">
        <Form ref="formInline" :model="formInline" inline>
            <div style="margin-bottom: 30px;font-size: 20px">管理员登入</div>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>

            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <br>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登入</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                formInline: {
                    user: '',
                    password: ''
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$Message.success('Success!');
                this.$Message.error('Fail!');
            }
        }
    }
</script>

<style scoped>
    .Cen {
        margin-top: 60px;
        text-align: center;
    }
</style>
