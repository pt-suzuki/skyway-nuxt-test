<template>
  <div class="skyway-video">
    <video width="100%" class="local-stream"></video>
    <div>
      <button @click="mute">{{ muteText }}</button>
      <button @click="disconnect">切断</button>
    </div>
    <div id="remote-streams" class="remote-streams">
      <div
        v-for="remoteStream in remoteStreams"
        :ref="remoteStream.peerId"
        :key="remoteStream.peerId"
      >
        <video autoplay :srcObject.prop="remoteStream"></video>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Prop, Vue, Component } from "vue-property-decorator";
import Peer, { SfuRoom } from "skyway-js";
import { SkywayMediaStream } from "~/domain/skyway_media/SkywayMediaStream";

@Component({})
export default class Test extends Vue {
  @Prop({
    type: String,
    default: null
  })
  userName!: string;

  @Prop({
    type: String,
    default: null
  })
  roomName!: string;

  isMute: boolean = false;
  localStream?: SkywayMediaStream = undefined;
  peer: Peer | null = new Peer({ key: "4451e1db-e933-483d-9076-18956c2dd73d" });
  room!: SfuRoom;
  remoteStreams: SkywayMediaStream[] = [];

  get muteText(): string {
    return this.isMute ? "ミュート解除" : "ミュート";
  }

  async mounted() {
    const localVideo = document.getElementById(
      "local-stream"
    ) as HTMLMediaElement;

    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });

    localVideo.muted = true;
    localVideo.srcObject = this.localStream;
    await localVideo.play();

    this.peer = await new Peer(this.userName, {
      key: "4451e1db-e933-483d-9076-18956c2dd73d",
      debug: 3
    });
    this.peer.on("open", this.connect);
  }

  connect() {
    if (!this.peer || !this.peer.open) {
      return;
    }

    this.room = this.peer.joinRoom(this.roomName, {
      mode: "sfu",
      stream: this.localStream
    }) as SfuRoom;

    if (this.room) {
      this.room.on("stream", (stream: SkywayMediaStream): void => {
        this.remoteStreams.push(stream);
      });

      this.room.on("peerLeave", (peerId: string): void => {
        const audio = document.getElementById(peerId);
        if (audio) {
          audio.remove();
        }
      });
    }
  }
  mute(): void {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      this.isMute = !this.isMute;
      audioTrack.enabled = !this.isMute;
    }
  }
  disconnect(): void {
    if (this.room) {
      this.room.close();
    }
  }
}
</script>

<style scoped>
.local-stream {
  width: "100px";
}
</style>
