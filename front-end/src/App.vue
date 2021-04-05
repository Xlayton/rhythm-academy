<template>
  <div id="app">
    <nav-bar />
    <section id="content">
      <router-view />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "./components/NavBar.vue";

@Component({ components: { NavBar } })
export default class App extends Vue {}
</script>

<style lang="scss">
html {
  overflow-x: hidden;
}
html,
body,
#app,
#content {
  width: 100%;
  height: 100%;
}
</style>
