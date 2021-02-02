<template>
  <div class="msgs">
    <div class="msg" v-for="(sub, key) in data" :key="key">
      <div class="date" v-if="sub.messageList.length > 0">
        {{ sub.messageDate }}
      </div>
      <div class="con" v-for="(item, subKey) in sub.messageList" :key="subKey">
        {{ item.type }}
        <template v-if="item.messageTypeCode == 'comment'">
          <div class="details">
            <el-badge :is-dot="item.state == 0">
              <div class="type">消息回复</div>
            </el-badge>
            <div class="infoMain">
              <span class="name"> {{ item.commentUser }}</span>
              回复了
              <span class="articleTitle">
                <a @click="readMessage(item)">{{ item.title }}</a>
              </span>
            </div>
          </div>
          <span class="time">{{ item.createDate }}</span>
          <slot :item="item"></slot>
        </template>

        <template v-if="item.messageTypeCode == 'report'">
          <div class="details">
            <el-badge :is-dot="item.state == 0">
              <div class="type">举报通知</div>
            </el-badge>
            <div class="infoMain">
              您发表的
              <span class="articleTitle">
               <a @click="readMessage(item)">{{ item.title }}</a></span
              >
              被举报
              <span class="reportContent">举报内容：{{ item.message }}</span>
            </div>
          </div>
          <span class="time">{{ item.createDate }}</span>
        </template>

        <template v-if="item.messageTypeCode == 'violation'">
          <div class="details">
            <el-badge :is-dot="item.state == 0">
              <div class="type">违规处理</div>
            </el-badge>
            <div class="infoMain">
              您发表的
              <span class="articleTitle">
                <a @click="readMessage(item)">{{ item.title }}</a></span
              >
            </div>
          </div>
          <span class="time">{{ item.createDate }}</span>
          <slot :item="item"></slot>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { selectOneMessage } from "network/mine.js";
import { mapGetters, mapMutations } from "vuex";
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
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    readMessage(item) {
      let data = {
        messageId: item.messageId,
      };
      selectOneMessage(data).then((r) => {
            this.$store
          .dispatch("getInfo")
          .then(() => {
             this.$router.push({ path: "/details", query: { postId: item.postId } });
          })
          .catch((err) => {
            console.log(err)
          });
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.title {
  height: 45px;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}
.msg {
  font-size: 16px;
  text-align: left;
}
.date {
  font-weight: bold;
}
.con {
  display: flex;
  font-size: 14px;
  margin: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  padding: 12px 0;
  align-items: center;
  justify-content: space-between;
}
.infoMain {
  margin-left: 12px;
}
.type {
  background: #409eff;
  padding: 4px 8px;
  color: white;
  border-radius: 20px;
  width: 56px;
}
.reportContent {
  color: #f56c6c;
}
.details {
  display: flex;
  flex: 1;
  align-items: center;
}
.name {
  color: #666;
  padding-right: 4px;
}
.time {
  margin-left: 20px;
  color: #999;
}
.articleTitle {
  font-weight: bold;
  color: #215686;
  padding: 0 4px;
}
.bold {
  font-weight: bold;
}
.el-button {
  padding: 0;
}
</style>
