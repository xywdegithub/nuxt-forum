<template>
  <div class="admin">
    <div class="current" v-if="routeName != 'Details'">当前版主</div>
    <div class="current" v-else>发起人</div>
    <div class="main">
      <el-avatar shape="square" size="large" :src="data.avatar"></el-avatar>
      <div class="right">
        <div class="name">{{ data.userName }}</div>
        <a v-if="data.introduction" class="remark" :title="data.introduction">
          {{ data.introduction }}
        </a>
      </div>
    </div>
    <div class="bottom">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      routeName: this.$route.name,
    };
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
  mounted() {
    console.log(this.routeName);
  },
};
</script>
<style scoped>
.admin {
  background: white;
  border-radius: 5px;
  font-size: 12px;
}
.main {
  display: flex;
  padding-bottom: 10px;
}
.right {
  margin-left: 10px;
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.name {
  color: #155faa;
  text-align: left;
  margin-bottom: 4px;
}
.remark {
  font-size: 12px;
  text-align: left;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.current {
  font-size: 14px;
  padding-bottom: 18px;
  text-align: left;
  color: #ff7f00;
}
</style>
