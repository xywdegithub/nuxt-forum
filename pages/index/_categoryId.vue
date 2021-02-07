<template>
    <div class="index" id="index">{{classes}}
  <keep-alive>
      <classes :data="classes"></classes>
  </keep-alive>
      <el-row class="content-wrap" v-loading="loading">
        <el-col :span="18" :xs="24" class="posts">
          <template v-if="list.length > 0">
            <div
              class="nav hidden-xs-only"
              v-if="subCategoryId || categoryId || title"
            >
              <span v-if="title" class="nav_title">{{ title }}</span>
              <span v-else class="nav_title">{{ currentType }}</span>
              <div class="postDetails" v-if="category">
                <div class="postNum">
                  共有 <span class="number">{{ category.postNumber }}</span
                  >个讨论主题
                </div>
                <!-- <div class="postDesc" >
                {{ category.description }}1111111111
              </div> -->
              </div>
            </div>
            <div class="nav hidden-xs-only" v-else>
              <span class="nav_title">
                <i class="iconfont iconlist"></i>&nbsp;发现</span
              >
            </div>
            <v-invitation class="contain" :data="list">
              <template slot-scope="scope">
                <div
                  v-if="scope.item.commentNumber"
                  class="replyCount hidden-xs-only"
                  @click.stop.prevent="replyData(scope.item)"
                >
                  <a v-if="scope.item.commentNumber > 99">{{ "99+" }}</a>
                  <a v-else>{{ scope.item.commentNumber }}</a>
                </div>
                <div
                  class="hidden-sm-and-up mobile_replyCount"
                  @click.stop.prevent="replyData(scope.item)"
                >
                  <a v-if="scope.item.commentNumber > 99">{{ "99+" }}</a>
                  <a v-else>{{ scope.item.commentNumber }}</a>
                </div>
              </template>
            </v-invitation>
          </template>
          <template v-else>
            <div class="noData">暂无数据</div>
          </template>
        </el-col>
        <el-col :span="6" class="hidden-xs-only">
          <div class="info">
            <div class="adminAbout infoShow" v-if="subCategoryId">
              <template v-if="admin">
                <v-admin :data="admin">
                  <div class="require">
                    <div class="requireItem">
                      <div>发帖</div>
                      <div class="mineCount">{{ admin.postNumber }}</div>
                    </div>
                    <div class="requireItem">
                      <div>被赞</div>
                      <div class="mineCount">{{ admin.agreeNumber }}</div>
                    </div>
                  </div>
                </v-admin>
              </template>
              <template v-else>
                <div class="applyM">
                  <div class="currentClass">{{ currentType }}</div>
                  <el-button type="primary" size="small" @click="moderatorApply"
                    >申请版主</el-button
                  >
                </div>
              </template>
            </div>
            <v-announcement :data="siteIntroduction"></v-announcement>
            <v-announcement :data="announcement"></v-announcement>
            <v-statistics class="statistic" :data="statistics"></v-statistics>
            <div v-if="advs">
              <div class="adv" v-for="item in advs" :key="item.advertisementId">
                <a v-if="item.image" @click="advertiseClick(item)">
                  <img :src="item.image" />
                </a>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-pagination
        class="hidden-xs-only"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <el-pagination
        class="hidden-sm-and-up mobile_pagination"
        small
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, next, jumper"
        :total="total"
      ></el-pagination>
      <div v-if="advs" class="hidden-sm-and-up mobile_adv">
        <div class="adv" v-for="item in advs" :key="item.advertisementId">
          <a v-if="item.image" @click="advertiseClick(item)">
            <img :src="item.image" />
          </a>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import vInvitation from "@/components/content/Invitation.vue";
import classes from "@/components/content/Classes.vue";
import vAnnouncement from "@/components/content/Announcement.vue";
import vStatistics from "@/components/content/Statistics.vue";
import vAdmin from "@/components/content/Admin.vue";
import {
  findCategoryTree,
  selectPosts,
  selectFeaturedPosts,
  selectCollectPosts,
  selectSiteStatic,
  findCategory,
  moderatorInfo,
  moderatorApply,
  findOne,
  selectAdvertisementList,
  // findFeaturedCategory,
} from "@/network/index.js";
import { allSiteConfig } from "@/network/website.js";

