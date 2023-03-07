<template>
  <modal ref="modal" @confirm="unSubscribe"></modal>
  <spinner-modal ref="spinnerModal"></spinner-modal>
  <toast ref="toast"></toast>
  <div class="card mb-3">
    <img :src="'https://www.javbus.com'+course.banner" class="card-img-top ratio227-153" v-if="showImage">
    <span class="badge text-bg-success" v-if="course.status === 2">已完成</span>
    <span class="badge text-bg-primary" v-if="course.status === 1">订阅中</span>
    <span class="badge text-bg-danger" v-if="course.status <= 0">未订阅</span>
    <div class="card-body">
      <h5 class="card-title">{{ course.code }}</h5>
      <p class="card-text text-ellipsis--3">{{ course.title }}</p>
      <p class="card-text"><small class="text-muted">发行日期: {{ course.release_date }}</small></p>
      <div class="btn-group">
        <a class="card-link" v-if="course.status === 1" @click="confirmUnSub()">取消订阅</a>
        <a class="card-link" v-if="course.status <= 0" @click="subscribe()">订阅</a>
        <a class="card-link" @click="more">更多</a>
        <a class="card-link" v-if="course.status === 1" @click="downloadCourse()">提交下载</a>
        <a class="card-link" v-if="course.status === 2" @click="confirmUnSub()">删除记录</a>
      </div>
    </div>
  </div>
  <div class="offcanvas offcanvas-bottom" tabindex="-1" ref="bottomCanvas" aria-labelledby="offcanvasBottomLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">{{ course.code }}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body small">
      <div class="card mb-3">
        <div class="row">
          <div class="col-md-4">
            <!--            <img :src="'https://www.javbus.com'+course.banner" class="img-fluid img-thumbnail rounded-start" alt="..."-->
            <!--                 v-if="showImage">-->
            <!--            <div>-->
            <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel" v-if="showImage">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img :src="'https://www.javbus.com'+course.banner" class="d-block w-100" alt="">
                </div>
                <div class="carousel-item" v-for="(still,index) in course.still_photo.split(',')" :key="index">
                  <img :src="'https://www.javbus.com'+still" class="d-block w-100" alt="">
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                      data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                      data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>

        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title ">{{ course.title }}</h5>
            <p class="card-text" v-if="course.producer">制作商: <span class="badge">{{ course.producer }}</span></p>
            <p class="card-text" v-if="course.publisher">发行商: <span class="badge">{{ course.producer }}</span></p>
            <p class="card-text" v-if="course.genres">类别:
              <span class="badge" v-for="(genre,index) in course.genres.split(',')" :class="getRotateBadge(index)"
                    :key="index">{{ genre }}</span>
            </p>
            <p class="card-text" v-if="course.casts">出演教师:
              <span class="badge"
                    v-for="(cast,index) in course.casts.split(',')"
                    :key="index"
                    style="cursor:pointer;text-decoration:underline"
                    data-bs-dismiss="offcanvas"
                    @click="deliverTeacherName(cast)">
                  {{ cast }}
                </span>
            </p>
            <p class="card-text" v-if="course.duration">授课时长: <span
                class="badge">{{ course.duration }} 分钟</span></p>
            <p class="card-text"><small class="text-muted">发行日期: <span
                class="badge">{{ course.release_date }}</span></small></p>
            <a class="card-link" v-if="course.status === 1" @click="downloadCourse()">提交下载</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {addCourse, deleteCourse, downloadCourse} from "../api/api";
import Modal from "./Modal.vue";
import Toast from "./Toast.vue";
import {Offcanvas} from "bootstrap";
import SpinnerModal from "./SpinnerModal.vue";

export default {
  props: {
    course: {
      code: '',
      title: '',
      release_date: '',
      producer: '',
      publisher: '',
      genres: '',
      casts: '',
      status: '',
      still_photo: ''
    }
  },
  components: [Modal, Toast, SpinnerModal],
  name: "CourseCard",
  data() {
    return {
      badge: [
        'text-bg-primary',
        'text-bg-secondary',
        'text-bg-success',
        'text-bg-danger',
        'text-bg-warning',
        'text-bg-info',
        'text-bg-light',
        'text-bg-dark'
      ],
      show: false,
      showImage: localStorage.getItem('showImage')
    }
  },
  emits: ['deliverTeacherName', 'refresh'],
  mounted() {
    this.canvas = new Offcanvas(this.$refs.bottomCanvas)
  },
  methods: {
    more() {
      this.canvas.show()
    },
    confirmUnSub() {
      this.$refs.modal.show('取消订阅', '确认取消订阅番号' + this.course.code)
    },
    async downloadCourse() {
      this.$refs.spinnerModal.show()
      let res = await downloadCourse({id: this.course.id})
      this.$refs.spinnerModal.hide()
      if (res.code === 200) {
        this.$refs.toast.show("已提交下载请求")
      } else {
        this.$refs.toast.show(res.msg)
      }
    },
    async unSubscribe() {
      this.$refs.spinnerModal.show()
      let res = await deleteCourse({id: this.course.id})
      this.$refs.spinnerModal.hide()
      if (res.code === 200) {
        this.$refs.modal.hide()
        this.$refs.toast.show("取消订阅成功")
        this.$emit('refresh')
      } else {
        this.$refs.toast.show(res.msg)
      }
    },
    async subscribe() {
      this.$refs.spinnerModal.show()
      let res = await addCourse(this.course)
      this.$refs.spinnerModal.hide()
      if (res.code === 200) {
        this.$refs.toast.show("订阅成功")
        this.$emit('refresh')
      } else {
        this.$refs.toast.show(res.msg)
      }

    },
    getRotateBadge(index) {
      let remainder = index % 7
      return this.badge[remainder]
    },
    deliverTeacherName(cast) {
      this.$emit('deliverTeacherName', cast)
    }
  }
}
</script>

<style scoped>
.offcanvas.offcanvas-bottom {
  height: auto;
}

.badge {
  border-radius: 0px;
}

.ratio227-153 {
  aspect-ratio: 227/153;
}

.text-ellipsis--3 {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.card-link {
  cursor: pointer;
}
</style>