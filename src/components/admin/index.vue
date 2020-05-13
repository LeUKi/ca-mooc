<template>
    <div>
        <Layout>
            <Sider hide-trigger>
                <Menu theme="dark" active-name="1">
                    <MenuGroup title="后台管理">
                        <MenuItem to="/admin" name="1">
                            <Icon type="ios-navigate"/>
                            首页管理
                        </MenuItem>

                        <MenuItem to="/admin/xxzy" name="2">
                            <Icon type="ios-book"/>
                            资源管理
                        </MenuItem>

                        <MenuItem to="/admin/hdjl" name="3">
                            <Icon type="md-chatboxes"/>
                            互动管理
                        </MenuItem>
                        <MenuItem name="4" style="color: red">
                            <div v-on:click="outadmin">
                                <Icon type="ios-undo"/>
                                退出
                            </div>
                        </MenuItem>
                    </MenuGroup>
                </Menu>
            </Sider>
            <Layout class="you">
                <card style="min-height: 100%">
                    <router-view></router-view>
                </card>
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
</style>
