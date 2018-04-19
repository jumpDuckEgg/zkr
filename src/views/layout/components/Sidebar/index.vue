<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import ScrollBar from "@/components/ScrollBar";

export default {
    components: { SidebarItem, ScrollBar },
    computed: {
        ...mapGetters(["sidebar"]),
        routes() {
            let roles = this.$store.state.user.roles;
            let routes = this.$router.options.routes;
            if (roles == "普通用户") {
                for (let i = 0; i < routes.length; i++) {
                    if (
                        routes[i].path == "/user" ||
                        routes[i].path == "/file" ||
                        routes[i].path == "/achievement" ||
                        routes[i].path == "/personManager"
                    ) {
                        routes[i].hidden = true;
                    }
                }
            }
            if (roles == "管理员") {
                for (let i = 0; i < routes.length; i++) {
                    if (routes[i].path == "/user") {
                        routes[i].hidden = true;
                    }
                }
            }
            return this.$router.options.routes;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    }
};
</script>
