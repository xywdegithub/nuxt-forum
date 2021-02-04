<template>
  <div class="wrapper">
    <v-head></v-head>
    <div class="content">
      <el-scrollbar>
        <div class="container responsive">
          <transition name="move" mode="out-in">
           <nuxt-child/>
          </transition>
          <el-backtop target=".content"></el-backtop>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import vHead from "@/components/common/Header.vue";
import { getToken, setToken, removeToken, getUserAvatar, getUserName, getUserId, setUserName, setUserId, setUserAvatar, removeUserName, removeUserId, removeUserAvatar, setUnReadMessage, removeUnReadMessage, getUnReadMessage } from '@/utils/auth';
export default {
  data() {
    return {};
  },
  components: {
    vHead,
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
<style scoped>
.container {
  margin: auto;
  height: 100%;
}
</style>
