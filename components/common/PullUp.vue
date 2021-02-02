<template>
  <div class="pullUp" ref="pullUp">
    <div class="srcoll">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
console.log(Pullup);
BScroll.use(Pullup);

export default {
  data() {
    return {
      scroll: null
    };
  },
  props: {
    pullUpLoad: {
      type: Boolean,
      defaut() {
        return false;
      }
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.pullUp, {
      probeType: 3,
      pullUpLoad: true
    });
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  }
};
</script>
<style scoped>
.pullUp {
  overflow: hidden;
}
</style>
