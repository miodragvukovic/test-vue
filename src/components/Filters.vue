<template>
  <div class="filters pt-10">
    <form>
      <div class="mb-3">
        <label for="title" class="mb-1.5">Name/Title</label>
        <input v-model="searchData.title" id="title" class="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name/Title">
      </div>
      <div class="mb-3">
        <label for="year" class="mb-1.5">Year</label>
        <input v-model="searchData.year" id="year" class="shadow appearance-none border rounded=md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Year">
      </div>
      <div class="mb-5">
        <label for="type" class="mb-1.5">Type</label>
        <select v-model="searchData.type" id="type" class="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option disabled value="">Type</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
      </div>
      <div>
        <input @click.prevent="sendSearchParams" type="submit" value="Search" class="search-button primary-bg w-full text-center text-white font-bold py-2 px-4 border rounded-md">
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FiltersComponent',
  data () {
    return {
      searchData: {
        title: '',
        year: '',
        type: ''
      }
    }
  },
  methods: {
    sendSearchParams () {
      this.$emit('initSearch', this.searchData)
    }
  }
}
</script>

<style lang="scss" scoped>
input, label {
  display: block;
  text-align: left;
}
.search-button {
  background-color: #29abe2 !important;
  text-align: center;
}
</style>
