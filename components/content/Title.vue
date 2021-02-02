<template>
    <div class="title"> 
        <div> <slot class="icon" name="icon"> </slot><span class="title_name">{{data}}</span> <slot class="middle" name="middle"> </slot></div>
        <div class="end"> <slot name="right"></slot></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        };
    },
    props:{
     data:{
         type:String,
         default(){
             return ''
         }
     }
    },
    methods: {
    },
    mounted() {
    }
};
</script>
<style scoped>
.title{
   height: 45px;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f0f0f0;
}
.icon{
    margin-right: 8px;
}
.end{
    align-self: flex-end;
}
</style>
