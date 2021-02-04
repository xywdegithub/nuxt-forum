<template>
  <div class="searchResult">
    <div class="hidden-xs-only">
      <nuxt-link
        :to="{ name: 'index-details', query: { postId: item.postId } }"
        class="invitation"
        v-for="(item, key) in data"
        :key="key"
      >
        <div class="layout">
          <div class="head">
            <p class="title" v-if="item.title" v-html="keyDeal(item.title)"></p>
          </div>
          <div class="sub">
            <p class="searchContent" v-html="keyContent(item.content)"></p>
            <p class="reply">
              &nbsp;&nbsp;
              <i class="iconfont iconpinglun reply">
                {{ item.commentNumber }}个回复</i
              >
            </p>
          </div>
        </div>
      </nuxt-link>
    </div>
    <div class="hidden-sm-and-up mobile">
      <nuxt-link
        :to="{ name: 'index-details', query: { postId: item.postId } }"
        class="invitation"
        v-for="(item, key) in data"
        :key="key"
      >
        <div class="layout">
          <div class="head">
            <h4
              class="title"
              v-if="item.title"
              v-html="keyDeal(item.title)"
            ></h4>
          </div>
          <div class="sub">
            <p class="searchContent" v-html="keyContent(item.content)"></p>
            <p class="reply">
              &nbsp;&nbsp;
              <i class="iconfont iconpinglun reply"
                >{{ item.commentNumber }}个回复</i
              >
            </p>
          </div>
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
    title: {
      type: String,
    },
  },
  methods: {
    keyDeal(str) {
      let reg = new RegExp(this.title, "gm");
      return str.replace(reg, "<font color='red'>" + this.title + "</font>");
    },
    keyContent(str) {
      let reg = new RegExp("style=", "gm");
      str = str.replace(reg, "");
      let data = this.HTMLDecode(str);
      return this.keyDeal(data);
    },
    HTMLDecode(text) {
      if (process.client) {
      var temp = document.createElement("div");
      temp.innerHTML = text;
      var output = temp.innerText || temp.textContent;
      temp = null;
      return output;
      }
    },
    toIndex(item) {
      this.$router.push({
        name: "index",
        query: {
          categoryId: item.parentCategoryId,
          subCategoryId: item.postSubcategoryId,
        },
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.invitation {
  display: flex;
  padding: 10px;
  overflow: hidden;
}
.mobile_invitation {
  padding: 8px 0 !important;
}
.invitation:not(:last-child) {
  border-bottom: 1px solid rgba(224, 230, 237, 0.5);
}
.layout {
  padding: 0 4px;
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
  font-size: 14px;
  margin-bottom: 10px;
}
.mobile .title {
  font-size: 14px;
}
.name {
  color: #666;
}
.sub {
  font-size: 14px;
  color: #666;
}
/* .mobile .sub {
  font-size: 12px;
  color: #999;
} */
.reply {
  font-size: 14px;
}
.searchContent{
 overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical
}
</style>
