import Peer, { SfuRoom } from 'skyway-js'
import { SkywayMediaStream } from './SkywayMediaStream';

export interface Skyway {
  peer: Peer | null
  room: SfuRoom | null
  localStream: MediaStream | undefined
  isMute: boolean
  remoteStreams: SkywayMediaStream[]
}