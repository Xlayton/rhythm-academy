<template>
  <div id="GameArea" :class="isWeeb ? 'space-between' : ''">
    <img v-if="isWeeb" src="@/assets/anime-girl_2.png" />
    <game-canvas />
    <img v-if="isWeeb" src="@/assets/anime-girl_1.png" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GameCanvas from "../components/GameCanvas.vue";

@Component({ components: { GameCanvas } })
export default class GamePage extends Vue {
  private isWeeb!: boolean;

  setWeeb(isWeeb: boolean): void {
    this.isWeeb = isWeeb;
  }
}
</script>

<style lang="scss">
#GameArea {
  display: flex;
  background-color: #000;
  width: 100%;
  height: 100%;
  max-height: 100%;
  justify-content: center;
}

.space-between {
  justify-content: space-between !important;
}
</style>
