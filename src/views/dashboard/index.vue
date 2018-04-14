<template>
    <div class="dashboard-container">
        <div class="dashboard-text">用户名:{{name}}</div>
        <div class="dashboard-text">权限:
            <span v-for='role in roles' :key='role'>{{role}}</span>
        </div>
        <div>
            <img class="emptyGif" :src="imageurl" alt="">
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import person from "@/assets/user/person.gif";
export default {
  name: "dashboard",
  data() {
    return {
      imageurl: person
    };
  },
  computed: {
    ...mapGetters(["name", "roles"])
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    background-color: #e3e3e3;
    min-height: 80vh;
    padding: 50px 60px 0px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
  .emptyGif {
    display: block;
    width: 40%;
    margin: 0 auto;
  }
</style>
