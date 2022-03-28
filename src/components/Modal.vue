<template>
  <transition name="fade" mode="out-in">
    <div v-if="show" class="modal-mask" @click.self="close">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header flex justify-end">
            <button type="button" class="close-btn close-modal" @click.self="close" />
          </div>
          <div class="modal-body">
            <slot name="body" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'ModalComponent',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  watch: {
    show () {}
  },
  methods: {
    close () {
      this.$emit('closeModal')
    }
  }
}
</script>
<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  transition: opacity .25s ease;
  align-items: center;
  justify-content: center;
  opacity: 1;
  overflow: hidden;
  @media (max-width: 768px) {
    overflow: auto;
    padding: 30px 10px;
    display: block;
  }
}

.modal-wrapper {
  max-width: 900px;
  width: 100%;
  transform: scale(0.75);
  @media (max-width: 768px) {
    transform: none;
  }
}

.modal-container {
  position: relative;
  border-radius: 8px;
  margin: 0 auto;
  padding: 15px 20px;
  transition: all .3s ease;
  background-color: #fff;
}

.modal-header {
  display: flex;
  .close-btn {
    border: 0;
    padding: 0;
    background: transparent;
    cursor: pointer;
    display: block;
    position: relative;
    height: 20px;
    width: 20px;
    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 1px;
      width: 100%;
      background-color: #000;
      top: 50%;
      left: 0;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
}

.modal-body {
  margin: 10px 0 15px;
}

.fade-enter {
  opacity: 0;
}

.fade-leave-active {
  opacity: 0;
}

.fade-enter .modal-container,
.fade-leave-active .modal-container {
  transform: scale(1.1);
}
</style>
