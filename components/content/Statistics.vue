<template>
  <div class="infoShow">
    <div class="title">站点统计</div>
    <div
      class="item"
      v-for="(item,key) in data"
      :key="key"
    >{{key}}&nbsp;&nbsp;:&nbsp;&nbsp;<span class="num"> {{item}}</span></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  watch: {
    data: {
      handler(val) {
        this.data = val;
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true,
    },
  },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped>
.title {
  font-size: 14px;
    color:#FF7F00;
    padding-bottom: 5px;
    font-weight: bold;

}
.item {
  height: 40px;
  line-height: 40px;
}
.item:not(:last-child) {
  border-bottom: 1px solid rgba(224, 230, 237, 0.5);
}
.num{
  color: #215686;
}
</style>
