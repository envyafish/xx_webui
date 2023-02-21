<template>
  <div class="alert alert-warning alert-dismissible fade show" v-if="show" role="alert" >
    <strong>肥肠抱歉~~</strong>
    出现了一点状况,检查一下代理是否可用,XX网站是否可以访问,是否触发了cloud flare
    <a class="card-link" @click="refresh">点我刷新</a>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props:['show'],
  emits:['refresh'],
  methods:{
    refresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>
.alert{
  margin-top: 16px;
}
.card-link{
  cursor: pointer;
}
</style>