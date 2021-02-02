<template>
  <div>
    <div class="article" v-for="(item,key) in data" :key="key">
      <div class="content">
        <div class="head">
          <span class="label">{{item.label}}</span>
          <span class="title">{{item.title}}</span>
          <span v-if="item.type" class="type">[{{item.type}}]</span>
        </div>
        <div class="sub">
          <span>发帖人：{{item.user}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>当前浏览次数：{{item.look}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>最后回复时间：{{item.replyDate}}</span>
        </div>
      </div>
      <div class="reply">
        <div v-if="item.replyCount" class="replyCount">{{item.replyCount}}</div>
        <div >回复</div>
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
.invitation {
  display: flex;
  padding: 8px 0;
  margin: 0 8px;
}
.invitation:not(:last-child) {
  border-bottom: 1px solid rgba(224, 230, 237, 0.5);
}
.content{
    margin: 0 8px;
    text-align: left;
    flex: 1;
}
.label{
    background: #409eff;
    color: white;
    padding: 4px 7px;
    border-radius: 5px;
    font-size: 13px;
}
.head{
    font-weight: bold;
    color: #215686;
    height: 28px;
}
.title{
 margin-left: 8px;
}
.sub{
    font-size: 12px;
    color:#666
}
.reply{
    width: 50px;
    font-size: 13px;
}
.replyCount{
    border-radius: 20px;
    background: rgba(242, 242, 242, 1);
    padding: 4px ;
    margin-bottom: 8px;
}
</style>
