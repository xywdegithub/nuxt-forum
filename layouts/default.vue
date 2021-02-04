<template>
    <Nuxt />
</template>
<script>
import { getToken, setToken, removeToken, getUserAvatar, getUserName, getUserId, setUserName, setUserId, setUserAvatar, removeUserName, removeUserId, removeUserAvatar, setUnReadMessage, removeUnReadMessage, getUnReadMessage } from '@/utils/auth';
export default {
  data() {
    return {};
  },
  created(){
      if(getToken()){
          this.$store.commit('SET_TOKEN', getToken());
        // this.$store.commit('SET_NAME', data.user.userName);
        // this.$store.commit('SET_AVATAR', data.user.avatar)
        // this.$store.commit('SET_UserId', data.user.userId)
        // this.$store.commit('SET_UnReadMessage', data.user.unReadMessage)
      }
  },
  methods: {},
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
