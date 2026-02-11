import { memo } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoId: string;
  playing: boolean;
  playbackRate: number;
  onPlay: () => void;
  onPause: () => void;
  onTimeUpdate: () => void;
  onEnded: () => void;
  playerRef: React.Ref<any>;
  setEl: (el: HTMLVideoElement | null) => void;
  renderExtra?: () => React.ReactNode;
}

export const VideoPlayer = memo(
  ({
    videoId,
    playing,
    playbackRate,
    onPlay,
    onPause,
    onTimeUpdate,
    onEnded,
    playerRef,
    setEl,
    renderExtra,
  }: VideoPlayerProps) => {
    return (
      <div className="flex aspect-video mx-auto top-12 sm:top-14 mb-4 sticky z-10">
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${videoId}`}
          ref={(instance) => {
            if (typeof playerRef === "function") {
              playerRef(instance);
            } else if (playerRef) {
              (playerRef as any).current = instance;
            }
            if (instance) {
              setEl(instance as any);
            }
          }}
          width="100%"
          height="100%"
          playsInline={true}
          onPlay={onPlay}
          onTimeUpdate={onTimeUpdate}
          controls
          playing={playing}
          playbackRate={playbackRate}
          onPause={onPause}
          onEnded={onEnded}
        />
        {renderExtra ? renderExtra() : null}
      </div>
    );
  },
);

VideoPlayer.displayName = "VideoPlayer";
