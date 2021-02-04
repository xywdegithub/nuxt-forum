<template>
  <div class="contain">
     <v-title data="我的帖子">
        <template slot="icon"><i class="iconfont icongerenzhongxin icon"></i></template>
        <template slot="right" >
          <ul class="nav end" >
            <li :class="{select:activeName==0}" @click="handleClick(0)"> <a>我的帖子</a></li>
            <li :class="{select:activeName==1}" @click="handleClick(1)"><a>我的收藏</a></li>
          </ul>
        </template>
      </v-title>
      <div class="con">
        <template v-if="activeName==0">
             <div class="articles">
          <div class="search">
            <el-input
              v-model="myPost.keyWord"
              placeholder="请输入文章标题进行搜索"
              @change="changeMyPosts"
            ></el-input>
          </div>
          <el-scrollbar>
            <div
              v-infinite-scroll="postLoadMore"
              infinite-scroll-disabled="postBusy"
            >
              <v-invitation :data="list">
                <template slot-scope="scope">
                  <div
                    @click.stop.prevent="changeFaviorPost(scope.item, 'mypost')"
                  >
                    <el-rate
                      v-if="scope.item.isCollect"
                      :value="1"
                      :max="1"
                    ></el-rate>
                    <el-rate v-else :value="0" :max="1"></el-rate>
                  </div>
                </template>
              </v-invitation>
              <div
                class="loading"
                v-if="myPost.loading"
                v-loading="myPost.loading"
              ></div>
              <p class="noMore" v-if="postBusy">没有更多了</p>
            </div>
          </el-scrollbar>
        </div>
        </template>
        <template v-else>
            <div class="articles">
          <div class="search">
            <el-input
              v-model="collect.keyWord"
              placeholder="请输入文章标题进行搜索"
              @change="changeCollectPosts"
            ></el-input>
          </div>
          <el-scrollbar>
            <div
              v-infinite-scroll="collectLoadMore"
              infinite-scroll-disabled="collectBusy"
            >
              <v-invitation :data="collectList">
                <template slot-scope="scope">
                  <div
                    @click.stop.prevent="
                      changeFaviorPost(scope.item, 'mycollect')
                    "
                  >
                    <el-rate
                      v-if="scope.item.isCollect"
                      :value="1"
                      :max="1"
                    ></el-rate>
                    <el-rate v-else :value="0" :max="1"></el-rate>
                  </div>
                </template>
              </v-invitation>
              <div
                class="loading"
                v-if="collect.loading"
                v-loading="collect.loading"
              ></div>
              <p class="noMore" v-if="collectBusy">没有更多了</p>
            </div>
          </el-scrollbar>
        </div> 
        </template>
      </div>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的帖子" name="articles">
        <div class="articles">
          <div class="search">
            <el-input
              v-model="myPost.keyWord"
              placeholder="请输入文章标题进行搜索"
              @change="changeMyPosts"
            ></el-input>
          </div>
          <el-scrollbar>
            <div
              v-infinite-scroll="postLoadMore"
              infinite-scroll-disabled="postBusy"
            >
              <v-invitation :data="list">
                <template slot-scope="scope">
                  <div
                    @click.stop.prevent="changeFaviorPost(scope.item, 'mypost')"
                  >
                    <el-rate
                      v-if="scope.item.isCollect"
                      :value="1"
                      :max="1"
                    ></el-rate>
                    <el-rate v-else :value="0" :max="1"></el-rate>
                  </div>
                </template>
              </v-invitation>
              <div
                class="loading"
                v-if="myPost.loading"
                v-loading="myPost.loading"
              ></div>
              <p class="noMore" v-if="postBusy">没有更多了</p>
            </div>
          </el-scrollbar>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的收藏" name="selected">
        <div class="articles">
          <div class="search">
            <el-input
              v-model="collect.keyWord"
              placeholder="请输入文章标题进行搜索"
              @change="changeCollectPosts"
            ></el-input>
          </div>
          <el-scrollbar>
            <div
              v-infinite-scroll="collectLoadMore"
              infinite-scroll-disabled="collectBusy"
            >
              <v-invitation :data="collectList">
                <template slot-scope="scope">
                  <div
                    @click.stop.prevent="
                      changeFaviorPost(scope.item, 'mycollect')
                    "
                  >
                    <el-rate
                      v-if="scope.item.isCollect"
                      :value="1"
                      :max="1"
                    ></el-rate>
                    <el-rate v-else :value="0" :max="1"></el-rate>
                  </div>
                </template>
              </v-invitation>
              <div
                class="loading"
                v-if="collect.loading"
                v-loading="collect.loading"
              ></div>
              <p class="noMore" v-if="collectBusy">没有更多了</p>
            </div>
          </el-scrollbar>
        </div>
      </el-tab-pane>
    </el-tabs> -->

  </div>
</template>
<script>
import vTitle from "@/components/content/Title.vue";

