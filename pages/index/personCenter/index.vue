<template>
  <div class="contain" v-loading="loading">
      <v-title data="基本资料">
        <template slot="icon"><i class="el-icon-setting icon"></i></template>
      </v-title>
    <div class="con">
      <el-form :model="updateMine" label-width="80px" v-if="updateMine">
        <el-form-item label="用户名">
          <label >{{updateMine.userName}}</label>
        </el-form-item>
        <el-form-item label="头像设置">
          <el-upload
            class="avatar-uploader"
            action="http://47.111.178.85:9090/site/file/upload"
            accept=".png,.jpg,.jpeg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="updateMine.avatar"
              :src="updateMine.avatar"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="updateMine.nickname"></el-input>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="updateMine.introduction"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="updateMine.email"></el-input>
        </el-form-item>
      </el-form>
       <div class="submit">
            <el-button type="primary" @click="changeMineInfo">保存</el-button>
          </div>
        </div>
  </div>
</template>
<script>
import vTitle from "@/components/content/Title.vue";

import { mapGetters, mapState } from "vuex";
import { setUserName, setUserAvatar } from "@/utils/auth";
import { findSiteUser, updateSiteUser } from "@/network/user.js";
export default {
  data() {
    return {
      loading:false,
      updateMine: {},
    };
  },
  components: {
    vTitle
  },
  computed: {
    ...mapGetters(["getUserId"]),
  },
  mounted() {},
  created() {
    this.findSiteUser();
  },
  methods: {
    findSiteUser() {
      this.loading=true
      findSiteUser(this.getUserId).then((r) => {
        this.loading=false;
        let res = r.data;
        if (res) {
          this.updateMine = res;
          this.$store.commit('SET_NAME', res.userName);
          this.$store.commit('SET_AVATAR',  res.avatar)
          setUserAvatar(res.avatar);
        }
      });
    },
    handleAvatarSuccess(res, file) {
      if (res && res.data) {
        this.updateMine.avatar = res.data.filePath;
      }
    },
    beforeAvatarUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isLt5M;
    },
    changeMineInfo() {
      let data = {
        nickname: this.updateMine.nickname,
        userId: this.updateMine.userId,
        avatar: this.updateMine.avatar,
        introduction: this.updateMine.introduction,
        email: this.updateMine.email,
      };
      updateSiteUser(data).then((res) => {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.findSiteUser()
      });
    },
  },
};
</script>
<style scoped>
.con{
  padding: 20px 0; 
  flex: 1;
}
.submit {
  margin-top: 16px;
  text-align: right;
  margin-bottom: 16px;
}
.submit .el-button {
  width: 100px;
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
</style>
