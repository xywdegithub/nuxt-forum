<template>
  <div class="infoShow">
    <div class="title">
					 	{{data.name}} 			</div>
    <div class="webContent">{{data.value}}</div>
    <div class="link" v-if="data.href">
      <a :href="data.href">查看详情</a>
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
      }
    }
  },
  methods: {},
  mounted() {}
};
</script>
<style scoped>
.title {
  font-size: 14px;
    color:#FF7F00;
    padding-bottom: 5px;
    font-weight: bold;
}
.webContent {
  line-height: 20px;
  max-height: 100px;
  overflow: hidden;
  color: #666;
}
.link{
    text-align: right;
    padding: 8px 8px 0 0;
}
.link a{
    text-decoration:underline;
    color: #5d4d4d;
    font-size: 13px;
}
.infoShow{
  border-bottom: 1px solid #e2e2e2;
}
</style>
