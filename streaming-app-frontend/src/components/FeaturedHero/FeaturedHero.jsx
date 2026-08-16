import { useNavigate } from "react-router-dom";
import { Play, Plus } from "lucide-react";
import Badge from "../ui/Badge";
import { formatViews } from "../../data/mockData";

function FeaturedHero({ video }) {
  const navigate = useNavigate();
  if (!video) return null;

  return (
    <section
      className="group relative overflow-hidden rounded-2xl border border-border"
      aria-label="Featured video"
    >
      <img
        src={video.thumbnail || "/placeholder.svg"}
        alt=""
        className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[440px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Featured</Badge>
          <Badge variant="outline">{video.category}</Badge>
        </div>
        <h1 className="max-w-2xl text-balance text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {video.title}
        </h1>
        <div className="flex items-center gap-3">
          <img
            src={video.channel.avatar || "/placeholder.svg"}
            alt=""
            className="h-9 w-9 rounded-full object-cover ring-2 ring-border"
          />
          <div className="text-sm">
            <p className="font-semibold text-foreground">
              {video.channel.name}
            </p>
            <p className="text-muted-foreground">
              {formatViews(video.views)} views &middot; {video.uploadedAt}
            </p>
          </div>
        </div>
        <p className="hidden max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:block">
          {video.description}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(`/watch/${video.id}`)}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
          >
            <Play className="h-4 w-4 fill-current" />
            Play now
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-background/60 px-5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-secondary"
          >
            <Plus className="h-4 w-4" />
            Watch later
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedHero;
