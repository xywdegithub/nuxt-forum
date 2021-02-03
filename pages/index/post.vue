<template>
  <div class="post">
    <el-row class="content-wrap" v-loading="loading">
      <el-col :span="18" :xs="24" class="posts">
        <div class="con">
          <div class="head">
            <div class="faqi">
              <i class="iconfont iconfabu iconSize">&nbsp;</i>发起
            </div>
            <div>
              <a
                class="articleType"
                :class="{ active: form.releaseType == 'QUESTION' }"
                @click="form.releaseType = 'QUESTION'"
                >问题</a
              >
              <a
                class="articleType"
                :class="{ active: form.releaseType == 'ARTICLE' }"
                @click="form.releaseType = 'ARTICLE'"
                >文章</a
              >
            </div>
          </div>
          <div class="postContent">
            <el-form ref="form" :model="form" label-width="48px">
              <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="类别">
                <el-cascader
                  v-model="form.postSubcategoryId"
                  :options="classes"
                  :props="{
                    label: 'title',
                    value: 'id',
                    emitPath: false,
                  }"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="内容">
                <v-editor
                  id="editor"
                  class="editor"
                  :value="form.content"
                  @change="changeEditor"
                ></v-editor>
              </el-form-item>
              <div class="submit">
                <el-button
                  type="primary"
                  @click="onSubmit"
                  :disabled="submitDisable"
                  >提交</el-button
                >
              </div>
            </el-form>
          </div>
        </div></el-col
      >
      <el-col :span="6" class="hidden-xs-only">
        <div class="info">
          <div class="infoShow" v-if="form.releaseType == 'QUESTION'">
            <div class="bold">问题发起指南：</div>
            <p class="margin">标题: 请用准确的语言描述您发布的问题思想</p>
            <p class="margin">
              内容: 详细补充您的问题内容,
              并提供一些相关的素材以供参与者更多的了解您所提问的主题思想
            </p>
          </div>
          <div class="infoShow" v-else>
            <div class="bold">文章发起指南：</div>
            <p class="margin">标题: 请用准确的语言描述您发布的文章思想</p>
            <p class="margin">
              内容: 详细补充您的文章内容,
              并提供一些相关的素材以供参与者更多的了解您发布文章的主题思想
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import vEditor from "@/components/common/Editor.vue";
import {
  findCategoryTree,
  releasePost,
  findPost,
  updatePost,
} from "@/network/index.js";
export default {
  data() {
    return {
      loading: false,
      latest: false,
      postId: "",
      classes: [],
      form: {
        title: "",
        content: "",
        postSubcategoryId: "",
        releaseType: "QUESTION",
      },
      submitDisable: false,
    };
  },
  components: {
    vEditor,
  },
  computed: {
    ...mapGetters(["getUserId", "getToken"]),
  },
  created() {
    this.postId = this.$route.query.postId;
    this.findCategoryTree();
  },
  methods: {
    findPost() {
      this.loading = true;
      let data = {
        postId: this.postId,
      };
      findPost(data).then((r) => {
        this.loading = false;
        let res = r.data;
        if (res) {
          if (res.content) res.content = this.HTMLDecode(res.content);
          this.form.content = res.content;
          this.form.title = res.title;
          //this.$set( this.form,'postSubcategoryId',res.postSubcategoryId)
          this.form.postSubcategoryId = res.postSubcategoryId + "";
        }
      });
    },
    HTMLDecode(text) {
      var temp = document.createElement("div");
      temp.innerHTML = text;
      var output = temp.innerText || temp.textContent;
      temp = null;
      return output;
    },
    findCategoryTree() {
      findCategoryTree().then((r) => {
        let res = r.data;
        if (res && res.rows && res.rows.hasChildren) {
          this.classes = res.rows.children;
        }
        if (this.postId) {
          this.findPost();
        }
      });
    },
    creamChange() {
      this.cream = !this.cream;
      this.selectPosts();
    },
    latestChange() {
      this.latest = !this.latest;
      this.selectPosts();
    },
    changeEditor(data) {
      this.form.content = data;
    },
    onSubmit() {
      if (!this.form.title) {
        this.$message({
          type: "error",
          message: "标题不能为空",
        });
        return;
      }
      if (!this.form.content) {
        this.$message({
          type: "error",
          message: "内容不能为空",
        });
        return;
      }
      if (!this.form.postSubcategoryId) {
        this.$message({
          type: "error",
          message: "文章类别不能为空",
        });
        return;
      }
      if (this.postId) {
        this.updatePost();
      } else this.releasePost();
    },
    updatePost() {
      this.submitDisable = true;
      this.form.postId = this.postId;
      this.form.content = this.htmlEncode(this.form.content);
      updatePost(this.form).then((r) => {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.submitDisable = false;
        this.$router.push({
          path: "/details",
          query: { postId: this.postId },
        });
      });
    },
    releasePost() {
      this.submitDisable = true;
      this.form.content = this.htmlEncode(this.form.content);
      releasePost(this.form).then((r) => {
        this.submitDisable = false;
        this.$message({
          type: "success",
          message: "发布成功",
        });
        let res = r.data;
        if (res) {
          this.$router.push({
            path: "/details",
            query: { postId: r.data.postId },
          });
        }
      });
    },
    htmlEncode(html) {
      let temp = document.createElement("div");
      temp.textContent != undefined
        ? (temp.textContent = html)
        : (temp.innerText = html);
      var output = temp.innerHTML;
      temp = null;
      return output;
    },
  },
};
</script>
<style scoped>
.post {
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  box-sizing: border-box;
  flex: 1;
  height: -webkit-fill-available;
}
.content-wrap {
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  flex: 1;
}
.posts {
  border-right: 1px solid #e6e6e6;
  min-height: 100%;
}
.con {
  flex: 1;
  border-right: 1px solid #eee;
}
.editor {
  padding: 0px !important;
}
.iconSize {
  font-size: 24px;
}
.postContent {
  text-align: left;
  padding: 12px 20px;
}
.faqi {
  font-size: 20px;
  font-weight: bold;
}
.head {
  display: flex;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
  align-items: center;
}
.articleType {
  font-weight: bold;
  padding: 0 8px;
  color: #666;
}
.articleType:not(:last-child) {
  border-right: 2px solid #a09898;
}
.active {
  color: #0673d2;
}
.bold {
  font-weight: bold;
}
.margin {
  margin: 8px 0;
}
.submit {
  margin-top: 16px;
  text-align: right;
  margin-bottom: 16px;
}
.submit .el-button {
  width: 100px;
}
</style>
