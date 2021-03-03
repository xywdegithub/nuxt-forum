<template>
  <div class="post">
    <el-row class="content-wrap" v-loading="loading">
      <el-col :span="18" :xs="24" class="posts">
        <div class="details">
          <v-post :data="article">
            <template
              slot="edit"
              v-if="(getUserId && getUserId == article.userId) || getIsAdmin"
            >
              <a @click="toPost">
                <i class="iconfont iconbianji edit hidden-xs-only">&nbsp;</i>
                <i class="iconfont iconbianji mobile_edit hidden-sm-and-up"
                  >&nbsp;</i
                >
              </a>
              <span class="split hidden-xs-only">/</span>
              <span class="mobile_split hidden-sm-and-up">/</span>
              <a @click="deletePost">
                <i class="iconfont icondustbin_icon delete hidden-xs-only"
                  >&nbsp;</i
                >
                <i
                  class="iconfont icondustbin_icon mobile_delete hidden-sm-and-up"
                  >&nbsp;</i
                >
              </a>
            </template>
            <template slot="good">
              <el-button
                :class="{ active: article.isLike == true }"
                @click="likeOpt"
                size="mini"
                icon="iconfont iconziyuan"
              >
                &nbsp;&nbsp;&nbsp;&nbsp;<b>{{
                  article.likeNumber
                }}</b></el-button
              >
              <el-button
                size="mini"
                type="danger"
                icon="iconfont iconjubao"
                @click="report.visible = true"
                >举报</el-button
              >
            </template>
          </v-post>
          <div class="comment">
            <div class="comment-left">
              <span class="replyCount">{{ article.commentNumber }}个评论</span>
              <a @click="beforeComent(0, 0, null, null, false)"> 我要评论 </a>
            </div>
            <el-button
              v-if="replys.length > 0"
              size="mini"
              :class="{ active: sort == true }"
              icon="iconfont iconpaixu1"
              @click="moreLikeChange"
              >按赞排序</el-button
            >
          </div>
          <v-reply :data="replys" ref="reply">
            <template v-slot:options="data" v-if="getUserId">
              <a
                v-if="data.data.isLike == true"
                class="options commentisLike"
                @click="likePostComment(data.data)"
              >
                <i class="iconfont iconshang"></i>
                已赞同 <span>{{ data.data.likeNumber }}</span></a
              >
              <a class="options" v-else @click="likePostComment(data.data)">
                <i class="iconfont iconshang"></i>
                赞同 <span>{{ data.data.likeNumber }}</span></a
              >
              <a
                v-if="data.data.isDisLike == true"
                class="options commentisLike space"
                @click="dislikePostComment(data.data)"
              >
                <i class="iconfont iconxia1"></i
              ></a>
              <a
                v-else
                class="options space"
                @click="dislikePostComment(data.data)"
              >
                <i class="iconfont iconxia1"></i
              ></a>

              <a
                class="options comment-my"
                @click="
                  beforeComent(
                    data.data.commentatorId,
                    data.data.postCommentId,
                    data.data,
                    null,
                    false
                  )
                "
              >
                <i class="iconfont iconpinglun"></i
                ><span class="hidden-xs-only">评论</span>
              </a>
            </template>
            <template v-slot:editanddelete="scope">
               <span
                v-if="
                  (getUserId && getUserId == scope.data.commentatorId) ||
                  getIsAdmin==true
                "
              >
                <a
                  class="optionsMore"
                  @click="
                    beforeComent(
                      scope.data.commentatorId,
                      scope.data.postCommentId,
                      scope.data,
                      null,
                      true
                    )
                  "
                >
                  <i class="iconfont iconbianji1"></i>
                  <span class="hidden-xs-only">编辑</span></a
                >
                <a
                  class="optionsMore danger"
                  @click="deleteComment(scope.data)"
                >
                  <i class="iconfont iconshanchu"></i>
                  <span class="hidden-xs-only">删除</span></a
                >
              </span>
            </template>
            <template slot-scope="scope" slot="subReplyEdit">
              <span
                v-if="
                  (getUserId && getUserId == scope.data.commentatorId) ||
                  getIsAdmin==true
                "
              >
                <a
                  class="optionsMore"
                  @click="
                    beforeComent(
                      scope.data.commentatorId,
                      scope.parent.postCommentId,
                      scope.parent,
                      scope.data,
                      true
                    )
                  "
                >
                  <i class="iconfont iconbianji1"></i>
                  <span class="hidden-xs-only">编辑</span></a
                >
                <a
                  class="optionsMore danger"
                  @click="deleteComment(scope.data)"
                >
                  <i class="iconfont iconshanchu"></i>
                  <span class="hidden-xs-only">删除</span></a
                >
              </span>
            </template>
            <template slot-scope="scope" slot="subReply">
              <a
                v-if="scope.data.isLike == true"
                class="options commentisLike"
                @click="likePostComment(scope.data)"
              >
                <i class="iconfont iconshang"></i>
                <span class="hidden-xs-only">已赞同</span>
                <span>{{ scope.data.likeNumber }}</span></a
              >
              <a class="options" v-else @click="likePostComment(scope.data)">
                <i class="iconfont iconshang"></i>
                <span class="hidden-xs-only">赞同</span>
                <span>{{ scope.data.likeNumber }}</span></a
              >
              <a
                v-if="scope.data.isDisLike == true"
                class="options commentisLike space"
                @click="dislikePostComment(scope.data)"
              >
                <i class="iconfont iconxia1"></i
              ></a>
              <a
                v-else
                class="options space"
                @click="dislikePostComment(scope.data)"
              >
                <i class="iconfont iconxia1"></i
              ></a>

              <a
                class="options comment-my"
                @click="
                  beforeComent(
                    scope.data.commentatorId,
                    scope.parent.postCommentId,
                    scope.parent,
                    scope.data,
                    false
                  )
                "
              >
                <i class="iconfont iconpinglun"></i>
                <span class="hidden-xs-only">评论</span></a
              >
            </template>
            <template slot="loadmore">
              <div v-show="replys.length != 0">
                <div
                  class="loadTip"
                  v-if="commentPage.total > replys.length"
                  v-loading="commentLoading"
                  @click="loadMore"
                >
                  加载更多
                </div>
                <div class="loadTip" v-else>没有更多了</div>
              </div>
            </template>
          </v-reply>
          <div id="edit">
            <v-editor
              v-if="getUserId"
              id="editor"
              class="editor"
              ref="editor"
              :data="this.content"
              @change="changeEditor"
            >
              <div class="submit">
                <el-button
                  type="primary"
                  @click="replyComment"
                  :disabled="submitDisable"
                  >提交</el-button
                >
              </div>
            </v-editor>
            <div class="lineOff" v-else>
              要回复问题请先
              <router-link :to="{ name: 'login' }"> 登录</router-link>

              或
              <router-link :to="{ name: 'register' }"> 注册</router-link>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="hidden-xs-only">
        <div class="info">
          <div class="adminAbout infoShow">
            <v-admin :data="admin" v-if="admin">
              <div class="require bold">
                <div class="requireItem">
                  <div>回答</div>
                  <div class="mineCount">{{ admin.answerNumber }}</div>
                </div>
                <div class="requireItem">
                  <div>文章</div>
                  <div class="mineCount">{{ admin.postNumber }}</div>
                </div>
                <div class="requireItem">
                  <div>获赞</div>
                  <div class="mineCount">{{ admin.agreeNumber }}</div>
                </div>
              </div>
            </v-admin>
          </div>
          <div class="select">
            <el-button type="primary" @click="selectChange">{{
              article.isCollect ? "取消收藏" : "收藏"
            }}</el-button>
          </div>
          <div class="recommendPosts" v-if="recommendPosts">
            <recommend-posts :data="recommendPosts"></recommend-posts>
          </div>
          <div v-if="advs">
            <div class="adv" v-for="item in advs" :key="item.advertisementId">
              <a @click="advertiseClick(item)">
                <img :src="item.image" />
              </a>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-if="advs" class="hidden-sm-and-up mobile_adv">
      <div class="adv" v-for="item in advs" :key="item.advertisementId">
        <a v-if="item.image" @click="advertiseClick(item)">
          <img :src="item.image" />
        </a>
      </div>
    </div>
    <el-dialog title="举报" :visible.sync="report.visible" :width="dialogWidth">
      <el-form ref="form" :model="report.form" label-width="80px">
        <el-form-item label="举报类型">
          <el-checkbox-group v-model="report.form.postReportTypeId" :max="1">
            <el-checkbox
              v-for="item in reportType"
              :label="item.postReportTypeId"
              name="postReportTypeId"
              :key="item.postReportTypeId"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="举报内容">
          <el-input type="textarea" v-model="report.form.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reportAdd">举报</el-button>
          <el-button @click="report.visible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import vEditor from "@/components/common/Editor.vue";
