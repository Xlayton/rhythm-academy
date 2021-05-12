<template>
  <div>
    <p id="HitPrompt"></p>
    <canvas id="GameCanvas"></canvas>
    <img
      src="@/assets/note-outline.png"
      id="note-outline"
      style="display: none"
    />
    <img src="@/assets/b-fill.png" id="b-fill" style="display: none" />
    <img src="@/assets/w-fill.png" id="w-fill" style="display: none" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { io, Socket } from "socket.io-client";

@Component
export default class GameCanvas extends Vue {
  @Prop() setWeeb!: (isWeeb: boolean) => void;
  private ioConn!: Socket;
  private notePressed!: Array<boolean>;
  private gameState!: "menu" | "mult" | "sing" | "opt" | "ingame";
  private notes!: Array<{ lane: number; time: number; duration: number }>;
  private bpm!: number;
  private fpb!: number;
  private beat!: number;
  private frameCounter!: number;
  private fps!: number;
  private clearScore!: any;
  private score!: number;

  created(): void {
    this.fps = 60;
    this.beat = 0;
    this.score = 0;
    this.frameCounter = 0;
    this.bpm = 200;
    this.notes = [
      { lane: 0, time: 3, duration: 1 },
      { lane: 0, time: 4, duration: 1 },
      { lane: 1, time: 4.25, duration: 1 },
      { lane: 2, time: 4.5, duration: 1 },
      { lane: 3, time: 4.75, duration: 3 },
      { lane: 0, time: 5, duration: 1 },
      { lane: 0, time: 6, duration: 1 },
      { lane: 0, time: 7, duration: 1 },
      { lane: 0, time: 7.75, duration: 1 },
      { lane: 1, time: 8, duration: 1 },
    ];
    this.fpb = (60 / this.bpm) * this.fps;

    this.gameState = "menu";
    this.notePressed = [false, false, false, false];
    this.ioConn = io("ws://localhost:10000");
    this.ioConn.on("message", (message) => console.log("message", message));
    console.log(window);
    window.addEventListener("resize", this.onResize);
  }

  mounted(): void {
    document.addEventListener("keydown", (evt: KeyboardEvent) => {
      if (evt.code === "KeyD") {
        this.notePressed[0] = true;
        let notesHit = this.notes.filter(
          (note) =>
            note.lane === 0 &&
            note.time - (this.beat + this.frameCounter / this.fpb) <= 1 &&
            note.time - (this.beat + this.frameCounter / this.fpb) >= -1
        );
        if (notesHit.length) {
          let noteToHit = notesHit.reduce((note1, note2) => {
            return Math.abs(
              note2.time - (this.beat + this.frameCounter / this.fpb)
            ) <
              Math.abs(note1.time - (this.beat + this.frameCounter / this.fpb))
              ? note2
              : note1;
          });
          this.hitNote(noteToHit, this.beat + this.frameCounter / this.fpb);
        }
      }
      if (evt.code === "KeyF") {
        this.notePressed[1] = true;
        let notesHit = this.notes.filter(
          (note) =>
            note.lane === 1 &&
            note.time - (this.beat + this.frameCounter / this.fpb) <= 1 &&
            note.time - (this.beat + this.frameCounter / this.fpb) >= -1
        );
        if (notesHit.length) {
          let noteToHit = notesHit.reduce((note1, note2) => {
            return Math.abs(
              note2.time - (this.beat + this.frameCounter / this.fpb)
            ) <
              Math.abs(note1.time - (this.beat + this.frameCounter / this.fpb))
              ? note2
              : note1;
          });
          this.hitNote(noteToHit, this.beat + this.frameCounter / this.fpb);
        }
      }
      if (evt.code === "KeyJ") {
        this.notePressed[2] = true;
        let notesHit = this.notes.filter(
          (note) =>
            note.lane === 2 &&
            note.time - (this.beat + this.frameCounter / this.fpb) <= 1 &&
            note.time - (this.beat + this.frameCounter / this.fpb) >= -1
        );
        if (notesHit.length) {
          let noteToHit = notesHit.reduce((note1, note2) => {
            return Math.abs(
              note2.time - (this.beat + this.frameCounter / this.fpb)
            ) <
              Math.abs(note1.time - (this.beat + this.frameCounter / this.fpb))
              ? note2
              : note1;
          });
          this.hitNote(noteToHit, this.beat + this.frameCounter / this.fpb);
        }
      }
      if (evt.code === "KeyK") {
        this.notePressed[3] = true;
        let notesHit = this.notes.filter(
          (note) =>
            note.lane === 3 &&
            note.time - (this.beat + this.frameCounter / this.fpb) <= 1 &&
            note.time - (this.beat + this.frameCounter / this.fpb) >= -1
        );
        if (notesHit.length) {
          let noteToHit = notesHit.reduce((note1, note2) => {
            return Math.abs(
              note2.time - (this.beat + this.frameCounter / this.fpb)
            ) <
              Math.abs(note1.time - (this.beat + this.frameCounter / this.fpb))
              ? note2
              : note1;
          });
          this.hitNote(noteToHit, this.beat + this.frameCounter / this.fpb);
        }
      }
    });
    document.addEventListener("keyup", (evt: KeyboardEvent) => {
      if (evt.code === "KeyD") {
        this.notePressed[0] = false;
      }
      if (evt.code === "KeyF") {
        this.notePressed[1] = false;
      }
      if (evt.code === "KeyJ") {
        this.notePressed[2] = false;
      }
      if (evt.code === "KeyK") {
        this.notePressed[3] = false;
      }
    });
    window.scrollTo(0, document.body.scrollHeight);
    this.onResize();
    this.renderGame();
  }

