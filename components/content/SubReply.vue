<template>
  <div class="subDiv" v-if="data.length>0">
    <div class="subReply" v-if="subKey < count"  v-for="(subItem, subKey) in data" :key="subKey">
        <div class="con" :class="{border:subKey!=data.length-1 && subItem}">
          <div class="avatar">
            <el-avatar
              shape="square"
              size="small"
              :src="subItem.commentatorIcon"
            ></el-avatar>
          </div>
          <div class="replyContent">
            <span class="name">{{ subItem.commentatorName }} </span>
            <span>回复</span
            ><span class="name"> {{ subItem.commentUserName }}</span>
            <div class="details" v-html="subItem.content" @click="showImg($event)"></div>
            <div class="subOpts">
              <slot name="subReply" :data="subItem"></slot>
              <span class="time">{{ subItem.createDate }}</span>
            </div>
          </div>
        </div>
    </div>
    <div v-if="data.length > count" class="more" @click="count = 1000">
      显示更多
    </div>

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
export default {
  data() {
    return {
      count: 2,
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
};
</script>
<style scoped>
.subDiv{
    border-top: 1px solid #eee;
    border-radius: 4px;
    margin-top: 6px;
  margin-left: 52px;
}
.replys {
  text-align: left;
  background: white;
  border-radius: 5px;
  font-size: 14px;
}
.subReply{
  padding: 8px 0;
}
.con {
  display: flex;
}
.name{
  color: #155faa;
  font-size: 14px;
}
.details {
  color: #666;
  word-break: break-all;
}
.avatar {
  padding-right: 16px;
}
.replyContent {
  flex: 1;
  line-height: 1.6;
  color: #666;
}
.opts {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.opts .el-button {
  margin-right: 16px;
}
.border{
  border-bottom: 1px solid #eee;
  padding-bottom: 4px;
}
.subOpts {
  display: flex;
  justify-content: space-between;
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
  padding: 4px;
  font-size: 10px;
  color: #666;
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
