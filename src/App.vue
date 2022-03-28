<template>
  <div id="app">
    <div class="flex flex-col justify-between">
      <div>
        <div class="primary-bg">
          <div class="container-custom">
            <nav class="flex justify-between items-center py-5">
              <figure class="w-16">
                <img src="@/assets/images/logo.png" />
              </figure>
              <div>
                <router-link class="mr-4 text-xl" to="/">Home</router-link>
                <router-link class="text-xl" to="/favorites">Favorites</router-link>
              </div>
            </nav>
          </div>
        </div>
        <router-view/>
      </div>
      <footer class="primary-bg">
        <div class="container-custom">
          <div class="flex justify-center py-3">
            <p class="mb-0 text-white">@copyright</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app > div {
  min-height: 100vh;
}

* {
  font-size: 16px;
  line-height: 21px;
}

.container-custom {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
}

.primary-bg {
  background: #29abe2;
}

.primary-text {
  color: #29abe2;
}

nav a {
  color: #fff;
  position: relative;
}

nav a.router-link-exact-active:after {
  content: '';
  position: absolute;
  background-color: #fff;
  width: 100%;
  height: 1px;
  bottom: -5px;
  left: 0;
}
</style>
