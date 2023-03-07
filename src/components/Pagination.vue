<template>
  <nav aria-label="Page navigation example" v-if="total>1">
    <ul class="pagination">
      <li class="page-item" @click="previous()" v-if="currentPage>1">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
          @click="pageChange(index+1)"
          :class="{active:currentPage===index+1}"
          v-for="(item,index) in total">
        <a class="page-link" href="#">{{ index + 1 }}</a>
      </li>
      <li class="page-item" @click="next()" v-if="currentPage<total">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: ['total'],
  watch: {
    total(newVal, oldVal) {
      this.currentPage = 1
    }
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  methods: {
    previous() {
      if (this.currentPage === 1) {
        return
      }
      this.currentPage--
      this.$emit('pageChange', this.currentPage)
    },
    next() {
      if (this.currentPage === this.total) {
        return
      }
      this.currentPage++
      this.$emit('pageChange', this.currentPage)
    },
    pageChange(page) {
      if (this.currentPage === page) {
        return
      }
      this.currentPage = page
      this.$emit('pageChange', page)
    }
  }
}
</script>

<style scoped>

</style>