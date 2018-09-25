<!--  -->
<template>
<div>
  <vHeader></vHeader>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>
  
</template>

<script>
import vHeader from "./layout/header.vue";
import axios from 'axios'
import { mapGetters,mapActions } from 'vuex'

export default {
  metaInfo: {
    title: "CNode：Node.js专业中文社区"
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['API'])
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
     axios.post(`${this.API}/accesstoken`, { accesstoken }).then(
            res => {
                if (res.data.success && res.status === 200) {
                   this.Login(res.data)
                } 
            }
        ).catch(e => {
            console.log(e)
        })
  },
  methods: {
    ...mapActions(["Login"])
  },
  components: {
    vHeader
  }
};
</script>
<style lang='less' scoped>
</style>