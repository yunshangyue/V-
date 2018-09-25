<template>
 <mu-container class="main_container">
   <mu-breadcrumbs>
    <mu-breadcrumbs-item key="main" :disabled="false" to="/index/all" >主页</mu-breadcrumbs-item>
    <mu-breadcrumbs-item key="login" :disabled="true" >登陆</mu-breadcrumbs-item>
  </mu-breadcrumbs>
  <mu-row gutter>
  <mu-col span="8" sm="6" md="8" lg="9" xl="8">
     <mu-card class="login_container">
      <mu-text-field color="#e91e63" underline-color="#e91e63" :label-float="true" v-model="accesstoken" label="accesstoken" :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"></mu-text-field>
     <mu-button color="#e91e63" class="login_btn" @click="login" :disabled="btn_dis">登陆</mu-button>
  </mu-card>
  </mu-col>

<mu-col span="4" sm="6" md="4" lg="3" xl="4">
 <mu-card class="desc_container">
     <h4>CNode：Node.js专业中文社区</h4>
     <p>在这里你可以：</p>
     <li class="item">向别人提出你遇到的问题</li>
     <li class="item">帮助遇到问题的人</li>
     <li class="item">分享自己的知识</li>
     <li class="item">和其它人一起进步</li>
  </mu-card>
  </mu-col>
  </mu-row>
 </mu-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      accesstoken: "",
      visibility: false
    };
  },
  methods: {
    ...mapActions(["Login"]),
    login() {
      axios
        .post(`${this.API}/accesstoken`, { accesstoken: this.accesstoken })
        .then(res => {
          if (res.data.success && res.status === 200) {
            this.Login(res.data);
            localStorage.setItem("accesstoken", this.accesstoken);
            this.$toast.message("登陆成功");
            this.$router.push({
              path: "/"
            });
          }
        })
        .catch(e => {
          if (e.response.status === 401 && !e.response.data.success) {
            this.$toast.message(e.response.data.error_msg);
            this.accesstoken = ''
          }
        });
    }
  },
  computed: {
    btn_dis() {
      return this.accesstoken.length <= 0;
    },
    ...mapGetters(["API", "isLogin"])
  },
  created() {
    setTimeout(() => {
      if (this.isLogin) {
        this.$toast.message("已登陆");
        this.$router.push({
          path: "/"
        });
      }
    }, 5000);
  }
};
</script>

<style lang="less" scroped>
.main_container {
  margin-top: 90px;
}
.login_container {
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.desc_container {
  padding: 20px;
}
.item {
  margin-bottom: 10px;
}
.login_btn {
  margin-left: 20px;
}
</style>
