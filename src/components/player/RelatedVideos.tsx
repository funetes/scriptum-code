import { Play } from "lucide-react";

interface Video {
  title: string;
  thumbnail: string;
  videoId: string;
}

interface RelatedVideosProps {
  videos: Video[];
}

export function RelatedVideos({ videos }: RelatedVideosProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="mt-6 md:mt-8">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Related Videos
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {videos.map((video) => (
          <a
            key={video.videoId}
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors group"
          >
            <div className="relative shrink-0 w-32 h-20 rounded-md overflow-hidden bg-gray-200">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={20} className="text-white fill-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug group-hover:text-lime-600 dark:group-hover:text-lime-500 transition-colors">
                {video.title}
              </h4>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
