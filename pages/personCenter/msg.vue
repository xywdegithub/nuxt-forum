<template>
  <div class="index">
    <el-row class="content-wrap">
      <div class="contain">
        <v-title :data="title">
          <template slot="icon">
            <i class="iconfont iconziyuan1 icon"></i>
         </template>
          <template slot="middle">
            <el-badge :value="badgeNum" class="item" :hidden="badgeNum == 0">
            </el-badge
          ></template>
        </v-title>
        <div class="center">
          <div class="head">
            <div>最新收到的通知</div>
            <div>
              <el-select
                v-model="type"
                placeholder="请选择"
                @change="changeType"
              >
                <el-option label="全部类别" value></el-option>
                <el-option
                  v-for="item in messageType"
                  :label="item.message"
                  :value="item.code"
                  :key="item.code"
                ></el-option>
              </el-select>
            </div>
          </div>
          <el-scrollbar>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy">
              <my-msgs :data="msgs" v-if="msgs">
                <!-- <template slot-scope="scope">
            <el-button type="text" @click="goComment(scope.item)">点击查看</el-button>
          </template> -->
              </my-msgs>
              <div class="loading" v-if="loading" v-loading="loading"></div>
              <p class="noMore" v-if="busy">没有更多了</p>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import vTitle from "@/components/content/Title.vue";
import MyMsgs from "@/components/content/MyMsg.vue";
import {
  selectMessageTypeList,
  selectMessages,
  selectOneMessage,
} from "@/network/mine.js";

export default {
  data() {
    return {
      title: "通知中心",
      type: "",
      loading: false,
      busy: false,
      messageType: [],
      msgs: [],
      page: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
      badgeNum: this.$store.state.user.unReadMessage,
    };
  },
  components: {
    vTitle,
    MyMsgs,
  },
  computed: {
    noMore() {
      console.log(this.msgs);
      return false;
    },
    disabled() {
      return this.loading || this.noMore;
    },
       ...mapGetters(["getUnReadMsg"]),
  },
  watch: {
    getUnReadMsg(val){
          this.badgeNum=val
    },
  },
  created() {
    this.selectMessageTypeList();
    // this.selectMessages();
  },
  methods: {
    selectMessages() {
      this.loading = true;
      let data = {
        messageTypeCode: this.type,
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
      };
      selectMessages(data).then((r) => {
        let res = r.data;
        this.loading = false;
        if (res && res.rows) {
          this.msgs = this.msgs.concat(res.rows);
          this.page.total = res.total;
        }
        if (this.page.total <= this.msgs.length) {
          this.busy = true;
        } else {
          this.page.pageNum += 1;
          this.busy = false;
        }
      });
    },
    selectMessageTypeList() {
      selectMessageTypeList().then((r) => {
        let res = r.data;
        if (res) this.messageType = res;
      });
    },
    loadMore() {
      this.busy = true;
      this.selectMessages();
    },
    changeType(val) {
      this.type = val;
      this.msgs = [];
      this.page.pageNum = 1;
      this.loadMore();
    },
    selectOneMessage(item) {
      let data = {
        messageId: item.messageId,
      };
      selectOneMessage(data).then((res) => {});
    },
    goComment(item) {
      this.$router.push({ path: "/details", query: { postId: item.postId } });
    },
  },
};
</script>
<style scoped>
.head {
  display: flex;
  align-items: center;
  font-weight: bold;
  justify-content: space-between;
  margin: 8px 0;
  color: #666;
}
.center {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.index {
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  box-sizing: border-box;
  flex: 1;
  height: 100%;
}
.content-wrap {
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  flex: 1;
}
</style>
