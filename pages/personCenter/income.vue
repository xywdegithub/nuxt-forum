<template>
  <div class="contain">
    <v-title :data="title">
      <template slot="icon"><i class="iconfont iconshouru icon"></i></template>
    </v-title>
    <div class="show">
      <div class="showItem" v-for="(item, key) in data" :key="key">
        <div class="name">{{ item.name }}</div>
        <div class="count">{{ item.count }}</div>
        <div class="yesterday">{{ item.yesName }}:{{ item.yesCount }}</div>
      </div>
    </div>
    <div class="con">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="精选文章" name="jingxuan">
          <el-scrollbar>
            <div
              v-infinite-scroll="loadMoreFeaturedPosts"
              infinite-scroll-disabled="busy"
            >
              <v-invitation :data="jingxuan">
                <!-- <template slot-scope="scope">
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
                </template> -->
              </v-invitation>
              <!-- <div class="jingxuan" v-for="(item, key) in jingxuan" :key="key">
                <div ><span class="category">{{item.categoryName}}</span>  <span class="titleName">{{ item.title }}</span></div>
                <div class="opt">
                     {{ item.viewNumber }}次浏览 • {{
                    item.commentNumber
                  }}个评论
                </div>
              </div> -->
              <div class="loading" v-if="loading" v-loading="loading"></div>
              <p class="noMore" v-if="busy">没有更多了</p>
            </div>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="帖子广告位管理" name="tiezi">
           <div v-if="noTieziLimit">
            您的文章暂无被认证为精选，无法使用此功能
          </div>
          <v-manage :data="tiezi" v-else>
            <template v-slot:opts>
              <el-button
                type="primary"
                size="medium"
                style="text-align: right"
                @click="addAdv(1)"

                >发布广告</el-button
              >
            </template>
            <template v-slot:header="msg">
              <el-button type="primary" size="mini" @click="update(msg.item, 1)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="deleteAdvertisements(msg.item)"
                >删除</el-button
              >
            </template>
          </v-manage>
        </el-tab-pane>
        <el-tab-pane label="版主广告位管理" name="banzhu">
            <div v-if="noBanzhuLimit">您当前不是版主，无法使用此功能</div>
          <v-manage :data="banzhu" v-else>
            <template v-slot:opts>
              <el-button
                type="primary"
                size="medium"
                style="text-align: right"
                @click="addAdv(2)"
                >发布广告</el-button
              >
            </template>
            <template v-slot:header="msg">
              <el-button type="primary" size="mini" @click="update(msg.item, 2)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="deleteAdvertisements(msg.item)"
                >删除</el-button
              >
            </template>
          </v-manage>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog :title="form.title" :visible.sync="form.visible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="广告名">
          <el-input v-model="form.data.name"></el-input>
        </el-form-item>
        <el-form-item label="广告图片">
          <el-upload
            class="avatar-uploader"
            accept=".png,.jpg,.jpeg"
            action="http://47.111.178.85:9090/site/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-remove="handleAvatarRemove"
          >
            <img v-if="form.data.image" :src="form.data.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="form.data.keyword"></el-input>
        </el-form-item>
        <el-form-item label="url地址">
          <el-input v-model="form.data.url"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="advCreate">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import vTitle from "@/components/content/Title.vue";