  onResize(): void {
    let isPossibleHeightLargest =
      (document.getElementById("GameArea") as HTMLDivElement).clientHeight >
      (document.getElementById("GameArea") as HTMLDivElement).clientWidth;

    (document.getElementById(
      "GameCanvas"
    ) as HTMLCanvasElement).width = isPossibleHeightLargest
      ? (document.getElementById("GameArea") as HTMLDivElement).clientWidth / 2
      : (document.getElementById("GameArea") as HTMLDivElement).clientHeight /
        2;

    (document.getElementById(
      "GameCanvas"
    ) as HTMLCanvasElement).height = isPossibleHeightLargest
      ? (document.getElementById("GameArea") as HTMLDivElement).clientWidth
      : (document.getElementById("GameArea") as HTMLDivElement).clientHeight;
  }

  renderGame(): void {
    switch (this.gameState) {
      case "menu":
        this.renderMenu();
        break;
      case "mult":
        this.renderMultiplayer();
        break;
      case "sing":
        this.renderSinglePlayer();
        break;
      case "opt":
        this.renderOptions();
        break;
      case "ingame":
        this.renderGameScreen();
        break;
    }
    setTimeout(this.renderGame, 1000 / this.fps);
  }

  renderMenu(): void {
    const canv = document.getElementById("GameCanvas") as HTMLCanvasElement;
    const ctx = canv.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(10, 50, canv.width - 20, canv.height / 8);
    ctx.strokeRect(10, canv.height / 3 + 50, canv.width - 20, canv.height / 8);
    ctx.strokeRect(
      10,
      (2 * canv.height) / 3 + 50,
      canv.width - 20,
      canv.height / 8
    );
    ctx.textAlign = "center";
    ctx.font = "2em Roboto";
    ctx.fillText("Single Player", canv.width / 2, 60 + canv.height / 16);
    ctx.fillText(
      "Multiplayer",
      canv.width / 2,
      canv.height / 3 + 60 + canv.height / 16
    );
    ctx.fillText(
      "Options",
      canv.width / 2,
      (2 * canv.height) / 3 + 60 + canv.height / 16
    );
  }

  renderMultiplayer(): void {
    const canv = document.getElementById("GameCanvas") as HTMLCanvasElement;
    const ctx = canv.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("Work In Progress", canv.width / 2, canv.height / 2);
  }

  renderSinglePlayer(): void {
    const canv = document.getElementById("GameCanvas") as HTMLCanvasElement;
    const ctx = canv.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("Work In Progress", canv.width / 2, canv.height / 2);
  }

