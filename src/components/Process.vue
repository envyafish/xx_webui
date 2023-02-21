<template>
  <div class="progress" v-if="loading" role="progressbar" aria-label="Example 1px high" :aria-valuenow="process"
       aria-valuemin="0" aria-valuemax="100" style="height: 1px">
    <div class="progress-bar progress-bar-striped progress-bar-animated" :style="'width: '+process+'%'"></div>
  </div>
</template>

<script>
export default {
  name: "process",
  data() {
    return {
      timer: '',
      process: 0
    }
  },
  watch: {
    loading(newVal, oldVal) {
      if (!newVal) {
        this.process = 100
        clearInterval(this.timer)
      }
      if (newVal) {
        this.process = 0
        this.start()
      }
    }
  },
  props: ['loading'],
  methods: {
    start() {
      this.timer = setInterval(() => {
        if (this.process + 5 === 100) {
          clearInterval(this.timer)
        } else {
          this.process += 5
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>