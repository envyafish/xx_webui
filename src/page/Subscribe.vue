<template>
  <process :loading="loading"></process>
  <div class="container-fluid">
    <div class="d-flex" role="search">
      <input class="form-control me-2" type="search" @keyup.enter="search()" v-model="keyword" placeholder="番号/教师名" aria-label="Search">
      <button class="btn btn-outline-success" @click="search()">Search</button>
    </div>
    <alert :show="alertShow" @refresh="complexSearch"></alert>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2"
           v-for="(item,key) in list" :key="key">
        <component v-if="item.type==='course'" is="CourseCard" :course="item" @refresh="complexSearch" @deliver-teacher-name="searchTeacher"></component>
        <component v-if="item.type==='teacher'" is="TeacherCard" :teacher="item" @refresh="complexSearch" @deliver-teacher-name="searchTeacher"></component>
      </div>
    </div>
  </div>
</template>

<script>
import CourseCard from "../components/CourseCard.vue";
import TeacherCard from "../components/TeacherCard.vue";
import {search} from "../api/api";
import Alert from "../components/Alert.vue";

export default {
  name: "Subscribe",
  components: {CourseCard, TeacherCard, Alert},
  data() {
    return {
      list: [],
      loading: false,
      alertShow: false,
      keyword:'',
      prefix: '/api/plugins/xx/'
    }
  },
  methods: {
    async complexSearch() {
      this.loading = true
      this.alertShow = false
      let res = await search({keyword: this.keyword})
      this.loading = false
      if (res.code === 200) {
        this.list = res.data
      } else {
        this.alertShow = true
      }
    },
    search() {
      if (this.keyword) {
        this.complexSearch()
      }
    },
    searchTeacher(teacherName) {
      this.$router.push({path: this.prefix + 'course', query: {keyword: teacherName}})
    }
  }
}
</script>

<style scoped>
.container-fluid {
  padding-top: 16px;
}

.row {
  padding-top: 16px;
}
</style>