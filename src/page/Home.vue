<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" data-bs-dismiss="offcanvas" :class="{active:view==='course'}" href="#" @click="routeTo('course')">课程订阅</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-dismiss="offcanvas" :class="{active:view==='teacher'}" href="#" @click="routeTo('teacher')">授课教师</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-dismiss="offcanvas" :class="{active:view==='rank'}" href="#" @click="routeTo('rank')">热门推荐</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-dismiss="offcanvas" :class="{active:view==='subscribe'}" href="#" @click="routeTo('subscribe')">搜索订阅</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-dismiss="offcanvas" :class="{active:view==='options'}" href="#" @click="routeTo('options')">配置</a>
            </li>
          </ul>

        </div>
      </div>

    </div>
  </nav>
  <router-view></router-view>

</template>

<script>
import Course from "./Course.vue";
import Teacher from "./Teacher.vue";
import Rank from "./Rank.vue";
import Subscribe from "./Subscribe.vue";
import Options from "./Options.vue";
export default {
  name: "Home",
  data() {
    return {
      view:'course',
      prefix: '/api/plugins/xx/'
    }
  },
  watch: {
    $route: {
      handler:  function (val, oldVal){
        let view = val.path.split('/').slice(-1)
        this.view = view[0]
      },
      // 深度观察监听
      deep:  true
    }
  },
  components: {Course, Teacher, Rank, Subscribe,Options},
  methods: {
    routeTo(view) {
      this.view = view
      this.$router.push(this.prefix+view)
    }
  },
  mounted() {
    let path = this.$route.path
    let view = path.split('/').slice(-1)
    this.view = view[0]
  }

}
</script>

<style scoped>

</style>