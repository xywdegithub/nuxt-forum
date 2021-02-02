<template>
  <div class="mine" v-if="data">
    <div class="head">
      <el-avatar shape="square" :size="50" :src="data.avatar"></el-avatar>
      <div class="center">
        <div class="name">{{data.userName}}</div>
        <p class="remark">{{data.introduction}}</p>
      </div>
      <div class="right">
        <slot></slot>
      </div>
    </div>
    <div class="star">
      <i class="iconfont iconzan"></i>获赞 {{data.agreeNumber}} 次</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
    };
  },
  props: {
    data: Object,
    default() {
      return {};
    }
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
};
</script>
<style scoped>
.mine {
  border-bottom: 1px solid #f0f0f0;
}
.head {
  display: flex;
  align-items: center;
  padding-top: 16px;
}
.center {
  flex: 1;
  margin-left: 24px;
  text-align: left;
  height: 50px;
  line-height: 25px;
}
.name {
  font-size: 18px;
  font-weight: bold;
}
.remark {
  font-size: 14px;
}
.star {
  text-align: left;
  height: 32px;
  line-height: 32px;
  border-top: 1px solid #f0f0f0;
  margin-top: 16px;
  font-size: 14px;
}
</style>