export default {
  validate({ params }) {
    if (params.categoryId) {
      return /^\d+$/.test(params.categoryId);
    } else return true;
  },
  head() {
    return {
      title: this.webTitle + " - " + this.siteTitle,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: this.webTitle,
        },
        {
          hid: "description",
          name: "description",
          content: this.siteIntroduction.value,
        },
      ],
    };
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      categoryId: null,
      subCategoryId: null,
      title: "",
      webTitle: "",
      siteTitle: "",
      currentType: "",
      cream: false,
      latest: false,
      siteIntroduction: {},
      propMap: {
        registerCount: "注册人数",
        postCount: "帖子数",
        postCommentCount: "回帖数",
        viewCount: "访问数",
      },
      statistics: {},
      classes: [],
      list: [],
      admin: null,
      category: null,
      advs: [],
      announcement: {},
    };
  },
  components: {
    vAnnouncement,
    vStatistics,
    vInvitation,
    classes,
    vAdmin,
  },
  async asyncData({ params }) {
    const {
      siteAnnotation,
      siteIntroduction,
      topName,
      siteName,
    } = await allSiteConfig();
    return {
      announcement: siteAnnotation,
      siteIntroduction: siteIntroduction,
      webTitle: topName ? topName.value : "",
      siteTitle: siteName ? siteName.value : "",
    };
  },
  computed: {
    ...mapGetters(["getUserId"]),
  },
  watchQuery: ["categoryId", "subCategoryId", "pageSize", "currentPage"],
  watch: {
    $route(to, from) {
      console.log("route");
      this.categoryId = this.$route.params.categoryId;
      this.subCategoryId = this.$route.query.subCategoryId;
      this.title = this.$route.query.title;
      if (this.$route.query.currentPage)
        this.currentPage = this.$route.query.currentPage;
      else this.currentPage = 1;
      this.selectPosts();
      this.getType();
      this.findCategory();
      if (this.subCategoryId) {
        this.moderatorInfo();
      } else {
        this.admin = null;
        this.advs = [];
      }
    },
  },
  created() {
    console.log("index created");
    if (this.$route.params.categoryId) {
      this.categoryId = this.$route.params.categoryId;
    }
    if (this.$route.query.subCategoryId) {
      this.subCategoryId = this.$route.query.subCategoryId;
    }
    this.findCategoryTree();
    this.selectPosts();
    this.selectSiteStatic();
    this.findCategory();
    if (this.subCategoryId) {
      this.moderatorInfo();
    } else {
      this.admin = null;
      this.advs = [];
    }
    // this.findFeaturedCategory();
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  methods: {
    findCategoryTree() {
      findCategoryTree().then((r) => {
        let res = r.data;
        if (res && res.rows && res.rows.hasChildren) {
          this.classes = res.rows.children;
        }
        this.getType();
      });
    },
    selectPosts() {
      this.loading = true;
      let data = {
        title: this.title,
        parentCategoryId: this.categoryId == 0 ? null : this.categoryId,
        subCategoryId: this.subCategoryId,
        isfeatured: this.cream,
        isNew: this.latest,
        userId: this.getUserId,
        pageSize: this.pageSize,
        pageNum: this.currentPage,
      };
      selectPosts(data).then((r) => {
        this.loading = false;
        let res = r.data;
        if (res && res.rows) {
          this.list = res.rows;
          this.total = res.total;
        } else {
          this.list = [];
          this.total = 0;
        }
      });
    },
    findCategory() {
      let data = {
        categoryId: this.subCategoryId ? this.subCategoryId : this.categoryId,
      };
      findCategory(data).then((r) => {
        let res = r.data;
        if (res) {
          this.category = res;
        } else {
          this.category = null;
        }
      });
    },
    moderatorInfo() {
      let data = {
        categoryId: this.subCategoryId,
      };
      moderatorInfo(data).then((r) => {
        let res = r.data;
        if (res) {
          let data = {
            avatar: res.avatar,
            userName: res.userName,
            postNumber: res.postNumber,
            agreeNumber: res.agreeNumber,
            userId: res.userId,
            isModerator: res.isModerator,
          };
          this.admin = data;
          if (this.admin.isModerator) {
            this.selectAdvertisementList();
          }
        } else {
          this.admin = null;
          this.advs = [];
        }
      });
    },
    loadLimit() {
      this.$store
        .dispatch("getInfo")
        .then((res) => {
          if (res.isModerator) {
            this.selectAdvertisements();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectAdvertisementList() {
      let data = {
        userId: this.admin.userId,
        type: 2,
      };
      selectAdvertisementList(data).then((r) => {
        let res = r.data;
        if (res) {
          this.advs = res;
        }
      });
    },
    allSiteConfig() {
      allSiteConfig().then((res) => {
        if (res && res.siteAnnotation) {
          this.announcement = res.siteAnnotation;
        }
        if (res && res.siteIntroduction) {
          this.siteIntroduction = res.siteIntroduction;
        }
        if (res && res.topName) {
          this.webTitle = res.topName.value;
        }
        if (res && res.siteName) {
          this.siteTitle = res.siteName.value;
        }
      });
    },
    // selectSiteAnnotation() {
    //   selectSiteAnnotation().then((r) => {
    //     let res = r.data;
    //     this.announcement = res;
    //   });
    // },
    selectSiteStatic() {
      selectSiteStatic().then((r) => {
        let res = r.data;
        if (res) {
          let data = {};
          for (let key in res) {
            data[this.propMap[key]] = res[key];
          }
          this.statistics = data;
        }
      });
    },
    // findFeaturedCategory() {
    //   findFeaturedCategory().then((r) => {
    //     let res = r.data;
    //     if (res) {
    //       this.featuredList = res;
    //     }
    //   });
    // },
    replyData(item) {
      this.$router.push({
        path: "/details",
        query: { postId: item.postId, anchor: "edit" },
      });
    },
    changeClass(id) {
      this.categoryId = id;
      this.selectPosts();
    },
    creamChange() {
      this.cream = !this.cream;
      this.selectPosts();
    },
    categoryChange(item) {
      if (item.parentId) {
        this.$router.push({
          path: "/subIndex",
          query: { subCategoryId: item.categoryId },
        });
      } else {
        this.categoryId = item.categoryId;
        this.selectPosts();
      }
    },
    latestChange() {
      this.latest = !this.latest;
      this.selectPosts();
    },
    getType() {
      if (this.subCategoryId) {
        for (let item of this.classes) {
          if (item.hasChildren && item.id == this.categoryId) {
            for (let sub of item.children) {
              if (sub.id == this.subCategoryId) {
                this.currentType = sub.title;
              }
            }
          }
        }
      } else if (this.categoryId) {
        for (let item of this.classes) {
          if (item.id == this.categoryId) {
            this.currentType = item.title;
          }
        }
      }
    },
    moderatorApply() {
      if (!this.getToken) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      let data = {
        categoryId: this.subCategoryId,
      };
      moderatorApply(data).then((r) => {
        this.$message({
          type: "success",
          message: "申请成功",
        });
      });
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.selectPosts();
    },
    handleCurrentChange(val) {
      location.href = "#index";
      this.currentPage = val;
      this.selectPosts();
      this.$route.param;
      console.log(this.$route.param);
    },
  },
};
</script>
<style scoped>
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
.nav_title {
  font-size: 20px;
  font-weight: bold;
  line-height: 60px;
}
.nav {
  height: 60px;
  padding-left: 20px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  display: flex;
}
.postDetails {
  font-weight: normal;
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.postNum {
  font-size: 14px;
  color: #333;
}
.number {
  color: #ff7f00;
}
.postDesc {
  font-size: 12px;
  color: #999;
}
.posts {
  border-right: 1px solid #e6e6e6;
  min-height: 100%;
}
.replyCount {
  width: 40px;
  border-radius: 10px;
  background: #ddd;
  color: #fff;
  text-align: center;
}
.replyCount a {
  color: #fff;
}
.mobile_replyCount {
  line-height: 12px;
  font-weight: 700;
  color: #fff;
  background-color: #aab0c6;
  display: inline-block;
  padding: 2px 10px;
  -moz-border-radius: 12px;
  -webkit-border-radius: 12px;
  border-radius: 12px;
  text-decoration: none;
  margin-right: 5px;
}
.mobile_replyCount a {
  color: #fff;
}
.noData {
  color: #888;
  padding: 50px 0;
  text-align: center;
}
.adminAbout {
  border-bottom: 1px solid #e2e2e2;
  text-align: center;
}
.currentClass {
  padding-bottom: 8px;
}
.require {
  display: flex;
}
.requireItem {
  flex: 1;
}
.requireItem:not(:last-child) {
  border-right: 1px solid #e6e6e6;
}
.mineCount {
  font-weight: bold;
}
.adv {
  overflow: hidden;
}
.adv img {
  width: 100%;
}
.mobile_pagination {
  background: white;
}
.mobile_adv {
  margin-top: 8px;
}
</style>
