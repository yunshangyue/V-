<template>
  <mu-container class="main_container">
    <loading :loading="loading"></loading>
  <mu-card :raised="true" class="content">
      <h4 class="title">{{content.title}}</h4>
      <mu-divider></mu-divider>
      <div v-html="content.content" class="content_container"></div>
  </mu-card>
  <mu-card class="replay_container">
      <div class="header">
          <p>{{content.reply_count}} 条回复</p>
          <!-- <p>最新回复：{{ conotent.last_reply_at }} </p> -->
      </div>
    <div class="replay">
        <div v-for="item in content.replies" :key="item.id">
        <div class="replay_item">
            <mu-avatar class="replay_avatar">
                <img :src="item.author.avatar_url">
            </mu-avatar>
        <div class="right">
            <p style="margin:0 0 5px 20px">{{ item.author.loginname }} {{item.create_at.substr(0, 10)}}</p>
            <div style="margin-left: 20px" v-html="item.content"></div>
        </div>
     </div>
        <mu-divider></mu-divider>

     </div>
    </div>
  </mu-card>
  </mu-container>
</template>

<script>
import axios from "axios";
import loading from "../layout/loading.vue";
import { mapGetters } from "vuex";

export default {
    name: 'topic',
  data() {
    return {
      content: {},
      loading: true
    };
  },
  computed: {
    ...mapGetters(["API"])
  },
  mounted() {
    console.log("created");
    axios
      .get(`${this.API}/topic/${this.$route.params.id}`)
      .then(res => {
        console.log(res.data);
        this.content = res.data.data;
        this.$nextTick(() => (this.loading = false));
      })
      .catch(e => console.log(e.response));
  },
  beforeRouteLeave(from, to, next) {
    console.log("live");
    next();
  },
  components: {
    loading
  }
};
</script>

<style lang="less">
.main_container {
  margin-top: 90px;
}
.title {
  padding: 20px;
  margin: 0;
}
.content_container {
  overflow: hidden;
  padding: 0 20px;
}
.replay_ul {
  padding: 20px;
}
.replay_container {
  margin-bottom: 20px;
}
.replay_content {
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.1);
}
.content {
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.header {
  display: flex;
  background-color: rgb(92, 107, 192);
  justify-content: space-between;
  padding: 0 20px;
  color: #fff;
}

.right img {
  width: 100%;
}

ul,
li {
  list-style: none;
}
.replay {
  .replay_item {
    display: flex;
    padding: 20px 20px 0 20px;
    align-items: flex-start;
    .replay_avatar {
    }
    .right {
      flex: 1;
    }
  }
}
img {
  max-width: 100%;
}
</style>
