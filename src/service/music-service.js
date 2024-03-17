import TrackPlayer, { Event } from 'react-native-track-player';

module.exports = async function () {
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
    TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());
    TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());
    TrackPlayer.addEventListener(Event.RemoteJumpBackward, () => TrackPlayer.seekBy(-10));
    TrackPlayer.addEventListener(Event.RemoteJumpForward, () => TrackPlayer.seekBy(+10));
    TrackPlayer.addEventListener(Event.RemoteSeek, (param) => TrackPlayer.seekTo(param.position));
    // ... add remote-next, remote-previous
}