import vAdmin from "@/components/content/Admin.vue";
import vPost from "@/components/content/Post.vue";
import vReply from "@/components/content/Reply.vue";
import recommendPosts from "@/components/content/RecommendPosts.vue";
import {
  findPost,
  selectPostComment,
  faviorPost,
  cancelfaviorPost,
  likePost,
  dislikePost,
  selectPostReportTypeList,
  replyComment,
  reportAdd,
  selectAdvertisementList,
  selectRecommendPosts,
  likePostComment,
  dislikePostComment,
  findOne,
  deleteByPost,
  updateComment,
  deleteComment,
} from "@/network/index.js";
export default {
  name: "index-details",
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content:
            this.article.parentCategoryName + " " + this.article.categoryName,
        },
        {
          hid: "description",
          name: "description",
          content: this.article.content,
        },
      ],
    };
  },
  async fetch() {
    let data = {
      postId: this.postId,
      pageNum: this.commentPage.currentPage,
      pageSize: this.commentPage.pageSize,
    };
    if (this.sort) {
      data.sortField = "likeNumber";
      data.sortOrder = "descend";
    }
    let comment = await selectPostComment(data);
    this.replys = this.replys.concat(comment.data.rows);
    this.commentPage.total = comment.data.total;
  },
  async asyncData({ query }) {

    let postData = {
      postId: query.postId,
    };

    const { data } = await findPost(postData);
    //  const[siteConfig,list] =await Promise.all([
    //  findPost(postData), selectPosts(listData)
    // ])
    let admin = null;
    if (data.userName) {
      admin = {
        avatar: data.userIcon,
        userName: data.userName,
        introduction: data.introduction,
        answerNumber: data.answerNumber,
        agreeNumber: data.agreeNumber,
        postNumber: data.postNumber,
      };
    }
    return {
      title: data.title,
      article: data,
      admin,
      postId: query.postId,
    };
  },
  watch: {
    $route(to, from) {
      this.postId = this.$route.query.postId;
      this.dealArticle();
     // this.selectPostComment();
      this.selectPostReportTypeList();
    },
  },
  data() {
    return {
      loading: false,
      postId: null,
      sort: false,
      content: null,
      commentUserId: 0,
      parentCommentId: 0,
      reportType: [],
      report: {
        visible: false,
        form: {
          postReportTypeId: [],
          content: null,
        },
      },
      admin: null,
      replys: [],
      article: {},
      advs: [],
      commentPage: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
      },
      commentLoading: false,
      recommendPosts: [],
      currentReply: null,
      subData: null,
      dialogWidth: "50%",
      submitDisable: false,
      isEdit: false,
    };
  },
  watchQuery: ["postId"],
  components: {
    vAdmin,
    vPost,
    vReply,
    recommendPosts,
    vEditor,
  },
  computed: {
    ...mapGetters(["getUserId", "getToken", "getIsAdmin"]),
  },
  created() {
    this.postId = this.$route.query.postId;
    this.dealArticle();
    //this.selectPostComment();
    this.selectPostReportTypeList();
    if (process.client) {
      if (window.innerWidth < 768) {
        this.dialogWidth = "80%";
      } else {
        this.dialogWidth = "50%";
      }
    }
  },
  updated() {
    if (this.$route.query.anchor) {
      this.anchor();
    }
  },
  methods: {
    dealArticle() {
      this.selectRecommendPosts();
      this.selectAdvertisementList();
    },
    selectPostComment() {
      this.commentLoading = true;
      let data = {
        postId: this.postId,
        pageNum: this.commentPage.currentPage,
        pageSize: this.commentPage.pageSize,
      };
      if (this.sort) {
        data.sortField = "likeNumber";
        data.sortOrder = "descend";
      }
      selectPostComment(data).then((r) => {
        let res = r.data;
        this.commentLoading = false;
        if (res && res.rows) {
          this.replys = this.replys.concat(res.rows);
          this.commentPage.total = res.total;
        } else {
          this.replys = [];
        }
      });
    },
    selectRecommendPosts() {
      let data = {
        postSubcategoryId: this.article.postSubcategoryId,
        parentCategoryId: this.article.parentCategoryId,
      };
      this.recommendPosts = [];
      selectRecommendPosts(data).then((r) => {
        let res = r.data;
        if (res) {
          this.recommendPosts = res;
        }
      });
    },
    selectChange() {
      if (!this.getToken) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      if (this.article.isCollect) {
        this.cancelfaviorPost();
      } else {
        this.faviorPost();
      }
    },
    deleteComment(item) {
      this.$confirm("确定删除该评论?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var data = {
            postCommentId: item.postCommentId,
          };
          deleteComment(data).then((res) => {
            if (res.data) {
              this.article.commentNumber = res.data.commentNumber;
            }
            if (this.replys.length > 0) {
              for (let i in this.replys) {
                if (this.replys[i].postCommentId == item.postCommentId) {
                  this.replys.splice(i, 1);
                  break;
                }
                if (
                  this.replys[i].commentList &&
                  this.replys[i].commentList.length > 0
                ) {
                  for (let j in this.replys[i].commentList) {
                    if (
                      this.replys[i].commentList[j].postCommentId ==
                      item.postCommentId
                    ) {
                      this.replys[i].commentList.splice(j, 1);
                    }
                  }
                }
              }
            }
            this.$message({
              type: "success",
              message: "删除成功",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    updateComment() {
      if (!this.getToken) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      if (!this.content || !this.delHTML(this.content)) {
        this.$message({
          message: "请输入内容",
          type: "warning",
        });
        return;
      }
      this.submitDisable = true;
      let data = {
        content: this.htmlEncode(this.content),
        postCommentId: this.subData
          ? this.subData.postCommentId
          : this.currentReply.postCommentId,
      };
      updateComment(data).then((res) => {
        this.$message({
          message: "编辑评论成功！",
          type: "success",
        });
        this.content = "";
        this.submitDisable = false;
        this.$refs.editor.editor.txt.clear();
        if (this.subData) {
          this.$refs.reply.$refs[
            "subReply_" + this.currentReply.postCommentId
          ][0].$refs[this.subData.postCommentId][0].scrollIntoView(false);
        } else if (this.currentReply) {
          this.$refs.reply.$refs[
            this.currentReply.postCommentId
          ][0].scrollIntoView(false);
        }
        if (res && res.data) {
          if (this.subData) {
            this.subData.content = this.htmlEncode(res.data.content);
          } else if (this.currentReply) {
            this.currentReply.content = this.htmlEncode(res.data.content);
          }
          // if (this.parentCommentId == 0) {
          //   if (this.replys.length >= this.commentPage.total) {
          //     this.replys.push(res.data);
          //   }
          // } else {
          //   this.currentReply.commentList.push(res.data);
          // }
        }
      });
    },
    faviorPost() {
      let data = {
        postId: this.postId,
      };
      faviorPost(data).then((res) => {
        this.$message({
          message: "收藏成功",
          type: "success",
        });
        this.article.isCollect = true;
      });
    },
    cancelfaviorPost() {
      let data = {
        postId: this.postId,
      };
      cancelfaviorPost(data).then((res) => {
        this.$message({
          message: "取消收藏成功",
          type: "success",
        });
        this.article.isCollect = false;
      });
    },
    delHTML(str) {
      str = str.trim();
      var dd = str.replace(/<\/?.+?>/g, "");
      var result = dd.replace(/ /g, "");
      return result;
    },
    replyComment() {
      if (!this.getToken) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      if (!this.content || !this.delHTML(this.content)) {
        this.$message({
          message: "请输入内容",
          type: "warning",
        });
        return;
      }
      if (this.isEdit) {
        this.updateComment();
        return;
      }
      this.submitDisable = true;
      let data = {
        postId: this.postId,
        commentUserId: this.commentUserId,
        commentatorId: this.getUserId,
        content: this.htmlEncode(this.content),
        parentCommentId: this.parentCommentId,
      };
      replyComment(data).then((res) => {
        this.$message({
          message: "发表评论成功！",
          type: "success",
        });
        this.content = "";
        this.submitDisable = false;
        this.$refs.editor.editor.txt.clear();
        if (this.subData) {
          this.$refs.reply.$refs[
            "subReply_" + this.currentReply.postCommentId
          ][0].$refs[this.subData.postCommentId][0].scrollIntoView(false);
        } else if (this.currentReply) {
          this.$refs.reply.$refs[
            this.currentReply.postCommentId
          ][0].scrollIntoView(false);
        }
        if (res && res.data) {
          if (res.data) {
            this.article.commentNumber = res.data.commentNumber;
          }
          if (this.parentCommentId == 0) {
            if (this.replys.length >= this.commentPage.total) {
              this.replys.push(res.data);
            }
          } else {
            if (this.currentReply.commentList) {
              this.currentReply.commentList.push(res.data);
            } else {
              this.currentReply.commentList = [res.data];
            }
          }
        }
      });
    },
    htmlEncode(text) {
      // let temp = document.createElement("div");
      // temp.textContent != undefined
      //   ? (temp.textContent = html)
      //   : (temp.innerText = html);
      // var output = temp.innerHTML;
      // temp = null;
      // return output;
      if (process.client) {
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
      }
    },
    likeOpt() {
      if (!this.getToken) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      this.likePostOpt();
    },
    likePostOpt() {
      let data = {
        postId: this.postId,
      };
      likePost(data).then((r) => {
        if (r && r.data) {
          this.article.likeNumber = r.data.likeNumber;
          this.article.isLike = r.data.isLike;
          this.admin.agreeNumber = r.data.agreeNumber;
        }
      });
    },
    selectPostReportTypeList() {
      selectPostReportTypeList().then((r) => {
        let res = r.data;
        if (res) {
          this.reportType = res;
        }
      });
    },
    reportAdd() {
      if (!this.getToken) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      let data = {
        postReportTypeId: this.report.form.postReportTypeId[0],
        content: this.report.form.content,
        postId: this.postId,
      };
      reportAdd(data).then((res) => {
        this.$message({
          message: "举报成功",
          type: "success",
        });
        this.report.visible = false;
        this.report.form.content = "";
        this.report.form.postReportTypeId = "";
      });
    },
    submitReply() {},
    changeEditor(data) {
      this.content = data;
    },
    moreLikeChange() {
      this.sort = !this.sort;
      this.replys = [];
      this.commentPage.currentPage = 1;
      this.$fetch()
    //  this.selectPostComment();
    },
    selectAdvertisementList() {
      let data = {
        userId: this.article.userId,
        type: 1,
      };
      selectAdvertisementList(data).then((r) => {
        let res = r.data;
        if (res) {
          this.advs = res;
        }
      });
    },
    anchor() {
      document.getElementById("edit").scrollIntoView(false);
    },
    loadMore() {
      this.commentPage.currentPage += 1;
       this.$fetch()
      //this.selectPostComment();
    },
    likePostComment(item) {
      if (!this.getToken) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      let data = {
        postCommentId: item.postCommentId,
      };
      likePostComment(data).then((r) => {
        if (r && r.data) {
          item.likeNumber = r.data.likeNumber;
          item.isLike = r.data.isLike;
          item.isDisLike = r.data.isDisLike;
          item.dislikeNumber = r.data.dislikeNumber;
        }
        if (item.isLike) {
          this.$message({
            message: "评论点赞成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "评论点赞已取消",
            type: "success",
          });
        }
      });
    },
    dislikePostComment(item) {
      if (!this.getToken) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      let data = {
        postCommentId: item.postCommentId,
      };
      dislikePostComment(data).then((r) => {
        if (r && r.data) {
          item.likeNumber = r.data.likeNumber;
          item.isLike = r.data.isLike;
          item.isDisLike = r.data.isDisLike;
          item.dislikeNumber = r.data.dislikeNumber;
        }
        if (item.isDisLike) {
          this.$message({
            message: "评论踩一踩成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "评论踩一踩已取消",
            type: "success",
          });
        }

        //this.selectPostComment();
      });
    },
    deletePost() {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var data = {
            postId: this.article.postId,
          };
          deleteByPost(data).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.$router.push("/index");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    beforeComent(userId, parentCommentId, currentData, subData, isEdit) {
      this.isEdit = isEdit;
      this.anchor();
      this.parentCommentId = parentCommentId;
      this.commentUserId = userId;
      this.currentReply = currentData;
      this.subData = subData;
      if (userId != 0) {
        if (subData) {
          if (isEdit) {
            this.$refs.editor.editor.txt.html(this.htmlEncode(subData.content));
          } else {
            this.$refs.editor.editor.txt.html(
              "<span>@" + subData.commentatorName + ":<span>"
            );
          }
        } else {
          if (isEdit) {
            this.$refs.editor.editor.txt.html(
              this.htmlEncode(currentData.content)
            );
          } else {
            this.$refs.editor.editor.txt.html(
              "<span>@" + currentData.commentatorName + ":<span>"
            );
          }
        }
      } else {
        if (isEdit) {
          this.$refs.editor.editor.txt.html(
            this.htmlEncode(currentData.content)
          );
        } else {
          this.$refs.editor.editor.txt.html("<span><span>");
        }
      }
    },
    advertiseClick(item) {
      let data = {
        advertisementId: item.advertisementId,
      };
      findOne(data).then((r) => {
        if (item.url && item.url.indexOf("http") < 0) {
          item.url = "http://" + item.url;
        }
        if (process.client) {
          window.location.href = item.url;
        }
      });
    },
    toPost() {
      this.$router.push({
        name: "index-post",
        query: { postId: this.article.postId },
      });
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
.require {
  display: flex;
  padding-top: 10px;
}
.requireItem {
  flex: 1;
}
.mineCount {
  padding-top: 8px;
}
.select {
  margin: 16px 0;
}
.select .el-button {
  width: 100%;
}
.right {
  text-align: right;
  padding: 8px 16px;
}
.editor {
  margin-top: 16px;
}
.submit {
  margin-top: 16px;
  text-align: right;
  margin-bottom: 16px;
}
.submit .el-button {
  width: 100px;
}
.classes {
  display: flex;
  width: 100%;
  padding: 16px 124px;
  background: white;
  align-items: center;
  box-sizing: border-box;
  font-size: 14px;
}
.class {
  display: flex;
  padding: 10px;
  font-size: 14px;
  line-height: 150%;
  text-align: left;
}
.class:not(:last-child) {
  border-bottom: 1px solid #e2e2e2;
}

.big_class {
  align-self: center;
  font-size: 14px;
  color: #ccc;
  padding: 0 4px;
  border-radius: 2px;
}
.small_group {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
.small_class {
  color: #778087;
  margin-left: 16px;
  padding: 0 4px;
  cursor: pointer;
}
.postContent {
  font-size: 20px;
  font-weight: bold;
}
.active {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.adminAbout,
.recommendPosts {
  background: #ffffff;
  margin-bottom: 8px;
  text-align: center;
  border-bottom: 1px solid #e2e2e2;
}
.applyM {
  padding: 16px;
}
.currentClass {
  font-weight: bold;
  margin-bottom: 16px;
  font-size: 18px;
}
.subTitleActive {
  color: white;
  background: #242f42;
}
.reply .el-button--mini {
  padding: 4px 15px;
}
.loadTip {
  text-align: center;
  padding: 16px;
  color: #666;
}
.adv {
  overflow: hidden;
}
.adv img {
  width: 250px;
}
.dislike_a {
  margin-left: 8px;
}
.options {
  padding: 6px 4px;
  border-radius: 3px;
  font-size: 12px;
  color: #409eff;
  background: rgb(217, 237, 255);
}
.optionsMore {
  padding: 6px 4px;
  border-radius: 3px;
  font-size: 12px;
  color: #409eff;
}
.danger {
  color: #f56c6c;
}
.options i {
  font-size: 12px;
}
.space {
  margin-left: 2px;
  margin-right: 12px;
}
.commentisLike {
  color: white;
  background: #409eff;
}
.comment {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #e6e6e6;
}
.comment a {
  margin-left: 30px;
  background-color: #eee;
  border-radius: 4px;
  color: #999;
  width: 80px;
  display: inline-block;
  text-align: center;
  font-size: 16px;
  line-height: 30px;
}
.comment-my {
  color: #409eff;
  background: white;
  cursor: pointer;
}
.replyCount {
  height: 60px;
  line-height: 60px;
  margin: 0;
  font-size: 20px;
  color: #333;
}
.edit {
  font-size: 24px;
  color: #666;
  font-weight: normal;
}
.mobile_edit {
  font-size: 14px;
  color: #666;
  font-weight: normal;
}
.split {
  margin: 0 8px;
  font-size: 24px;
  line-height: 24px;
  font-weight: normal;
}
.mobile_split {
  margin: 0 8px;
  font-size: 16px;
  line-height: 16px;
  font-weight: normal;
}
.delete {
  font-size: 26px;
  color: #f56c6c;
  font-weight: normal;
}
.mobile_delete {
  font-size: 16px;
  color: #f56c6c;
  font-weight: normal;
}
#edit {
  padding: 16px;
}
.lineOff {
  line-height: 160%;
  color: #666;
}
.mobile_adv {
  margin-top: 8px;
}
</style>
