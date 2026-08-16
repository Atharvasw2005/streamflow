/*
  ---------------------------------------------------------------------------
  MOCK DATA (UI visualization only)
  ---------------------------------------------------------------------------
  Everything a screen needs is served from this single module so the whole app
  can be re-wired to the Spring Boot API by swapping these getters for real
  requests (see src/services/*). The object *shapes* here intentionally mirror
  likely API responses (ids, snake/camel fields, ISO-ish timestamps) so the
  swap stays mechanical.

  NOTHING in here performs a network call.
  ---------------------------------------------------------------------------
*/

export const CATEGORIES = [
  "All",
  "Technology",
  "Music",
  "Gaming",
  "Design",
  "Science",
  "Travel",
  "Cooking",
  "Finance",
];

export const channels = [
  {
    id: "ch_1",
    name: "Devstream",
    handle: "@devstream",
    avatar: "/avatars/a1.png",
    verified: true,
    subscribers: 1284000,
  },
  {
    id: "ch_2",
    name: "Nova Sound",
    handle: "@novasound",
    avatar: "/avatars/a2.png",
    verified: true,
    subscribers: 843000,
  },
  {
    id: "ch_3",
    name: "PixelPlay",
    handle: "@pixelplay",
    avatar: "/avatars/a3.png",
    verified: false,
    subscribers: 512000,
  },
  {
    id: "ch_4",
    name: "Wander Frame",
    handle: "@wanderframe",
    avatar: "/avatars/a4.png",
    verified: true,
    subscribers: 967000,
  },
  {
    id: "ch_5",
    name: "The Slow Kitchen",
    handle: "@slowkitchen",
    avatar: "/avatars/a5.png",
    verified: false,
    subscribers: 233000,
  },
  {
    id: "ch_6",
    name: "Ledger",
    handle: "@ledger",
    avatar: "/avatars/a6.png",
    verified: true,
    subscribers: 401000,
  },
];

const channelById = Object.fromEntries(channels.map((c) => [c.id, c]));

// A shared HLS source so the player shell is demonstrably wired to real media.
const DEMO_HLS = "https://d28cb1zysmj9mp.cloudfront.net/videos/9/master.m3u8";

