<template>
  <div id="Nav">
    <router-link to="/">Home</router-link>
    <router-link to="/game">Game</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {}
</script>

<style lang="scss"></style>
