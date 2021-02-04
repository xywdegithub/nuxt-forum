<template>
<div>
  <div class="hidden-xs-only">
   <nuxt-link
      :to="{ name: 'index-details', query: { postId: item.postId } }"
      class="invitation"
      v-for="(item, key) in data"
      :key="key"
    >
      <el-avatar
        v-if="item.userIcon"
        shape="square"
        size="large"
        :src="item.userIcon"
      ></el-avatar>
      <el-avatar
        v-else
        shape="square"
        size="large"
        src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
      ></el-avatar>
      <div class="layout">
        <div class="head">
          <h4
            class="title"
            :class="{ titleTop: item.setTop, titleFeatured:item.setFeatured}"
            v-if="item.title"
          >
            {{ item.title }}
             <span class="featured" v-if="item.setFeatured" 
            >精选</span>
          <span v-if="item.setTop" class="top">&nbsp;&nbsp; 置顶</span>
          </h4>
        </div>
        <p class="sub">
          <!-- <span class="label" :class="{labelTop:item.setTop}"  v-if="item.categoryName && item.setTop">{{item.categoryName}}</span> -->
          <span class="label" v-if="item.categoryName" @click.stop.prevent="toIndex(item)"
            >{{ item.categoryName }}</span
          >
          <span class="name" v-if="item.userName"
            ><span v-if="item.setTop"> • </span> • 发帖人：{{
              item.userName
            }}&nbsp;&nbsp;&nbsp;&nbsp;</span
          >
          <span v-if="item.viewNumber"
            > • 浏览数：{{ item.viewNumber }}&nbsp;&nbsp;&nbsp;&nbsp;</span
          >
          <span v-if="item.responseTime"
            > • 最后回复时间：{{ item.responseTime }}</span
          >
        </p>
      </div>
      <div class="right">
        <slot :item="item"></slot>
      </div>
    </nuxt-link>
  </div>
  <div class="hidden-sm-and-up mobile">
    <nuxt-link
      :to="{ name: 'index-details', query: { postId: item.postId } }"
      class="invitation mobile_invitation"
      v-for="(item, key) in data"
      :key="key"
    >
      <el-avatar
        v-if="item.userIcon"
        shape="square"
        size="small"
        :src="item.userIcon"
      ></el-avatar>
      <el-avatar
        v-else
        shape="square"
        size="small"
        src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
      ></el-avatar>
      <div class="layout">
         <p class="sub">
          <span class="label" v-if="item.categoryName" @click.stop.prevent="toIndex(item)"
            >{{ item.categoryName }} </span
          >
          <span class="mobile_name" v-if="item.userName"
            > • {{
              item.userName
            }}&nbsp;&nbsp;&nbsp;&nbsp;</span
          >
            <span class="featured" v-if="item.setFeatured" 
            >精选</span>
             <span v-if="item.setTop" class="top">&nbsp;&nbsp; 置顶</span>
        </p>
        <div class="mobile_title" v-if="item.title">
               {{item.title}}
        </div>
        <p class="mobile_sub">
          <span v-if="item.viewNumber"
            > 浏览数：{{ item.viewNumber }}&nbsp;&nbsp;&nbsp;&nbsp;</span
          >
          <span v-if="item.responseTime"
            > <span  v-if="item.viewNumber">•</span> 最后回复：{{ item.responseTime }}</span
          >
        </p>
      </div>
      <div class="right">
        <slot :item="item"></slot>
      </div>
    </nuxt-link>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    postId: {
      type: Number,
      default() {
        return null;
      },
    },
  },
  methods: {
    toIndex(item){
      console.log(item)
      this.$router.push({
        name: "index",
        query: { categoryId: item.parentCategoryId, subCategoryId:item.postSubcategoryId },
      });
    }
  },
  mounted() {},
};
</script>
<style scoped>
.invitation {
  display: flex;
  padding: 14px 0 14px 0px;
  overflow: hidden;
}
.mobile_invitation {
  padding: 8px 0 !important;
}
.invitation:not(:last-child) {
  border-bottom: 1px solid rgba(224, 230, 237, 0.5);
}
.layout {
  margin-left: 10px;
  text-align: left;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.label {
  display: inline-block;
  padding: 0 5px;
  height: 20px;
  line-height: 20px;
  background-color: #f2f2f2;
  font-size: 12px;
  border-radius: 4px;
}
.head {
  font-weight: bold;
  color: #215686;
  display: flex;
  align-items: center;
}
.title {
  font-size: 15px;
  margin-bottom: 3px;
  line-height: 1.2;
}
.name{
  color: #666;
}
.mobile_name{
  color: #778087
}
.mobile_title{
  font-size: 14px;
    line-height: 130%;
    text-shadow: 0 1px 0 #fff;
    word-break: break-word;
      color: #778087;
    text-decoration: none;
    padding: 5px 0;
}

.sub {
  font-size: 12px;
  color: #999;
}
.mobile_sub{
  color: #ccc;
  font-size: 12px;
}
.right {
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content:center
}
.titleTop {
  color: #f85840;
}
/* .titleFeatured{
  color: #d81e06;
} */
.labelTop {
  background-color: #f2f2f2;
  color: #999;
}
.hot {
  color: #d81e06;
  font-size: 22px;
}
.featured{
   font-style: normal;
    background: #d81e06;
    color: #ffffff;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 3px;
}
.top{
  font-style: normal;
    background: #FF7F00;
    color: #ffffff;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 3px;
}
</style>
