<template>
  <modal ref="modal" @confirm="unSubscribe"></modal>
  <spinner-modal ref="spinnerModal"></spinner-modal>
  <toast ref="toast"></toast>
  <div ref="inputModal" class="modal fade"  tabindex="-1"
       aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">输入限制日期</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">日期</label>
            <input type="date" class="form-control" v-model="input_date">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary" @click="subscribe">确认</button>
        </div>
      </div>
    </div>
  </div>

  <div class="card mb-3">
    <div class="card-header">
      {{ teacher.name }}
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <img :src="'https://www.javbus.com'+teacher.photo" class="img-thumbnail" v-if="showImage">
      </li>
      <li class="list-group-item" v-if="teacher.birth">生日: {{ teacher.birth }}</li>
      <li class="list-group-item" v-if="teacher.height">身高: {{ teacher.height }}</li>
      <li class="list-group-item" v-if="teacher.cup">罩杯: {{ teacher.cup }}</li>
      <li class="list-group-item" v-if="teacher.bust">胸围: {{ teacher.bust }}</li>
      <li class="list-group-item" v-if="teacher.waist">腰围: {{ teacher.waist }}</li>
      <li class="list-group-item" v-if="teacher.hip">臀围: {{ teacher.hip }}</li>
      <li class="list-group-item" v-if="teacher.limit_date">限制日期: {{ teacher.limit_date }}</li>
      <li class="list-group-item">
        <a class="card-link" @click="confirmUnSub()" v-if="teacher.status === 1">取消</a>
        <a class="card-link" @click="confirmLimitDate()" v-if="teacher.status === 1">调整</a>
        <a class="card-link" @click="confirmLimitDate()" v-if="teacher.status === 0">订阅</a>
        <a class="card-link" @click="findCourse()">查看</a>
      </li>
    </ul>
  </div>
</template>

<script>
import Toast from "./Toast.vue";
import {addTeacher, deleteTeacher} from "../api/api";
import {Modal} from "bootstrap";

export default {
  name: "TeacherCard",
  props: {
    teacher: {
      name: '',
      photo: '',
      birth: '',
      height: '',
      cup: '',
      bust: '',
      waist: '',
      hip: '',
      limit_date: '',
      status: '',
    }
  },
  emits: ['deliverTeacherName', 'refresh'],
  components: [Toast],
  data() {
    return {
      showImage: localStorage.getItem('showImage'),
      modal:'',
      input_date:''
    }
  },
  methods: {
    confirmUnSub() {
      this.$refs.modal.show('取消订阅', '确认取消订阅教师' + this.teacher.name)
    },
    confirmLimitDate() {
      this.modal = new Modal(this.$refs.inputModal)
      this.modal.show()
      this.input_date = this.teacher.limit_date
    },
    async unSubscribe() {
      this.$refs.spinnerModal.show()
      let res = await deleteTeacher({id: this.teacher.id})
      this.$refs.spinnerModal.hide()
      if (res.code === 200) {
        this.$refs.toast.show("取消订阅成功")
        this.$refs.modal.hide()
        this.$emit('refresh')
      } else {
        this.$refs.toast.show(res.msg)
      }
    },
    async subscribe() {
      if (this.input_date) {
        this.teacher.limit_date = this.input_date
        this.$refs.spinnerModal.show()
        let res = await addTeacher(this.teacher)
        this.$refs.spinnerModal.hide()
        if (res.code === 200) {
          this.$refs.toast.show("订阅成功")
          this.modal.hide()
          this.$emit('refresh')
        } else {
          this.$refs.toast.show(res.msg)
        }
      }
    },
    findCourse() {
      this.$emit('deliverTeacherName', this.teacher.name)
    },
  }
}
</script>

<style scoped>
.card-link {
  cursor: pointer;
}
</style>