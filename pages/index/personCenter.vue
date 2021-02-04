<template>
  <div class="index" id="index">
    <el-row class="content-wrap">
      <el-col :span="18" class="mine">
         <nuxt-child/>
      </el-col>
        <el-col :span="6">
          <div class="infoShow">
        <nav-menu :data="menu"></nav-menu>
      </div>
        </el-col>  
    </el-row>
    </div>
</template>
<script>
import NavMenu from '@/components/common/NavMenu';
export default {
  data() {
    return {
      menu: [
        {
                    icon: 'el-icon-s-data',
                    index: '/personCenter',
                    title: '基本资料',
                },
                {
                    icon: 'el-icon-s-data',
                    index: '/personCenter/mine',
                    title: '我的帖子',
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: '/personCenter/income',
                    title: '收益中心',
                },
            ]
    };
  },
  components:{
    NavMenu
  },
  methods: {
  },
  mounted() {}
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
.mine{
  border-right: 1px solid #e6e6e6;
  min-height: 100%;
  display: flex;
}
.index .el-menu{
  border-right:none;
  text-align: center;
}
</style>
