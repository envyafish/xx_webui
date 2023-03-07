<template>
  <process :loading="loading"></process>
  <div class="container-fluid">

    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" class="btn-check" name="btnradio" id="btnradio1" v-model="status" value="" @change="filter()"
             autocomplete="off">
      <label class="btn btn-outline-secondary" for="btnradio1">全部</label>

      <input type="radio" class="btn-check" name="btnradio" id="btnradio4" v-model="status" value="0" @change="filter()"
             autocomplete="off">
      <label class="btn btn-outline-secondary" for="btnradio4">未订阅</label>

      <input type="radio" class="btn-check" name="btnradio" id="btnradio2" v-model="status" value="1" @change="filter()"
             autocomplete="off">
      <label class="btn btn-outline-secondary" for="btnradio2">订阅中</label>

      <input type="radio" class="btn-check" name="btnradio" id="btnradio3" v-model="status" value="2" @change="filter()"
             autocomplete="off">
      <label class="btn btn-outline-secondary" for="btnradio3">已完成</label>
      <div class="d-flex ms-2" role="search">
        <input class="form-control me-2" type="search" @keyup.enter="search()" v-model="keyword"
               placeholder="番号/教师名" aria-label="Search">
        <button class="btn btn-outline-success" @click="search()">Search</button>
      </div>
    </div>
    <alert :show="alertShow" @refresh="refresh"></alert>

    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2"
           v-for="(course,key) in list" :key="key">
        <course-card :course="course" @deliver-teacher-name="searchTeacher" @refresh="refresh"></course-card>
      </div>
    </div>
    <nav aria-label="Page navigation example" v-show="pageShow">
      <ul class="pagination">
        <li class="page-item" :class="{active:page===1}" @click="pageTo(1)"><a class="page-link">1</a></li>
        <li class="page-item" :class="{active:page===2}" @click="pageTo(2)"><a class="page-link">2</a></li>
        <li class="page-item" :class="{active:page===3}" @click="pageTo(3)"><a class="page-link">3</a></li>
        <li class="page-item" :class="{active:page===4}" @click="pageTo(4)"><a class="page-link">4</a></li>
        <li class="page-item" :class="{active:page===5}" @click="pageTo(5)"><a class="page-link">5</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import CourseCard from "../components/CourseCard.vue";
import {listRank} from "../api/api";
import Process from "../components/Process.vue";
import Alert from "../components/Alert.vue";

export default {
  name: "Rank",
  components: {Process, CourseCard, Alert},
  emits: ['deliverKeyword'],
  expose: ['search'],
  data() {
    return {
      list: [],
      status: '',
      data_list: [],
      loading: false,
      keyword: '',
      alertShow: false,
      page: 1,
      pageShow: false,
      prefix: '/api/plugins/xx/'
    }
  },
  async mounted() {
    await this.listRank()
    this.pageShow = true
  },
  methods: {
    async pageTo(page) {
      if (this.page === page) {
        return
      }
      this.page = page
      await this.listRank()
      this.filter()
      document.documentElement.scrollTop = 0;
    },
    async refresh() {
      localStorage.setItem('courseRefresh', 'true')
      this.alertShow = false
      await this.listRank()
      this.filter()
    },
    async listRank() {
      this.loading = true
      let res = await listRank({page: this.page})
      this.loading = false
      if (res.code === 200) {
        this.data_list = res.data
        this.list = this.data_list
      } else {
        this.alertShow = true
      }
    },
    filter() {
      let filter_list = this.data_list
      if (parseInt(this.status) === 0 || parseInt(this.status) > 0 || parseInt(this.status) < 0) {
        filter_list = filter_list.filter(rank => {
          if (parseInt(this.status) === 0) {
            return parseInt(rank.status) <= 0
          }
          return parseInt(rank.status) === parseInt(this.status)
        })
      }
      if (this.keyword) {
        filter_list = filter_list.filter(rank => {
          return rank.code.indexOf(this.keyword) > -1 || rank.casts.indexOf(this.keyword) > -1
        })
      }
      this.list = filter_list
      console.log(this.list)
    },
    async search() {
      await this.listRank()
      this.filter()
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

.page-link {
  cursor: pointer;
}

</style>