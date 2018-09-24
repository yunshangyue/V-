<!--  -->
<template>
<div>
  <vHeader></vHeader>
  <router-view></router-view>
</div>
  
</template>

<script>
import vHeader from "./layout/header.vue";
import { mapActions, mapState } from "vuex";

export default {
  metaInfo: {
    title: "CNode：Node.js专业中文社区"
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    if (typeof localStorage === "undefined" || localStorage === null) {
      return;
    }
    const accesstoken = localStorage.getItem("accesstoken");
    if (!accesstoken) {
      console.log("no localStorage");
      return;
    }
    this.isLogin(accesstoken);
  },
  methods: {
    ...mapActions(["isLogin"])
  },
  components: {
    vHeader
  }
};
</script>
<style lang='less' scoped>
</style>