export const videos = [
  {
    id: "1",
    title: "Building a production video pipeline with HLS and adaptive bitrate",
    thumbnail: "/thumbnails/tech.png",
    category: "Technology",
    channelId: "ch_1",
    duration: "18:42",
    views: 428000,
    likes: 21400,
    publishedAt: "2 days ago",
    source: DEMO_HLS,
    description:
      "A deep dive into how modern streaming platforms segment, transcode and deliver video. We cover adaptive bitrate ladders, manifest generation and edge caching strategy.",
  },
  {
    id: "2",
    title: "Designing a calm, focused music production workflow",
    thumbnail: "/thumbnails/music.png",
    category: "Music",
    channelId: "ch_2",
    duration: "12:03",
    views: 187000,
    likes: 9800,
    publishedAt: "5 days ago",
    source: DEMO_HLS,
    description:
      "From arrangement to mixdown — a repeatable process for finishing tracks without burning out.",
  },
  {
    id: "3",
    title: "Ranked climb: mastering positioning under pressure",
    thumbnail: "/thumbnails/gaming.png",
    category: "Gaming",
    channelId: "ch_3",
    duration: "24:15",
    views: 96000,
    likes: 5400,
    publishedAt: "1 week ago",
    source: DEMO_HLS,
    description:
      "Breaking down high-level decision making, map awareness and the small habits that separate ranks.",
  },
  {
    id: "4",
    title: "A practical design system in one afternoon",
    thumbnail: "/thumbnails/design.png",
    category: "Design",
    channelId: "ch_1",
    duration: "31:20",
    views: 342000,
    likes: 18700,
    publishedAt: "3 days ago",
    source: DEMO_HLS,
    description:
      "Tokens, components and documentation that scale. We build a compact but real design system from scratch.",
  },
  {
    id: "5",
    title: "The physics of everyday materials, visualized",
    thumbnail: "/thumbnails/science.png",
    category: "Science",
    channelId: "ch_1",
    duration: "16:57",
    views: 512000,
    likes: 29300,
    publishedAt: "6 days ago",
    source: DEMO_HLS,
    description:
      "Rendering the invisible: how simulation helps us understand stress, heat and flow in common objects.",
  },
  {
    id: "6",
    title: "Blue hour in the Dolomites — a solo filming diary",
    thumbnail: "/thumbnails/travel.png",
    category: "Travel",
    channelId: "ch_4",
    duration: "22:48",
    views: 654000,
    likes: 41200,
    publishedAt: "1 day ago",
    source: DEMO_HLS,
    description:
      "Chasing light across alpine passes. Gear, planning and the reality of shooting alone in the mountains.",
  },
  {
    id: "7",
    title: "Slow-cooked ragù: technique over shortcuts",
    thumbnail: "/thumbnails/cooking.png",
    category: "Cooking",
    channelId: "ch_5",
    duration: "14:30",
    views: 128000,
    likes: 8100,
    publishedAt: "4 days ago",
    source: DEMO_HLS,
    description:
      "Why patience is the ingredient most recipes leave out. A calm, methodical approach to a classic sauce.",
  },
  {
    id: "8",
    title: "Reading a balance sheet like an investor",
    thumbnail: "/thumbnails/finance.png",
    category: "Finance",
    channelId: "ch_6",
    duration: "19:11",
    views: 274000,
    likes: 15600,
    publishedAt: "1 week ago",
    source: DEMO_HLS,
    description:
      "The three numbers that matter most, and the traps that catch first-time investors.",
  },
  {
    id: "9",
    title: "Edge functions explained without the hype",
    thumbnail: "/thumbnails/tech.png",
    category: "Technology",
    channelId: "ch_1",
    duration: "20:05",
    views: 199000,
    likes: 11200,
    publishedAt: "2 weeks ago",
    source: DEMO_HLS,
    description:
      "What runs where, and why it matters for latency-sensitive streaming apps.",
  },
  {
    id: "10",
    title: "Ambient textures: sound design for focus",
    thumbnail: "/thumbnails/music.png",
    category: "Music",
    channelId: "ch_2",
    duration: "09:44",
    views: 88000,
    likes: 6300,
    publishedAt: "3 weeks ago",
    source: DEMO_HLS,
    description:
      "Layering field recordings and synths into calm, loopable ambient beds.",
  },
  {
    id: "11",
    title: "Cinematic color grading start to finish",
    thumbnail: "/thumbnails/travel.png",
    category: "Design",
    channelId: "ch_4",
    duration: "27:33",
    views: 421000,
    likes: 24800,
    publishedAt: "5 days ago",
    source: DEMO_HLS,
    description:
      "A repeatable grading pipeline for a consistent, filmic look across a whole project.",
  },
  {
    id: "12",
    title: "Indie horror: building dread with sound and light",
    thumbnail: "/thumbnails/gaming.png",
    category: "Gaming",
    channelId: "ch_3",
    duration: "33:12",
    views: 143000,
    likes: 9100,
    publishedAt: "6 days ago",
    source: DEMO_HLS,
    description:
      "How small studios manufacture tension on a tiny budget — a breakdown of technique.",
  },
];

export const featuredVideo = {
  id: "6",
  title: "Blue hour in the Dolomites",
  subtitle: "A solo filming diary across the alpine passes",
  thumbnail: "/thumbnails/featured.png",
  channelId: "ch_4",
  category: "Travel",
  duration: "22:48",
  views: 654000,
  publishedAt: "1 day ago",
  description:
    "Chasing light across the mountains with a single camera. Gear, planning, and the quiet reality of shooting alone.",
};

