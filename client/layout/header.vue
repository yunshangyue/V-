<template>
 <mu-appbar class="nav" color="indigo400">
      <mu-button icon slot="left" to="/">
        <mu-icon value="cloud" ></mu-icon>
      </mu-button>
  CNode

  <mu-button flat slot="right" to="/login" v-if="!isLogin">登录</mu-button>
   <mu-avatar size="40" v-if="isLogin" flat slot="right">
      <img :src="user.avatar_url">
    </mu-avatar>
</mu-appbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['user', 'isLogin']),
  },
  components: {}
};
</script>

<style lang='less' scoped>
.nav {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 101;
}
</style>
