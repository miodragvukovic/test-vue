<template>
  <div v-if="cards.length" class="pt-5">
    <div class="flex justify-center mb-8">
        <ul class="flex">
          <li @click="grid = true" class="relative toggleView mr-4 cursor-pointer" :class="{ 'active' : grid }">Grid</li>
          <li @click="grid = false" class="relative toggleView cursor-pointer" :class="{ 'active' : !grid }">List</li>
        </ul>
    </div>
    <div class="flex flex-wrap mb-10">
      <ul v-if="!grid" class="list-navigation flex px-5 py-3 mb-7 w-full">
        <li class="name">Name</li>
        <li class="year">Year</li>
        <li class="type">Type</li>
      </ul>
      <div class="cards-container flex flex-wrap w-full" :class="{'list' : !grid}">
        <template v-for="(cardData, index) of cards">
          <Card
            :cols="numOfCols"
            :cardData="cardData"
            :gridView="grid"
            :favorited="favoritedItems.includes(cardData.imdbID)"
            :key="`card-${index}`"
            @clicked="addAndRemoveFromFavorites"
            @initModal="initModal"
          />
        </template>
      </div>
      <div v-if="showPagination" class="w-full flex justify-center">
        <div class="flex">
          <button @click="prevPage" class="prev pointer">Prev</button>
          <span class="mx-3 inline-block">{{ `${pagination.min} - ${displayMax ? amount : pagination.max} of ${amount}` }}</span>
          <button @click="nextPage" class="next pointer">Next</button>
        </div>
      </div>
    </div>
    <modal
      :show="showModal"
      @closeModal="showModal = false"
    >
      <template slot="body">
        <div class="flex flex-wrap">
          <figure class="w-1/3">
            <img :src="modalContent.Poster" alt="Poster">
          </figure>
          <div class="w-2/3 pl-5 text-left">
            <div class="flex mb-1">
              <h2 class="mr-3 text-3xl font-bold">{{ modalContent.Title }}</h2>
              <p>{{ modalContent.Year }}</p>
            </div>
            <p class="mb-3">{{ modalContent.Plot }}</p>
            <p class="mb-1"><span class="font-bold">Genre: </span>{{ modalContent.Genre }}</p>
            <p class="mb-1"><span class="font-bold">Actors: </span>{{ modalContent.Actors }}</p>
            <p class="mb-1"><span class="font-bold">Director: </span>{{ modalContent.Director }}</p>
            <p class="mb-1"><span class="font-bold">Writer: </span>{{ modalContent.Writer }}</p>
            <p class="mb-1"><span class="font-bold">Type: </span>{{ modalContent.Type }}</p>
            <p class="mb-1"><span class="font-bold">Awards: </span>{{ modalContent.Awards }}</p>
            <p class="mb-1"><span class="font-bold">Language: </span>{{ modalContent.Language }}</p>
            <p class="mb-5"><span class="font-bold">Released: </span>{{ modalContent.Released }}</p>
            <div class="flex justify-center">
              <p class="mr-5"><span class="font-bold">IMDB rating: </span>{{ modalContent.imdbRating }}</p>
              <p class="mr-5"><span class="font-bold">IMDB votes: </span>{{ modalContent.imdbVotes }}</p>
            </div>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Card from '@/components/Card'
import Modal from '@/components/Modal'
import { getDataByImdbId } from '@/api/get';

export default {
  name: 'ResultsComponent',
  components: {
    Card,
    Modal
  },
  props: {
    cards: {
      type: Array,
      default () { return [] }
    },
    amount: {
      type: Number,
      default () { return 0 }
    },
    showPagination: {
      type: Boolean,
      default () { return true }
    },
    numOfCols: {
      type: Number,
      default () { return 3 }
    }
  },
  data () {
    return {
      grid: true,
      favoritedItems: [],
      pagination: {
        min: 1,
        max: 10
      },
      resultsPerPage: 10,
      page: 1,
      showModal: false,
      modalContent: {}
    }
  },
  computed: {
    displayMax () {
      return this.amount < this.resultsPerPage
    },
    numberOfPages () {
      return Math.ceil(this.amount / this.resultsPerPage)
    }
  },
  created () {
    if (localStorage.favorites) {
      this.favoritedItems = JSON.parse(localStorage.favorites)
    }
  },
  methods: {
    addAndRemoveFromFavorites (param) {
      if (this.favoritedItems.indexOf(param) === -1) {
        this.favoritedItems.push(param)
      } else {
        const index = this.favoritedItems.indexOf(param)
        this.favoritedItems.splice(index, 1)
        this.$emit('removedFavorite', param)
      }
      localStorage.setItem('favorites', JSON.stringify(this.favoritedItems))
    },
    prevPage () {
      if (this.page > 1) {
        this.page--
        this.pagination.min = this.page * this.resultsPerPage
        this.pagination.max = ( this.page + 1 ) * this.resultsPerPage
        if (this.page === 1) {
          this.pagination.min = 1
          this.pagination.max = this.page * this.resultsPerPage
        }
        this.$emit('initSearch', {page: this.page})
      }
    },
    nextPage () {
      if (this.numberOfPages - 1 > this.page) {
        this.page++
        this.pagination.min = this.page * this.resultsPerPage
        if (( this.page + 1 ) * this.resultsPerPage > this.amount) {
          this.pagination.max = this.amount
        } else {
          this.pagination.max = ( this.page + 1 ) * this.resultsPerPage
          this.pagination.min = this.page * this.resultsPerPage
        }
        this.$emit('initSearch', {page: this.page})
      }
    },
    initModal (param) {
      this.showModal = true
      getDataByImdbId(param).then((res) => {
        this.modalContent = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.toggleView {
  &.active:after {
    content: '';
    position: absolute;
    background-color: #000;
    width: 100%;
    height: 1px;
    bottom: 0px;
    left: 0;
  }
}
.cards-container.list {
  padding: 0 1.25rem;
  @media (max-width: 480px) {
    padding: 0;
  }
}
.pointer {
  position: relative;
  font-weight: 700;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    height: 7px;
    width: 7px;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
  }
}
.prev {
  padding-left: 15px;
  &:after {
    left: 0;
    transform: translateY(-50%) rotate(135deg);
  }
}
.next {
  padding-right: 15px;
  &:after {
    right: 0;
    transform: translateY(-50%) rotate(-45deg);
  }
}
.list-navigation {
  background: #ccc;
  .name {
    width: 100%;
    max-width: 300px;
    text-align: left;
  }
  .year, .type {
    width: 100%;
    max-width: 150px;
    text-align: left;
  }
  @media (max-width: 480px) {
    .name, .year, .type {
      font-size: 12px;
    }
    .name {
      max-width: 170px;
    }
    .year, .type {
      max-width: 70px;
    }
  }
}
</style>
