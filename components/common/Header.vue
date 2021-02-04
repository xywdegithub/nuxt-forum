<template>
  <!-- 折叠按钮 -->
  <!-- <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
    </div>-->
  <div class="header">
    <el-row class="responsive" align="middle">
      <el-col :span="6" :xs="4" class="flex pointer">
        <img v-if="logo" @click="goIndex" class="logo" :src="logo" />
        <img v-else @click="goIndex" class="logo" src="~assets/logo.png" />
        <div @click="goIndex" class="name hidden-xs-only">
          {{ webName }}
        </div></el-col
      >
      <el-col :span="9" :xs="15" class="flex">
        <el-input
          placeholder="请输入文章标题进行站内搜索"
          v-model="keyword"
          @change="changeTitle"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="9" class="flex users hidden-xs-only">
        <template v-if="!isToken">
          <div class="opt">
            <el-button type="primary" @click="login" size="medium"
              >登录</el-button
            >
            <el-button type="success" @click="register" size="medium"
              >注册</el-button
            >
          </div>
        </template>
        <template v-else>
          <router-link class="fabu" :to="{ name: 'index-post' }">
            <i class="iconfont iconfabu"></i>
            发起</router-link
          >
          <!-- 用户头像 -->
          <div class="user-avator">
            <img
              :src="
                avatar
                  ? avatar
                  : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
              "
            />
          </div>
          <!-- 用户名下拉菜单 -->
          <el-dropdown
            class="user-name"
            trigger="click"
            @command="handleCommand"
          >
            <el-badge :is-dot="badgeNum > 0" class="item">
              <span class="el-dropdown-link">
                {{ username }}
                <i class="el-icon-caret-bottom"></i>
              </span>
            </el-badge>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided command="mine"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item divided command="msg">
                <el-badge :value="badgeNum" class="item" :hidden="badgeNum == 0"
                  >消息中心</el-badge
                ></el-dropdown-item
              >
              <el-dropdown-item divided command="login"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-col>
      <el-col :span="9" :xs="5" class="flex users hidden-sm-and-up">
        <template v-if="!isToken">
          <el-dropdown trigger="click" @command="mobileCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-more el-icon--right icon"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="login">登录</el-dropdown-item>
              <el-dropdown-item divided command="register"
                >注册</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <router-link class="fabu" :to="{ name: 'index-post' }">
            <i class="iconfont iconfabu"></i>
          </router-link>
          <!-- 用户头像 -->
          <!-- <div class="user-avator">
            <img
              :src="
                avatar
                  ? avatar
                  : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
              "
            />
          </div> -->
          <!-- 用户名下拉菜单 -->
          <el-dropdown
            class="user-name"
            trigger="click"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              {{ username }}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item divided command="mine"
                >个人中心</el-dropdown-item
              > -->
              <el-dropdown-item command="login">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { allSiteConfig } from "@/network/website.js";

export default {
  data() {
    return {
      webName: null,
      username: null,
      avatar: null,
      isToken: false,
      logo: "",
      keyword: "",
      badgeNum: this.$store.state.user.unReadMessage,
    };
  },
  computed: {
    ...mapGetters(["getToken"]),
    ...mapGetters(["getAvatar"]),
    ...mapGetters(["getName"]),
    ...mapGetters(["getUserId"]),
    ...mapGetters(["getUnReadMsg"]),
  },
  watch: {
    getName(val) {
      this.username = val;
    },
    getAvatar(val) {
      this.avatar = val;
    },
    getUnReadMsg(val) {
      this.badgeNum = val;
    },
    $route(to, from) {
      let title = this.$route.query.title;
      if (!title) this.keyword = "";
    },
  },
  created() {
    console.log('header')
    let title = this.$route.query.title;
    if (title) this.keyword = title;
    this.getUser();
    this.allSiteConfig();
  },
  methods: {
    allSiteConfig() {
      allSiteConfig().then((res) => {
        if (res) {
          if (res.topName) {
            document.title = res.topName.value;
          }
          if (res.siteName) {
            this.webName = res.siteName.value;
          }
          if (res.topIcon) {
            var link =
              document.querySelector("link[rel*='icon']") ||
              document.createElement("link");
            link.type = "image/x-icon";
            link.rel = "shortcut icon";
            link.href = res.topIcon.value;
            document.getElementsByTagName("head")[0].appendChild(link);
          }
          if (res.homeIcon) {
            this.logo = res.homeIcon.value;
          }
        }
      });
    },
    getUser() {
      if (this.getToken) {
        this.isToken = true;
        this.username = this.getName;
        this.avatar = this.getAvatar;
      } else {
        this.isToken = false;
      }
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "login") {
        this.$store
          .dispatch("loginout", this.getUserId)
          .then(() => {
            console.log("/login");
            this.$router.push("/login");
          })
          .catch((err) => {
            this.loading = false;
          });
      }
      if (command == "mine") {
        this.$router.push({ name: "index-personCenter" });
      }
      if (command == "msg") {
        this.$router.push("/msg");
      }
    },
    mobileCommand(command) {
      if (command == "login") {
        this.login();
      } else if (command == "register") {
        this.register();
      }
    },
    register() {
      this.$router.push("/register");
    },
    login() {
      this.$router.push("/login");
    },
    post() {
      this.$router.push("/post");
    },
    goIndex() {
      this.$router.push("/");
    },
    changeTitle() {
      if (this.keyword) {
        this.$router.push({
          path: "/search",
          query: { title: this.keyword },
        });
      } else {
        this.$router.push({
          path: "/",
        });
      }
    },
  },
  mounted() {},
};
</script>
<style>
.header {
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #fff;
  height: 52px;
  min-height: 52px;
  padding: 0 15px;
}
.header .flex {
  align-items: center;
  display: flex;
  height: 100%;
}
.header .logo {
  width: auto;
  height: 40px;
}
.header .name {
  font-size: 22px;
  margin-left: 8px;
}
.header .opt {
  text-align: right;
}
.header .btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.users {
  justify-content: flex-end;
}
.header .btn-bell .el-icon-bell {
  color: #fff;
}
.header .user-name {
  margin-left: 10px;
}
.header .user-avator {
  margin-left: 20px;
}
.header .user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.header .el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.header .el-dropdown-menu__item {
  text-align: center;
}
.header .el-input__inner {
  border-radius: 5px;
}
.fabu {
  color: white;
}
.icon {
  font-size: 22px;
}
.pointer {
  cursor: pointer;
}
</style>
