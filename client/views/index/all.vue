<template>
<div>
<mu-paper :z-depth="1" class="demo-list-wrap">
 <loading :loading="loading"/>  
 <mu-list textline="two-line">
   <mu-list-item avatar button v-for="item in list" :key="item.id" @click="toPic(item.id)">
      <mu-list-item-action>
        <mu-avatar>
          <img :src="item.author.avatar_url" alt="">
        </mu-avatar>
      </mu-list-item-action>
      <mu-list-item-content>
        <mu-list-item-title>
          <span class="type top" v-if="item.top">置顶</span>
          <span class="type common" v-else-if="item.tab == 'share'">分享</span>
          <span class="type common" v-else-if="item.tab == 'ask' ">问答</span>
          <span class="type common" v-else-if="item.tab == 'job' ">工作</span>
          <span class="type common" v-else-if="item.tab == 'dev' ">测试</span>
          <span class="type good" v-else-if="item.tab == 'good' || item.good === true">测试</span>
          {{item.title}}
          </mu-list-item-title>
        <mu-list-item-sub-title>{{ item.create_at.substr(0, 10)}}</mu-list-item-sub-title>
      </mu-list-item-content>
      <mu-list-item-action>
        <mu-button icon>
          <mu-icon value="info"></mu-icon>
        </mu-button>
      </mu-list-item-action>
    </mu-list-item>

   </mu-list>
   <mu-flex justify-content="center" class="page_container">
    <mu-pagination raised :total="1000" :current.sync="current" @change="handleChange"></mu-pagination>
  </mu-flex>
</mu-paper>

</div>

</template>

<script>
import axios from "axios";

import loading from "../../layout/loading.vue";

export default {
  data() {
    return {
      list: [],
      loading: true,
      current: 1
    };
  },
  methods: {
    handleChange() {
      axios.get(`https://cnodejs.org/api/v1/topics?page=${this.current}&limit=15`)
        .then(res => {
          this.list = res.data.data
        }).catch(e =>{
          console.log(e.response)
          this.$toast.message('emmm 出错了')
        })
    },
    toPic(id) {
      this.$router.push({
        path: `/topic/${id}`
      })
    }
  },
  created() {
    axios
      .get("https://cnodejs.org/api/v1/topics?page=1&limit=15")
      .then(res => {
        if (res.data.success && res.status === 200) {
          console.log(res.data)
          this.list = res.data.data;
          this.$nextTick(() => (this.loading = false));
        }
      })
      .catch(e => console.log(e.response));
  },
  components: {
    loading
  }
};
</script>

<style lang='less' scoped>
.type {
  margin-right: 10px;
  font-size: 12px;
  padding: 5px 7px;
  border-radius: 5px;
  margin-bottom: 5px;
  color: #fff;
  &.top {
    background-color: #e91e63;
  }
  &.common {
    background-color: #2196f3;
  }
  &.good {
    background-color: #311b92;
  }
}
.page_container {
  padding-bottom: 35px;
  margin: 10px 0px;
}
</style>
