<template>
  <el-menu :default-active="onRoutes" router  >
    <el-menu-item v-for="item in data" :key="item.index" :index="item.index">
       <!-- <i :class="item.icon"></i> -->
      <span slot="title">{{item.title}}</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data() {
      return{

      }
  },
  props:{
     data:Array,
     default(){
         return []
     }
  },
  methods: {   handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }},
   computed: {
        onRoutes() {
            console.log(this.$route.path)
            return this.$route.path.replace('/', '');
        }
    },
  mounted() {}
};
</script>
<style scoped>
</style>