import { mapGetters, mapState } from "vuex";
import vInvitation from "@/components/content/Invitation.vue";
import { selectMyPosts, selectCollectPosts } from "@/network/mine.js";
import { faviorPost, cancelfaviorPost } from "@/network/index.js";
export default {
  data() {
    return {
      activeName: 0,
      list: [],
      collectList: [],
      myPost: {
        loading: false,
        pageNum: 1,
        pageSize: 20,
        total: 0,
        keyWord: "",
      },
      collect: {
        loading: false,
        pageNum: 1,
        pageSize: 20,
        total: 0,
        keyWord: "",
      },
      postBusy: false,
      collectBusy: false,
    };
  },
  components: {
    vInvitation,
    vTitle
  },
  computed: {
    ...mapGetters(["getUserId"]),
  },
  mounted() {},
  created() {
  },
  methods: {
    selectMyPosts() {
      this.myPost.loading = true;
      let data = {
        title: this.myPost.keyWord,
        pageNum: this.myPost.pageNum,
        pageSize: this.myPost.pageSize,
      };
      selectMyPosts(data).then((r) => {
        let res = r.data;
        this.myPost.loading = false;
        if (res && res.rows) {
          let data = [];
          for (let item of res.rows) {
            data.push({
              categoryName: item.categoryName,
              title: item.title,
              isCollect: item.isCollect,
              postId: item.postId,
              userIcon:item.userIcon,
              setFeatured:item.setFeatured,
              setTop:item.setTop,
              viewNumber:item.viewNumber,
              postSubcategoryId:item.postSubcategoryId,
              parentCategoryId:item.parentCategoryId
            });
          }
          this.list = this.list.concat(data);
          this.myPost.total = res.total;
        }
        if (this.myPost.total <= this.list.length) {
          this.postBusy = true;
        } else {
          this.myPost.pageNum += 1;
          this.postBusy = false;
        }
      });
    },
    selectCollectPosts() {
      this.collect.loading = true;
      let data = {
        title: this.collect.keyWord,
        pageNum: this.collect.pageNum,
        pageSize: this.collect.pageSize,
        userId: this.getUserId,
      };
      selectCollectPosts(data).then((r) => {
        let res = r.data;
        this.collect.loading = false;
        if (res && res.rows) {
          this.collectList = this.collectList.concat(res.rows);
          this.collect.total = res.total;
        }
        if (this.collect.total <= this.collectList.length) {
          this.collectBusy = true;
        } else {
          this.collect.pageNum += 1;
          this.collectBusy = false;
        }
      });
    },
    postLoadMore() {
      this.postBusy = true;
      this.selectMyPosts();
    },
    collectLoadMore() {
      this.collectBusy = true;
      this.selectCollectPosts();
    },
    handleClick(tab) {
      this.activeName=tab
      if (tab == 1) {
        this.changeCollectPosts();
      } else {
        this.changeMyPosts();
      }
    },
    changeFaviorPost(item, type) {
      if (item.isCollect) {
        this.cancelfaviorPost(item, type);
      } else {
        this.faviorPost(item, type);
      }
    },
    faviorPost(item, type) {
      let data = {
        postId: item.postId,
      };
      faviorPost(data).then((res) => {
        item.isCollect = true;
      });
    },
    cancelfaviorPost(item, type) {
      let data = {
        postId: item.postId,
      };
      cancelfaviorPost(data).then((res) => {
        item.isCollect = false;
        // if (type == "mypost") {
        //   this.selectMyPosts();
        // } else {
        //   this.selectCollectPosts();
        // }
      });
    },
    changeMyPosts() {
      this.list = [];
      this.myPost.pageNum = 1;
      this.postLoadMore();
    },
    changeCollectPosts() {
      this.collectList = [];
      this.collect.pageNum = 1;
      this.collectLoadMore();
    },
  },
};
</script>
<style scoped>
.nav{
    margin: 0;
    border-color: #e6e6e6;
    list-style:none
}
.nav li{
      margin: 0 4px 0 0;
    font-size: 14px;
    float: left;
}
.nav > li > a {
    color: #666;
}
.nav > li > a {
    line-height: 30px;
    padding: 0 13px;
    background-color: #fff;
    border: none;
    cursor: pointer;
}
.select{
    line-height: 30px;
    background-color: #fff;
    border: none;
    border-bottom: 2px solid #155faa;
    font-weight: bold;
    color: #333;
}
.con{
  padding: 20px 0px;
  flex: 1;
}
.search {
  text-align: left;
}
.el-input {
  width: 250px;
}
.articles {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  height: 100%;
}
.load {
  margin-top: 100px;
  display: fixed;
}
.el-tabs {
  flex: 1;
  overflow: hidden;
}
.avatar-uploader {
  text-align: left;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
.avatar {
  width: 78px;
  height: 78px;
  display: block;
}
.noMore{
  text-align: center;
}
</style>
