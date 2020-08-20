<template>
  <div class="container">
    <div>
      <skyway-video :room-name="roomName" :user-name="userName"></skyway-video>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Logo from "~/components/Logo.vue";
import SkywayVideo from "~/components/molecules/SkyWayVideoComponent.vue";

@Component({
  components: {
    Logo,
    SkywayVideo
  }
})
export default class Index extends Vue {
  roomName: string = "sample";
  userName: string = "test";
  created() {
    this.userName = this.makeRandum(10);
  }

  makeRandum(retLength: number): string {
    // 生成する文字列に含める文字セット
    const chars: string = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charsLength: number = chars.length;
    const ret: string[] = [...Array(retLength)].map((): string => {
      return chars[Math.floor(Math.random() * charsLength)];
    });
    return ret.join("");
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
