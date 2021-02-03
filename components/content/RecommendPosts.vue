<template>
  <div class="recommendPost">
    <div class="text">相关推荐</div>
    <li v-for="(item,key) in data" :key="key">
      <router-link :to="{
                    name: 'index-details',
                    query: { postId: item.postId },
                  }">{{item.title}}</router-link>
    </li>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {},
  mounted() {}
};
</script>
<style scoped>
.text{
  text-align: left;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
    color: #333;
}
li{
  list-style: none;
  text-align: left;
  padding: 3px 0;
  font-size: 12px;
  line-height: 160%;
}
li a{
  color:#155faa
;
}
li a:hover{
  color:#409EFF;
}
</style>
