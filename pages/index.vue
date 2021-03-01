<template>
  <div class="wrapper">
    <v-head></v-head>
    <div class="content">
      <el-scrollbar>
        <div class="container responsive"> 
            <nuxt-child  keep-alive :keep-alive-props="{ exclude: ['index-details'] }" />
          <el-backtop target=".content"></el-backtop>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import vHead from "@/components/common/Header.vue";
export default {
  data() {
    return {};
  },
  components: {
    vHead,
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