  hitNote(note: { lane: number; time: number }, timeHit: number) {
    clearTimeout(this.clearScore);
    this.notes = this.notes.filter(
      (n) => !(n.time === note.time && n.lane === n.lane)
    );
    if (Math.abs(note.time - timeHit) > 0.75) {
      (document.getElementById("HitPrompt") as HTMLParagraphElement).innerHTML =
        "<span class='poor'>Poor</span> <span class='score'>25</span>";
      this.score += 25;
    } else if (Math.abs(note.time - timeHit) > 0.5) {
      (document.getElementById("HitPrompt") as HTMLParagraphElement).innerHTML =
        "<span class='good'>Good</span> <span class='score'>50</span>";
      this.score += 50;
    } else if (Math.abs(note.time - timeHit) > 0.25) {
      (document.getElementById("HitPrompt") as HTMLParagraphElement).innerHTML =
        "<span class='excellent'>Excellent</span> <span class='score'>75</span>";
      this.score += 75;
    } else if (Math.abs(note.time - timeHit) > 0.15) {
      (document.getElementById("HitPrompt") as HTMLParagraphElement).innerHTML =
        "<span class='perfect'>Perfect</span> <span class='score'>100</span>";
      this.score += 100;
    }
    this.clearScore = setTimeout(
      () => ((document.getElementById("HitPrompt") as HTMLParagraphElement).innerHTML = ""),
      2500
    );
  }

  renderOptions(): void {
    const canv = document.getElementById("GameCanvas") as HTMLCanvasElement;
    const ctx = canv.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = "#fff";
    ctx.fillText("Work In Progress", canv.width / 2, canv.height / 2);
  }

  renderGameScreen(): void {
    const bFill = document.getElementById("b-fill") as HTMLImageElement;
    const wFill = document.getElementById("w-fill") as HTMLImageElement;
    const canv = document.getElementById("GameCanvas") as HTMLCanvasElement;
    const ctx = canv.getContext("2d") as CanvasRenderingContext2D;
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canv.width, canv.height);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(`Score: ${this.score}`, canv.width / 2, 15);
    ctx.strokeStyle = "#fff";
    for (let i = 0; i < 4; i++) {
      ctx.strokeRect(
        i * (canv.width / 4),
        canv.height - canv.height / 16,
        canv.width / 4,
        canv.height / 16
      );
    }
    for (let i = 0; i < this.notes.length; i++) {
      if (
        this.notes[i].time - this.beat < 5 &&
        this.notes[i].time - this.beat > -1
      ) {
        ctx.drawImage(
          this.notes[i].lane % 2 == 0 ? bFill : wFill,
          this.notes[i].lane * (canv.width / 4),
          canv.height -
            (canv.height / 16) * this.notes[i].duration -
            (this.notes[i].time - this.beat) * (canv.height / 4) +
            ((this.frameCounter / this.fpb) * canv.height) / 4,
          canv.width / 4,
          (canv.height / 16) * this.notes[i].duration
        );
      }
    }
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < this.notePressed.length; i++) {
      if (this.notePressed[i]) {
        ctx.drawImage(
          i % 2 == 0 ? bFill : wFill,
          i * (canv.width / 4),
          canv.height - canv.height / 16,
          canv.width / 4,
          canv.height / 16
        );
      }
    }
    if (this.frameCounter === this.fpb) {
      this.beat++;
      this.frameCounter = 0;
    } else {
      this.frameCounter++;
    }
  }
}
</script>

<style lang="scss">
#GameCanvas {
  border: 1px solid #fff;
}
#HitPrompt {
  position: absolute;
  width: 100%;
  text-align: center;
  left: 0px;
  top: 35%;
}

.poor {
  color: #f00;
}
.good {
  color: #ff0;
}
.excellent {
  color: #0f0;
}
.perfect {
  background: linear-gradient(
    to left,
    violet,
    indigo,
    blue,
    green,
    yellow,
    orange,
    red
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.score {
  color: #fff;
}
</style>
