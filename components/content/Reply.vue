<template>
  <div class="replys">
    <div  class="reply" v-for="(item, key) in data" :key="key" :ref="item.postCommentId">
      <div class="con" >
        <div class="avatar">
          <el-avatar
            shape="square"
            size="medium"
            :src="item.commentatorIcon"
          ></el-avatar>
        </div>
        <div class="replyContent">
          <div class="name">{{ item.commentatorName }}</div>
          <div class="details" v-html="item.content" @click="showImg($event)"></div>
        </div>
      </div>
      <div class="opts">
        <div>
          <slot name="options" :data="item"></slot>
        </div>
        <div>
          <slot name="editanddelete" :data="item"></slot>
          <span class="time">{{ item.createDate }}</span>
        </div>
      </div>
      <template v-if="item.commentList">
        <sub-reply :ref="'subReply_'+item.postCommentId"  :data="item.commentList">
          <template slot-scope="scope" slot="subReply">
            <slot name="subReply" :data="scope.data" :parent="item"></slot>
          </template>
        </sub-reply>
      </template>
    </div>
    <slot name="loadmore"></slot>
     <div
      class="imgDolg"
      v-show="imgPreview.show"
      @click.stop="imgPreview.show = false"
    >
      <i
        class="el-icon-close"
        id="imgDolgClose"
        @click.stop="imgPreview.show = false"
      ></i>
      <img @click.stop="imgPreview.show = true" :src="imgPreview.img" />
    </div>
  </div>
</template>
<script>
import subReply from "@/components/content/SubReply.vue";
export default {
  data() {
    return {
       imgPreview:{
        img:"",
        show:false
      }
    };
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    subReply,
  },
  watch: {
    data(val) {
      this.data = val;
      this.initContent();
    },
  },
  created() {
    this.initContent();
  },
  methods: {
    initContent() {
      if (this.data) {
        for (let item of this.data) {
          item.content = this.HTMLDecode(item.content);
        }
      }
    },
    HTMLDecode(text) {
      if (process.client) {
      var temp = document.createElement("div");
      temp.innerHTML = text;
      var output = temp.innerText || temp.textContent;
      temp = null;
      return output;
      }
    },
     showImg(e) {
      // console.log(e.target)
      if (e.target.tagName == 'IMG') {
        this.imgPreview.img = e.target.src
        this.imgPreview.show = true
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
.replys {
  text-align: left;
  background: white;
  border-radius: 5px;
  font-size: 14px;
      border-bottom: 1px solid #e6e6e6;
}
.reply {
  padding: 20px;
}
.reply+.reply {
  border-top: 1px solid #eee;
}
.con {
  display: flex;
}
.avatar {
  padding-right: 16px;
}
.replyContent {
  flex: 1;
  line-height: 1.6;
}
.name{
  color: #155faa;
  font-size: 14px;
}
.details {
  color: #666;
  word-break: break-all;
}
.opts {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 52px;
  padding: 10px 0;
}
.opts .el-button {
  margin-right: 16px;
}
.subReply {
  margin-left: 54px;
  margin-top: 4px;
}
.subOpts {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 4px;
}
.subOpts .el-button {
  margin-right: 16px;
}
.noComment {
  text-align: center;
  padding: 16px;
}
p {
  margin: 0px;
}
.time {
  font-size: 12px;
  color: #999;
}
.more {
  text-align: right;
  font-size: 10px;
}
.imgDolg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 9999;
  background-color: rgba(140, 134, 134, 0.6);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.imgDolg  #imgDolgClose {
    position: fixed;
    top: 35px;
    cursor: pointer;
    right: 7%;
    font-size: 50px;
    color: white;
  }
.imgDolg  img{
     height: 80%;
  }
</style>
