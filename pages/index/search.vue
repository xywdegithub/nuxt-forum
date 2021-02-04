<template>
  <div class="search" id="search">
    <el-row class="content-wrap" v-loading="loading">
      <el-col :span="24" class="posts">
        <div class="nav hidden-xs-only">
          <span class="nav_title">搜索</span>
        </div>
        <template v-if="list.length > 0">
          <search-posts :data="list" :title="title"></search-posts>
        </template>
        <template v-else>
          <div class="noData">暂无数据</div>
        </template>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import searchPosts from "@/components/content/SearchPosts.vue";
import { selectPosts } from "@/network/index.js";

export default {
    metaInfo() {
    return {
      title: this.title,
      meta: [
        {
          name: "keywords",
          content: this.title,
        },
      ],
      link: [
        {
          // set link
          rel: "base",
          href: "http://47.111.178.85:9090/web/search",
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
      title: "",
      currentType: "",
      list: [],
      category: null,
    };
  },
  components: {
    searchPosts,
  },
  computed: {
    ...mapGetters(["getUserId"]),
  },
  watch: {
    $route(to, from) {
      this.title = this.$route.query.title;
      this.currentPage = 1;
      this.selectPosts();
    },
  },
  created() {
    if (this.$route.query.title) {
      this.title = this.$route.query.title;
    }
    this.selectPosts();
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  methods: {
    selectPosts() {
      this.loading = true;
      let data = {
        searchText: this.title,
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
    replyData(item) {
      this.$router.push({
        path: "/details",
        query: { postId: item.postId, anchor: "edit" },
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
    },
  },
};
</script>
<style scoped>
.search {
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
