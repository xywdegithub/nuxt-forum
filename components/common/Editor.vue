<template>
  <div class="editor">
    <div ref="editor"></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      SINA_PATH1: "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal",
      SINA_PATH2:
        "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal",
      editor: null,
      info: null,
    };
  },
  props: {
    data: String,
    default() {
      return "";
    },
    value: {
      type: String,
      default: "",
    },
  },
  watch: {
    value: function (value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value);
      }
    },
  },
  mounted() {
    if(process.client){
    this.seteditor();
    this.editor.txt.html(this.value);
    }
  },
  methods: {
    seteditor() {
       const E= require('wangeditor')
    console.log(this.$refs.editor)
    console.log(E)
      this.editor = new E(this.$refs.editor);
      this.editor.config.uploadImgShowBase64 = false; // base 64 存储图片
      this.editor.config.uploadImgServer =
        "http://47.111.178.85:9090/site/file/batchUpload"; // 填写配置服务器端地址
      this.editor.config.uploadFileName = "file"; // 后端接受上传文件的参数名
      this.editor.config.uploadImgMaxSize = 8 * 1024 * 1024; // 将图片大小限制为 2M
      this.editor.config.uploadImgMaxLength = 1; // 限制一次最多上传 6 张图片
      this.editor.config.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
      this.editor.config.height = 200;
      this.editor.config.focus = false;
      this.editor.config.placeholder = "请输入内容";

      // 配置菜单
      this.editor.config.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        // "video", // 插入视频
        // "code", // 插入代码
        "undo", // 撤销
        "redo", // 重复
        "fullscreen", // 全屏
      ];
      this.editor.config.emotions = [
        {
          // tab 的标题
          title: "默认",
          // type -> 'emoji' / 'image'
          type: "image",
          // content -> 数组
          content: [
            {
              alt: "[坏笑]",
              src: this.SINA_PATH1 + "/50/pcmoren_huaixiao_org.png",
            },
            {
              alt: "[舔屏]",
              src: this.SINA_PATH1 + "/40/pcmoren_tian_org.png",
            },
            {
              alt: "[污]",
              src: this.SINA_PATH1 + "/3c/pcmoren_wu_org.png",
            },
          ],
        },
        {
          // tab 的标题
          title: "新浪",
          // type -> 'emoji' / 'image'
          type: "image",
          // content -> 数组
          content: [
            {
              src: this.SINA_PATH2 + "/7a/shenshou_thumb.gif",
              alt: "[草泥马]",
            },
            {
              src: this.SINA_PATH2 + "/60/horse2_thumb.gif",
              alt: "[神马]",
            },
            {
              src: this.SINA_PATH2 + "/bc/fuyun_thumb.gif",
              alt: "[浮云]",
            },
          ],
        },
        {
          // tab 的标题
          title: "emoji",
          // type -> 'emoji' / 'image'
          type: "emoji",
          // content -> 数组
          content: "😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐 🙌 👏 👋 👍 👎 👊 ✊ 👌 ✋ 👐 💪 🙏 👆 👇 👈 👉 🖕 🖐 🤘".split(
            /\s/
          ),
        },
      ];
      this.editor.config.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          // 图片上传成功，插入图片的回调
          //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
          // console.log(result.data[0].url)
          //insertImg()为插入图片的函数
          //循环插入图片
          if (result.data) {
            let data = result.data;
            for (let i = 0; i < data.length; i++) {
              insertImg(data[i]);
            }
          }
        },
      };
      this.editor.config.onchange = (html) => {
        this.info = html; // 绑定当前逐渐地值
        this.$emit("change", this.info); // 将内容同步到父组件中
      };
      // 创建富文本编辑器
      this.editor.create();
    },
  },
};
</script>
<style scoped>
.editor {
  width: 100%;
  text-align: left;
  background: white;
  border-radius: 5px;
  position: relative;
  z-index: 0;
  box-sizing: border-box;
}
.toolbar {
  border: 1px solid #ccc;
  flex-wrap: wrap;
}
.text {
  border: 1px solid #ccc;
  height: 200px;
}
</style>
