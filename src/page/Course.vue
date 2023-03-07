<template>
  <process :loading="loading"></process>
  <div class="container-fluid">
    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" class="btn-check" name="btnradio" id="btnradio1" v-model="status" value=""
             @change="filter()" autocomplete="off">
      <label class="btn btn-outline-secondary" for="btnradio1">全部</label>

      <input type="radio" class="btn-check" name="btnradio" id="btnradio2" v-model="status" value="1"
             @change="filter()" autocomplete="off">
      <label class="btn btn-outline-secondary" for="btnradio2">订阅中</label>

      <input type="radio" class="btn-check" name="btnradio" id="btnradio3" v-model="status" value="2"
             @change="filter()" autocomplete="off">
      <label class="btn btn-outline-secondary" for="btnradio3">已完成</label>
      <div class="d-flex ms-2" role="search">
        <input class="form-control me-2" type="search" @keyup.enter="search()" v-model="keyword"
               placeholder="番号/教师名" aria-label="Search">
        <button class="btn btn-outline-success" @click="search()">Search</button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2"
           v-for="(course,key) in list" :key="key">
        <course-card :course="course" @refresh="fetchCourse" @deliver-teacher-name="searchTeacher"></course-card>
      </div>
    </div>
    <pagination :total="total"  @pageChange="pageChange"></pagination>
  </div>

</template>

<script>
import {filterCourse} from "../api/api";
import CourseCard from "../components/CourseCard.vue";
import Pagination from "../components/Pagination.vue";

export default {
  name: "Course",
  components: {CourseCard, Pagination},
  data() {
    return {
      list: [],
      status: '',
      keyword: '',
      loading: false,
      total: 0,
      currentPage: 1
    }
  },
  async mounted() {
    if (this.$route.query.keyword) {
      this.keyword = this.$route.query.keyword
    }
    await this.fetchCourse()
  },
  methods: {
    pageChange(page) {
      this.currentPage = page
      this.fetchCourse()
    },
    filter(){
      this.currentPage = 1
      this.fetchCourse()
    },
    async fetchCourse() {
      this.loading = true
      let res = await filterCourse({page: this.currentPage, keyword: this.keyword, status: this.status})
      this.loading = false
      this.total = res.data.total
      this.list = res.data.data
    },
    search() {
      this.currentPage = 1
      this.fetchCourse()
    },
    searchTeacher(teacherName) {
      this.keyword = teacherName
      this.search()
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