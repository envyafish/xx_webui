<template>
  <div ref="confirmModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{ msg }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="confirm()">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {Modal} from "bootstrap";

export default {
  name: "Modal",
  emits: ['confirm'],
  expose: ['show','hide'],
  data() {
    return {
      modal: '',
      msg: '',
      title: '',
      data:''
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm',this.data)
    },
    show(title, msg, data) {
      this.modal = new Modal(this.$refs.confirmModal)
      this.title = title
      this.msg = msg
      this.data = data
      this.modal.show()
    },
    hide(){
      this.modal.hide()

    }

  }
}
</script>

<style scoped>

</style>