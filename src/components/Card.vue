<template>
  <div class="card-container relative rounded mb-8 rounded overflow-hidden shadow-lg" :class="[{'list-view' : !gridView}, `col-${cols}`]">
    <figure @click="openModal(cardData.imdbID)" class="h-0 relative cursor-pointer">
      <img class="w-full h-full absolute top-0 left-0 object-cover" :src="cardData.Poster !== 'N/A' ? cardData.Poster : require('@/../public/placeholder.png')" alt="placeholder">
    </figure>
    <div class="card-content p-5 pb-16">
      <h4 @click="openModal(cardData.imdbID)" class="font-semibold text-center mb-1 cursor-pointer">{{ cardData.Title || 'Title' }}</h4>
      <p @click="openModal(cardData.imdbID)" class="text-center text-sm mb-5 cursor-pointer">
        <span>{{ cardData.Year || 'Year' }}</span><span v-if="gridView"> - </span><span>{{ cardData.Type || 'Type' }}</span>
      </p>
      <div @click="clicked(cardData.imdbID)" class="star-box flex justify-center absolute w-full left-0 cursor-pointer">
        <div class="star-five" :class="{ 'active' : favorited }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    cardData: {
      type: Object,
      default () { return {} }
    },
    gridView: Boolean,
    favorited: Boolean,
    cols: Number
  },
  data () {
    return {}
  },
  methods: {
    clicked (payload) {
      this.$emit('clicked', payload)
    },
    openModal (param) {
      this.$emit('initModal', param)
    }
  }
}
</script>

<style lang="scss" scoped>
.col-3 {
  width: 100%;
  max-width: calc(25% - 15px);
  margin-right: 20px;
  &:nth-child(4n) {
    margin-right: 0;
  }
  @media (max-width: 480px) {
    max-width: 100%;
    margin-right: 0;
  }
}
.col-4 {
  width: 100%;
  max-width: calc(33.333% - 20px);
  margin-right: 30px;
  &:nth-child(3n) {
    margin-right: 0;
  }
  @media (max-width: 480px) {
    max-width: 100%;
    margin-right: 0;
  }
}
.star-box {
  bottom: 10px;
  transform: scale(0.2);
  transform-origin: bottom;
}
.card-container {
  figure {
    padding-top: 150%;
  }
}
.card-container.list-view {
  max-width: 100%;
  display: flex;
  margin-right: 0;
  figure {
    padding-top: 0;
    height: 50px;
    width: 50px;
  }
  .card-content {
    display: flex;
    padding: 0;
    align-items: center;
    width: 100%;
    margin-left: 20px;
    position: relative;
  }
  h4, p {
    margin-bottom: 0;
  }
  h4 {
    width: 100%;
    max-width: 210px;
    margin-right: 20px;
    text-align: left;
  }
  p {
    display: flex;
    width: 300px;
    text-align: left;
    span {
      display: block;
      margin-right: 20px;
      width: 100%;
      max-width: 130px;
    }
  }
  .star-box {
    position: absolute;
    right: 0;
    width: 50px;
    height: 50px;
    left: unset;
    top: 0;
    bottom: unset;
    transform: scale(0.15);
    transform-origin: 50% 35%;
  }
  @media (max-width: 480px) {
    h4 {
      max-width: 110px;
    }
    p {
      max-width: 140px;
      width: 100%;
      span {
        max-width: 50px;
      }
    }
    .star-box {
      right: -10px;
    }
  }
  @media (max-width: 390px) {
    h4, span {
      font-size: 70%;
    }
  }
}
.star-five {
  margin: 50px 0;
  position: relative;
  display: block;
  color: #ccc;
  width: 0px;
  height: 0px;
  border-right: 100px solid transparent;
  border-bottom: 70px solid #ccc;
  border-left: 100px solid transparent;
  transform: rotate(35deg);
}
.star-five:before {
  border-bottom: 80px solid #ccc;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  position: absolute;
  height: 0;
  width: 0;
  top: -45px;
  left: -65px;
  display: block;
  content: '';
  transform: rotate(-35deg);
}
.star-five:after {
  position: absolute;
  display: block;
  color: #ccc;
  top: 3px;
  left: -105px;
  width: 0px;
  height: 0px;
  border-right: 100px solid transparent;
  border-bottom: 70px solid #ccc;
  border-left: 100px solid transparent;
  transform: rotate(-70deg);
  content: '';
}
.star-five.active {
  color: #000;
  border-bottom: 70px solid #000;
  &:before {
    border-bottom: 80px solid #000;
  }
  &:after {
    color: #000;
    border-bottom: 70px solid #000;
  }
}

</style>