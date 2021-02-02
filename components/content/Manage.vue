<template>
  <div class="manage">
    <div class="tips">
      <div>{{data.tip}}</div>
      <slot name="opts"></slot>
    </div>
    <div class="imgs">
      <div class="opt" v-for="(item,key) in data.imgs" :key="key">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <slot name="header" :item="item"></slot>
          </div>
          <img :src="item.image" class="image" />
          <div class="keyWord">{{item.keyword}}</div>
          <div
            class="detail"
          >总点击量:{{item.totalViewNumber}} 当前广告点击量:{{item.viewNumber}}</div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
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
.imgs {
  display: flex;
}
.imgs img {
  height: 140px;
}
.opt {
  flex: 0.5;
  padding: 4px;
}
.tips {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #828080;
  margin: 0 8px 8px;
}
.keyWord {
  text-align: left;
  font-weight: bold;
  padding: 8px
}
.detail {
  font-size: 13px;
  text-align: left;
  color: #7b7a7a;
  padding:0 8px 8px;
}
</style>