import vManage from "@/components/content/Manage.vue";
import vInvitation from "@/components/content/Invitation.vue";
import { mapGetters } from "vuex";
import {
  selectUserCount,
  selectFeaturedPosts,
  selectAdvertisements,
  addAdvertisements,
  updateAdvertisements,
  deleteAdvertisements,
} from "@/network/mine.js";
export default {
  data() {
    return {
      title: "收益中心",
      activeName: "jingxuan",
      data: {
        totalCount: {
          name: "阅读总数",
          count: 0,
          yesName: "昨日阅读数",
          yesCount: 0,
        },
        supportCount: {
          name: "赞同总数",
          count: 0,
          yesName: "昨日赞同数",
          yesCount: 0,
        },
        clickCount: {
          name: "广告点击数",
          count: 0,
          yesName: "昨日广告点击数",
          yesCount: 0,
        },
      },
      jingxuan: [],
      noTieziLimit: false,
      noBanzhuLimit: false,
      tiezi: {
        tip: "您的文章被认证为精选文章后，即可显示您发布的广告",
        imgs: [],
      },
      banzhu: {
        tip: "您当选为版主后，即可在该板块显示您发布的广告",
        imgs: [],
      },
      loading: false,
      page: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
      busy: false,
      form: {
        visible: false,
        title: "",
        data: {
          advertisementId: "",
          type: 1,
          name: "",
          image: "",
          keyword: "",
          url: "",
        },
      },
    };
  },
  components: {
    vTitle,
    vManage,
    vInvitation,
  },
  computed: {
    ...mapGetters(["getUserId"]),
  },
  created() {
    this.selectUserCount();
    // this.selectFeaturedPosts();
  },
  methods: {
    selectUserCount() {
      selectUserCount().then((r) => {
        let res = r.data;
        if (res) {
          this.data.totalCount.yesCount = res.lastViewTotal;
          this.data.totalCount.count = res.viewTotal;
          this.data.supportCount.yesCount = res.lastLikeTotal;
          this.data.supportCount.count = res.likeTotal;
          this.data.clickCount.yesCount = res.lastAdvertTotal;
          this.data.clickCount.count = res.advertTotal;
        }
      });
    },
    selectFeaturedPosts() {
      this.loading = false;
      let data = {
        pageSize: this.page.pageSize,
        pageNum: this.page.pageNum,
        userId: this.getUserId,
      };
      selectFeaturedPosts(data).then((r) => {
        let res = r.data;
        this.loading = false;
        if (res && res.rows) {
          this.jingxuan = this.jingxuan.concat(res.rows);
          this.page.total = res.total;
        }
        if (this.page.total <= this.jingxuan.length) {
          this.busy = true;
        } else {
          this.page.pageNum += 1;
          this.busy = false;
        }
      });
    },
    loadMoreFeaturedPosts() {
      this.busy = true;
      this.selectFeaturedPosts();
    },
    selectAdvertisements(type) {
      let data = {
        userId: this.getUserId,
        type: type,
      };
      selectAdvertisements(data).then((r) => {
        let res = r.data;
        if (res && res.rows) {
          if (type == 1) {
            this.tiezi.imgs = res.rows;
          } else {
            this.banzhu.imgs = res.rows;
          }
        }
      });
    },
    loadLimit(type) {
      let data = {
        userId: this.getUserId,
        type: type,
      };
      this.$store
        .dispatch("getInfo")
        .then((res) => {
          if (type == 1) {
            if (res.isFeatured) {
              this.selectAdvertisements(type);
            } else {
              this.noTieziLimit = true;
            }
          } else {
            if (res.isModerator) {
              this.selectAdvertisements(type);
            } else {
              this.noBanzhuLimit = true;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // selectAdvertisements(data).then((r) => {
      //   let res = r.data;
      //   if (res && res.total > 0) {
      //     this.selectAdvertisements(type);
      //   } else {
      //     if (type == 1) this.noTieziLimit = true;
      //     else this.noBanzhuLimit = true;
      //   }
      // });
    },
    handleClick(tab, event) {
      if (tab.index == "0") {
        this.jingxuan = [];
        this.page.pageNum = 1;
        this.loadMoreFeaturedPosts();
      } else if (tab.index == "1") {
        this.loadLimit(tab.index);
      } else {
        this.loadLimit(tab.index);
      }
    },
    addAdv(type) {
      if((type==1 && this.tiezi.imgs.length == 2) ||  (type==2 && this.banzhu.imgs.length == 2))
      {
        this.$message({
          type: "warning",
          message: "最多只能发布两条广告",
        });
        return;
      }
      this.form.title = "新增";
      this.form.visible = true;
      this.form.data.name = "";
      this.form.data.type = type;
      this.form.data.keyword = "";
      this.form.data.url = "";
      this.form.data.image = "";
      this.form.data.advertisementId = "";
    },
    update(item, type) {
      this.form.title = "修改";
      this.form.visible = true;
      this.form.data.advertisementId = item.advertisementId;
      this.form.data.name = item.name;
      this.form.data.image = item.image;
      this.form.data.type = type;
      this.form.data.keyword = item.keyword;
      this.form.data.url = item.url;
    },
    handleAvatarRemove() {},
    handleAvatarSuccess(res) {
      if (res && res.data) {
        this.form.data.image = res.data.filePath;
      }
    },
    addAdvertisements() {
      addAdvertisements(this.form.data).then((res) => {
        this.$message({
          type: "success",
          message: "新增成功",
        });
        this.form.visible = false;
        this.selectAdvertisements(this.form.data.type);
      });
    },
    updateAdvertisements() {
      updateAdvertisements(this.form.data).then((res) => {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.form.visible = false;
        this.selectAdvertisements(this.form.data.type);
      });
    },
    deleteAdvertisements(item) {
      this.$confirm("确定删除该广告?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            advertisementId: item.advertisementId,
          };
          deleteAdvertisements(data).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.selectAdvertisements(item.type);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    advCreate() {
      if (this.form.title == "新增") {
        this.addAdvertisements();
      } else {
        this.updateAdvertisements();
      }
    },
  },
};
</script>
<style scoped>
.show {
  display: flex;
  height: 150px;
  align-items: center;
}
.showItem,
.con {
  flex: 1;
}
.showItem:not(:last-child) {
  border-right: 1px solid #eee;
}
.con {
  overflow: hidden;
}
.name {
  font-size: 14px;
}
.count {
  font-size: 16px;
  margin: 8px 0;
  font-weight: bold;
  color: #215686;
}
.yesterday {
  font-size: 14px;
  color: #909399;
}
.jingxuan {
  display: flex;
  justify-content: space-between;
  height: 32px;
  font-size: 14px;
  align-items: center;
  padding: 8px 0;
}
.titleName {
  font-weight: bold;
}
.jingxuan:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}
.opt {
  color: #999;
}
.el-tabs {
  height: 100%;
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
.noMore {
  padding: 20px;
}
.category {
  padding: 0 5px;
  background-color: #f2f2f2;
  font-size: 12px;
  border-radius: 4px;
  color: #999;
}
</style>
