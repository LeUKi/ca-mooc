<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-settings"/>
                            后台管理
                        </MenuItem>
                        <MenuItem name="2" style="color: red">
                            <div v-on:click="outadmin">
                                <Icon type="ios-undo"/>
                                退出
                            </div>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-1" theme="light" width="auto" :open-names="['1','2','3']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"/>
                                首页管理
                            </template>
                            <MenuItem name="1-1" to="/admin/jj">简介</MenuItem>
                            <MenuItem name="1-2" to="/admin/gg">公告</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-book"/>
                                资源管理
                            </template>
                            <MenuItem name="2-1" to="/admin/sjjx">实践教学</MenuItem>
                            <MenuItem name="2-2" to="/admin/wlk">网络课</MenuItem>
                            <MenuItem name="2-3" to="/admin/jz">讲座</MenuItem>
                            <MenuItem name="2-4" to="/admin/zxcp">在线测评</MenuItem>
                            <MenuItem name="2-5" to="/admin/kc">课程</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-settings"/>
                                互动管理
                            </template>
                            <MenuItem name="3-1" to="/admin/wt">问题</MenuItem>
                            <MenuItem name="3-2" to="/admin/hf">回复</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Content :style="{padding: '24px', margin:  '24px 0',minHeight: '600px', background: '#fff'}">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import guest from "../guest";

    export default {
        name: "index",
        beforeCreate() {
            const token = localStorage.getItem('token')
            if (!token) {
                this.$Message.error('还未登入！')
                this.$router.push({name: 'login'})
            }
        },
        methods: {
            outadmin() {
                localStorage.clear()
                this.$Message.success('退出成功！')
                this.$router.push("/")
            }
        }
    }
</script>

<style scoped>
    .you {
        margin: 10px;
        margin-left: 50px;

    }

    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;

    }


    .layout-nav {
        width: 220px;
        margin: auto;
    }
</style>
