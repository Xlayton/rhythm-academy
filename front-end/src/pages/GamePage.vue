<template>
  <div id="GameArea">
    <game-canvas />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GameCanvas from "../components/GameCanvas.vue";

@Component({ components: { GameCanvas } })
export default class GamePage extends Vue {}
</script>

<style lang="scss">
#GameArea {
  width: 100%;
  height: 100%;
  max-height: 80vh;
}
</style>
