<template>
  <div class="container-custom">
    <Results
      :numOfCols="3"
      :cards="arrayOfData"
      :showPagination="false"
      @removedFavorite="removedFavorite"
    />
  </div>
</template>

<script>
import { getDataByImdbId } from '@/api/get';
import Results from '@/components/Results.vue'


export default {
  components: {
    Results
  },
  data () {
    return {
      arrayOfFavorites: [],
      arrayOfData: [],
      grid: true
    }
  },
  created () {
    if (localStorage.favorites) {
      this.arrayOfFavorites = JSON.parse(localStorage.favorites)
    }
    this.getItemsById()
  },
  methods: {
    getItemById (param) {
      return getDataByImdbId(param)
    },
    async getItemsById () {
      const responses = await Promise.all(this.arrayOfFavorites.map(each => this.getItemById(each)))
      this.arrayOfData = responses.map(each => each.data)
    },
    removedFavorite (param) {
      const index = this.arrayOfData.indexOf(this.arrayOfData.find(each => each.imdbID === param))
      this.arrayOfData.splice(index, 1)
    }
  }
}
</script>