export const comments = [
  {
    id: "cm_1",
    author: "Priya Nair",
    avatar: "/avatars/a4.png",
    text: "The section on adaptive bitrate ladders finally made this click for me. Fantastic explanation.",
    likes: 342,
    postedAt: "1 day ago",
  },
  {
    id: "cm_2",
    author: "Marco Vidal",
    avatar: "/avatars/a5.png",
    text: "Would love a follow-up on edge caching invalidation strategies.",
    likes: 128,
    postedAt: "1 day ago",
  },
  {
    id: "cm_3",
    author: "Ada Chen",
    avatar: "/avatars/a2.png",
    text: "Bookmarking this. The manifest walkthrough alone is worth it.",
    likes: 76,
    postedAt: "22 hours ago",
  },
  {
    id: "cm_4",
    author: "Jonas Berg",
    avatar: "/avatars/a3.png",
    text: "Clean, no fluff, straight to the point. Subscribed.",
    likes: 54,
    postedAt: "18 hours ago",
  },
];

// Watch history grouped by day bucket — mirrors a typical grouped API payload.
export const watchHistory = [
  { group: "Today", videoIds: ["1", "4", "6"] },
  { group: "Yesterday", videoIds: ["8", "2"] },
  { group: "Earlier this week", videoIds: ["5", "11", "3"] },
];

export const subscriptions = ["ch_1", "ch_2", "ch_4", "ch_6"];

// --- Admin sample data -----------------------------------------------------

export const adminStats = {
  totalVideos: 1284,
  totalUsers: 48213,
  totalViews: 12840000,
  uploadsThisWeek: 63,
  videosTrend: 8.2,
  usersTrend: 12.6,
  viewsTrend: 4.1,
  uploadsTrend: -2.4,
};

export const adminVideos = videos.slice(0, 8).map((v, i) => ({
  id: v.id,
  title: v.title,
  channel: channelById[v.channelId]?.name ?? "Unknown",
  thumbnail: v.thumbnail,
  views: v.views,
  status: ["ready", "processing", "ready", "ready", "failed", "ready", "processing", "ready"][i],
  uploadedAt: v.publishedAt,
}));

export const adminUsers = [
  { id: "u_1", name: "Alex Rivera", email: "alex@streamflow.io", role: "ADMIN", status: "active", joined: "Jan 2024", avatar: "/avatars/a1.png" },
  { id: "u_2", name: "Priya Nair", email: "priya@streamflow.io", role: "USER", status: "active", joined: "Mar 2024", avatar: "/avatars/a4.png" },
  { id: "u_3", name: "Marco Vidal", email: "marco@streamflow.io", role: "USER", status: "disabled", joined: "Feb 2024", avatar: "/avatars/a5.png" },
  { id: "u_4", name: "Ada Chen", email: "ada@streamflow.io", role: "ADMIN", status: "active", joined: "Dec 2023", avatar: "/avatars/a2.png" },
  { id: "u_5", name: "Jonas Berg", email: "jonas@streamflow.io", role: "USER", status: "active", joined: "Apr 2024", avatar: "/avatars/a3.png" },
  { id: "u_6", name: "Sofia Marin", email: "sofia@streamflow.io", role: "SUPER_ADMIN", status: "active", joined: "Nov 2023", avatar: "/avatars/a6.png" },
];

// The signed-in user shown around the app (replace with the real session).
export const currentUser = {
  id: "u_6",
  name: "Sofia Marin",
  handle: "@sofiamarin",
  email: "sofia@streamflow.io",
  role: "SUPER_ADMIN", // USER | ADMIN | SUPER_ADMIN — drives role-based nav
  avatar: "/avatars/a6.png",
  joined: "November 2023",
  subscriptions: 42,
  uploads: 18,
};

// --- Helpers (stand-ins for future service calls) --------------------------

export function getChannel(channelId) {
  return channelById[channelId] ?? null;
}

export function withChannel(video) {
  return { ...video, channel: getChannel(video.channelId) };
}

export function getVideos() {
  return videos.map(withChannel);
}

export function getVideoById(id) {
  const v = videos.find((x) => x.id === id) ?? videos[0];
  return withChannel(v);
}

export function getRelatedVideos(id, count = 8) {
  return videos.filter((v) => v.id !== id).slice(0, count).map(withChannel);
}

export function getVideosByIds(ids) {
  return ids.map((id) => getVideoById(id));
}

export function getSubscribedChannels() {
  return subscriptions.map((id) => channelById[id]).filter(Boolean);
}

export function formatCount(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}
