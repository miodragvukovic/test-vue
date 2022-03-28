<template>
  <div class="container-custom">
    <!-- <img alt="Vue logo" src="@/assets/logo.png"> -->
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/3 pr-0 md:pr-10">
        <Filters @initSearch="search" />
      </div>
      <div class="w-full md:w-2/3">
        <Results
          :numOfCols="4"
          :cards="results.Search"
          :amount="Number(this.results.totalResults)"
          @initSearch="search"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import Filters from '@/components/Filters.vue'
import Results from '@/components/Results.vue'
import { getDataBySearchString } from '@/api/get';

export default {
  name: 'HomePage',
  components: {
    Filters,
    Results
  },
  data () {
    return {
      results: [],
      searchParams: {
        title: '',
        year: '',
        type: '',
        page: 1
      }
    }
  },
  methods: {
    search (payload) {
      this.searchParams = {...this.searchParams, ...payload}
      getDataBySearchString(this.searchParams).then(res => {
        this.results = res.data
      })
    }
  }
}
</script>


