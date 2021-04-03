<template>
  <canvas id="GameCanvas"></canvas>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { io, Socket } from "socket.io-client";

@Component
export default class GameCanvas extends Vue {
  private ioConn!: Socket;

  created(): void {
    this.ioConn = io("ws://localhost:10000");
    this.ioConn.on("message", (message) => console.log("message", message));
    console.log(window);
    window.addEventListener("resize", this.onResize);
  }

  mounted(): void {
    this.onResize();
    this.renderGame();
  }

  onResize(): void {
    (document.getElementById(
      "GameCanvas"
    ) as HTMLCanvasElement).width = (document.getElementById(
      "GameArea"
    ) as HTMLDivElement).clientWidth;
    (document.getElementById(
      "GameCanvas"
    ) as HTMLCanvasElement).height = (document.getElementById(
      "GameArea"
    ) as HTMLDivElement).clientHeight;
    this.renderGame();
  }

  renderGame(): void {
    const canv = document.getElementById("GameCanvas") as HTMLCanvasElement;
    const ctx = canv.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canv.width, canv.height);
  }
}
</script>

<style lang="scss" scoped></style>
