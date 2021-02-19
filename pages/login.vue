<template>
  <div class="container">
    <el-row class="login hidden-xs-only" >
      <el-col :xl="12" :lg="12" :md="12" :sm="12"  class="login-half">
        <div class="bg"></div>
      </el-col>
      <el-col :xl="12" :lg="12" :md="12" :sm="12"  class="login-half contain">
        <div class="login-header">
          <h2>登录</h2>
          <div>
            没有帐号？
            <router-link :to="{ name: 'register' }">点此注册</router-link>
          </div>
        </div>
        <el-form ref="loginForm" :model="form" label-width="0px" :rules="rules">
          <el-form-item prop="userName">
            <el-input v-model="form.userName" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              placeholder="密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="opts">
              <el-button
                class="block"
                :loading="loading"
                type="primary"
                @click="login('loginForm')"
                >登录</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="hidden-sm-and-up mobile">
       <div class="login-header">
          <h2>登录</h2>
          <div>
            没有帐号？
            <router-link :to="{ name: 'register' }">点此注册</router-link>
          </div>
        </div>
        <el-form ref="loginForm" :model="form" label-width="0px" :rules="rules">
          <el-form-item prop="userName">
            <el-input v-model="form.userName" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              placeholder="密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="opts">
              <el-button
                class="block"
                :loading="loading"
                type="primary"
                @click="login('loginForm')"
                >登录</el-button
              >
            </div>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("login", this.form)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch((err) => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    register() {
      this.$router.push("/register");
    },
    back() {
      this.$router.go(-1);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.contain {
  height: 100%;
  padding: 64px 75px 48px;
  position: relative;
}
.mobile{
  width: 100%;
    height: 100%;
    background: white;
    padding: 32px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}
.login-header {
  display: flex;
  margin-bottom: 24px;
  justify-content: space-between;
  align-items: baseline;
  color: #40485b;
  font-size: 14px;
  line-height: 1.4;
}
.block {
  width: 100%;
}
.bg {
  background-image: url(~assets/img/login_bg.jpg);
  height: 100%;
  background-size: contain;
  background-repeat-y: repeat;
}
.goRegister {
  color: #867d7d;
}
</style>
