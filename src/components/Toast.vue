<template>
  <div aria-live="polite" aria-atomic="true" class="position-relative">
    <div class="toast-container top-50 start-50 translate-middle" id="toastPlacement">
      <div class="toast" ref="toast">
        <div class="toast-header">
          <strong class="me-auto">提示</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          {{ msg }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from "bootstrap";

export default {
  name: "Toast",
  expose: ['show'],
  data() {
    return {
      toast: '',
      msg: ''
    }
  },
  methods: {
    show(msg) {
      this.toast = new Toast(this.$refs.toast)
      this.msg = msg
      this.toast.show()
    }
  }
}
</script>

<style scoped>

</style>