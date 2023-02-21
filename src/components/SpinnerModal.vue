<template>
  <div ref="spinner" class="modal"  tabindex="-1" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered justify-content-center">
      <div class="d-flex justify-content-center" data-bs-dismiss="modal">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Modal} from "bootstrap";

export default {
  name: "SpinnerModal",
  expose: ['show','hide'],
  data() {
    return {
      modal: ''
    }
  },
  methods: {
    show() {
      this.modal = new Modal(this.$refs.spinner,{backdrop:'static'})
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