<template>
    <div>
        <Layout>
            <Sider hide-trigger>
                <Menu theme="dark" active-name="1">
                    <MenuGroup title="后台管理">
                        <router-link to="/admin">
                            <MenuItem name="1">
                                <Icon type="md-document"/>
                                首页管理
                            </MenuItem>
                        </router-link>

                        <router-link to="/admin/xxzy">
                            <MenuItem name="2">
                                <Icon type="md-chatbubbles"/>
                                资源管理
                            </MenuItem>
                        </router-link>

                        <router-link to="/admin/hdjl">
                            <MenuItem name="3">
                                <Icon type="md-heart"/>
                                互动管理
                            </MenuItem>
                        </router-link>

                        <router-link to="/">
                            <MenuItem name="4" style="color: red">
                                <Icon type="md-leaf"/>
                                退出
                            </MenuItem>

                        </router-link>

                    </MenuGroup>
                </Menu>
            </Sider>
            <Layout class="you">
                <router-view></router-view>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    .you {
        margin: 10px;
        margin-left: 50px;

    }
</style>
