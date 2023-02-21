<template>
  <process :loading="loading"></process>
  <div class="container-fluid">
    <div class="d-flex mb-3" role="search">
      <input class="form-control me-2 m" type="search" @keyup.enter="search()" v-model="keyword" placeholder="教师名"
             aria-label="Search">
      <button class="btn btn-outline-success" @click="search()">Search</button>
    </div>
    <div class="row">
      <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2"
           v-for="(teacher,key) in list" :key="key">
        <teacher-card :teacher="teacher" @deliver-teacher-name="searchTeacher" @refresh="fetchTeacher"></teacher-card>
      </div>
    </div>
  </div>
</template>

<script>
import TeacherCard from "../components/TeacherCard.vue";
import {filterTeacher} from "../api/api";

export default {
  name: "Teacher",
  components: {TeacherCard},
  data() {
    return {
      list: [],
      keyword: '',
      loading: false,
      prefix: '/api/plugins/xx/'
    }
  },
  methods: {
    async fetchTeacher() {
      this.loading = true
      let res = await filterTeacher({keyword: this.keyword})
      this.loading = false
      this.list = res.data
    },
    search() {
      this.fetchTeacher()
    },
    searchTeacher(teacherName) {
      this.$router.push({path: this.prefix + 'course', query: {keyword: teacherName}})
    }
  },
  async mounted() {
    await this.fetchTeacher()
  }
}
</script>

<style scoped>
.container-fluid {
  padding-top: 16px;
}

</style>