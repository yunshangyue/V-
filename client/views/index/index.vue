<template>
<mu-container class="main_container">
  <mu-card :raised="true">
  <mu-tabs  change="inSide(value)" :value.sync="shift" inverse color="secondary" text-color="rgba(0, 0, 0, .54)" full-width>
    <mu-tab to="/index/all" value="all">全部</mu-tab>
    <mu-tab to="/index/good" value="music">精华</mu-tab>
    <mu-tab to="/index/ask" value="good">问答</mu-tab>
    <mu-tab to="/index/share" value="share">分享</mu-tab>
    <mu-tab to="/index/job" value="job">招聘</mu-tab>
    <mu-tab to="/index/dev" value="dev">测试</mu-tab>
  </mu-tabs>
  <!-- <mu-bottom-nav :value.sync="shift" shift>
    <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video"></mu-bottom-nav-item>
    <mu-bottom-nav-item value="music" title="Music" icon="music_note"></mu-bottom-nav-item>
    <mu-bottom-nav-item value="books" title="Books" icon="books"></mu-bottom-nav-item>
    <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo"></mu-bottom-nav-item>
  </mu-bottom-nav> -->
<router-view></router-view>
  </mu-card>
</mu-container>
</template>

<script>
export default {
  data() {
    return {
      shift: ''
    };
  },
  methods:{
    
  },
  created() {
    
  },
  mounted() {
    let leng = this.$route.path.split('/').length - 1
    this.shift = this.$route.path.split('/')[leng]
  },
  components: {}
};
</script>

<style lang="less" scoped>
.main_container {
  margin-top: 30px;
}
</style>
