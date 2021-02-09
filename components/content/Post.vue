<template>
  <div class="vPost">
    <div class="postTitle bold hidden-xs-only">
      <div class="title">{{data.title}}</div>
      <div class="edit">
      <slot name="edit"></slot>
      </div>
    </div>
    <div class="mobile_postTitle bold hidden-sm-and-up">
      <div class="title">{{data.title}}</div>
      <div class="edit">
      <slot name="edit"></slot>
      </div>
    </div>
    <div class="postContent" v-html=HTMLDecode(data.content) @click="showImg($event)"></div>
    <div class="blank"></div>
    <div class="looks">
      <div><slot name="good"></slot></div>
      <div>{{data.releaseTime}}<span class="viewCount">{{data.viewNumber}}次浏览</span></div>
    </div>
    <slot></slot>
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
  name:'post',
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
      type: Object,
      default() {
        return {};
      },
    },
  },
   watch: {
    data(val) {
      this.data = val;
    },
  },
  methods: {
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
.vPost {
  text-align: left;
  background: white;
  padding: 0 16px 16px;
  border-radius:5px
}
.postTitle {
  padding: 16px 0;
  font-size: 20px;
  border-bottom: 1px solid #eee;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
}
.mobile_postTitle{
  padding: 8px 0;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
}
.postContent {
     padding: 10px 0;
    overflow: hidden;
}
.postContent p{
      padding: 5px;
}
.el-image {
  width: 120px;
}
.el-image:not(:last-child) {
  margin-right: 16px;
}
.looks {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin: 8px 0;
  color: #999;
  align-items: center;

}
.title{
  flex: 1;
}
.opts {
  display: flex;
  align-items: center;
  font-size: 14px;
  justify-content:space-between
}
.leftOpts{
    display: flex;
     align-items: center;
}
.replyCount {
  margin: 0 16px;
  font-weight: bold;
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
  .blank{
    height: 50px;
  }
  .viewCount{
    margin-left: 15px;
  }
  .edit{
     margin-left: 8px;
  }
</style>
