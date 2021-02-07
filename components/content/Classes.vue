<template>
  <div>
    <el-row class="category hidden-xs-only">
      <el-col :span="24">
        <ul class="list first-nav">
          <li :class="{ active: categoryId == null }">
            <nuxt-link :to="{ path: '/' }">全部</nuxt-link>
          </li>
          <li
            :class="{ active: categoryId == item.id }"
            v-for="item in data"
            :key="item.id"
          >
          <nuxt-link :to="{name: 'index-categoryId',params:{ categoryId: item.id} }">
            {{ item.title }}
          </nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="22" v-if="categoryId">
        <ul class="list" :class="{ down: down == true }">
          <li
            :class="{ active: subCategoryId == item.id }"
            v-for="(item, index) in subData"
            :key="item.id"
            v-if="index < limit"
          >
            <router-link
              :to="{
                name: 'index-categoryId',params:{ categoryId: item.parentId},
                query: { subCategoryId: item.id },
              }"
              >{{ item.title }}</router-link
            >
          </li>
        </ul>
      </el-col>

      <el-col :span="2" v-if="categoryId">
        <a v-if="subData.length > 0" class="more" @click="showMore">
          <template v-if="down">
            更多<i class="el-icon-arrow-down"></i>
          </template>
          <template v-else> 收起<i class="el-icon-arrow-up"></i> </template>
        </a>
      </el-col>
    </el-row>
    <el-row class="hidden-sm-and-up mobile">
      <el-col :span="24">
        <ul class="mobile_list">
          <li>
            <nuxt-link :class="{ mobile_active: categoryId == null }" to="/"
              >全部</nuxt-link
            >
          </li>
          <li v-for="item in data" :key="item.id">
            <nuxt-link
              :class="{ mobile_active: categoryId == item.id }"
              :to="{ name: 'index', query: { categoryId: item.id } }"
              >{{ item.title }}</nuxt-link
            >
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      routeName: this.$route.name,
      categoryId: null,
      subCategoryId: null,
      subData: [],
      down: true,
      limit: 10,
    };
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  watchQuery: ['categoryId'],
  watch: {
    $route(to, from) {
      this.categoryId = this.$route.params.categoryId;
      this.subCategoryId = this.$route.query.subCategoryId;
      this.initSub();
    },
    data(val) {
      console.log('val',val)
      this.data = val;
      this.initSub();
    },
  },
  created() {
    this.categoryId = this.$route.params.categoryId;
    this.subCategoryId = this.$route.query.subCategoryId;
    this.initSub();
  },
  methods: {
    initSub() {
      this.subData = [];
      if (this.categoryId && this.data.length > 0) {
        for (let item of this.data) {
          if (item.id == this.categoryId && item.hasChildren) {
            this.subData = item.children;
            break;
          }
        }
      } else {
        for (let item of this.data) {
          if (item.hasChildren) {
            this.subData = this.subData.concat(item.children);
          }
        }
      }
    },
    showMore() {
      this.down = !this.down;
      if (this.down) {
        this.limit = 10;
      } else {
        this.limit = 10000;
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
.category .list > li {
  float: left;
  position: relative;
  height: 30px;
  line-height: 30px;
  margin: 0 10px 10px 0;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
}

.category .list > li > a {
  display: block;
  padding: 0 10px;
  color: #666;
}
.category .first-nav li a {
  font-size: 15px;
  color: #222;
  font-weight: bold;
}
.category .first-nav li.active,
.category .first-nav li:hover {
  background: #494a4b;
}

.category .list > li.active > a,
.category .list > li:hover > a {
  color: #215686;
}
.category .first-nav li.active a,
.category .first-nav li:hover a {
  color: #fff;
}
.more {
  line-height: 30px;
  cursor: pointer;
  color: #155faa;
}
.mobile {
  font-size: 14px;
  line-height: 150%;
  text-align: left;
  word-break: break-word;
  border-bottom: 1px solid #e2e2e2;
  padding: 5px 16px;
  background: white;
}
.mobile_list li {
  display: inline-flex;
}
.mobile_list a {
  display: inline-block;
  font-size: 13px;
  line-height: 16px;
  padding: 5px 6px;
  margin-right: 5px;
  border-radius: 3px;
  color: #555;
  text-decoration: none;
  word-break: break-word;
}
.mobile_active {
  display: inline-block;
  font-size: 13px;
  line-height: 16px;
  padding: 5px 6px;
  margin-right: 5px;
  border-radius: 3px;
  background-color: #334;
  color: #fff !important;
}
.down {
  max-height: 40px;
  overflow: hidden;
}
</style>
