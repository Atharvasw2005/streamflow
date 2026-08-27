import apiClient from "./apiClient";

const VIDEO_BASE_PATH = "/api/v1/video";
const DEFAULT_CLOUDFRONT_URL = "https://d28cb1zysmj9mp.cloudfront.net";
const CLOUDFRONT_URL =
    import.meta.env.VITE_CLOUDFRONT_URL || DEFAULT_CLOUDFRONT_URL;

function resolveHlsUrl(hlsPath) {
    if (!hlsPath) {
        return "";
    }

    let path = hlsPath;
    let search = "";

    try {
        const parsedUrl = new URL(hlsPath);
        path = parsedUrl.pathname;
        search = parsedUrl.search;
    } catch {
        // The API may return a relative object path instead of a full URL.
    }

    if (!path.toLowerCase().endsWith(".m3u8")) {
        return "";
    }

    const cleanBase = CLOUDFRONT_URL.replace(/\/$/, "");
    const cleanPath = path.replace(/^\//, "");

    return `${cleanBase}/${cleanPath}${search}`;
}

const mapVideo = (video) => {
    const id = video?.video_id ?? video?.id;
    const createdAt = video?.created_at || video?.createdAt || new Date().toISOString();
    const hlsPath = video?.hlsUrl || video?.filePath || "";

    return {
        id,
        title: video?.title || "Untitled Video",
        description: video?.description || "No description available.",
        channel: video?.channel || "",
        views: Number(video?.views || 0),
        publishedAt: new Date(createdAt).toLocaleDateString(),
        duration: video?.duration || "",
        category: video?.category || "",
        thumbnail: video?.thumbnail || "",
        hlsUrl: resolveHlsUrl(hlsPath),
        status: video?.status || "UPLOADED",
    };
};

export const getVideos = async () => {
    const response = await apiClient.get(VIDEO_BASE_PATH);
    const payload = Array.isArray(response.data) ? response.data : [];
    const mappedVideos = payload.map(mapVideo);

    return mappedVideos.filter((video) => {
        return (
            Boolean(video.id) &&
            video.status === "COMPLETED" &&
            Boolean(video.hlsUrl)
        );
    });
};

export const getFeaturedVideo = async () => {
    const videos = await getVideos();
    return videos[0] ?? null;
};

export const getLatestVideos = async () => {
    const videos = await getVideos();
    return [...videos].slice(0, 4);
};

export const getTrendingVideos = async () => {
    const videos = await getVideos();
    return [...videos].sort((a, b) => b.views - a.views).slice(0, 4);
};

export const getVideoById = async (videoId) => {
    const videos = await getVideos();
    const parsedId = Number(videoId);
    return videos.find((video) => Number(video.id) === parsedId) ?? null;
};

export const searchVideos = async (query) => {
    if (!query || !query.trim()) {
        return [];
    }

    const videos = await getVideos();
    const term = query.trim().toLowerCase();
    return videos.filter((video) => {
        return (
            video.title.toLowerCase().includes(term) ||
            video.channel.toLowerCase().includes(term) ||
            video.category.toLowerCase().includes(term) ||
            video.description.toLowerCase().includes(term)
        );
    });
};

export const uploadVideo = async ({ title, description, file }, onUploadProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    const response = await apiClient.post(VIDEO_BASE_PATH, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
            if (!event.total) return;
            const percent = Math.round((event.loaded * 100) / event.total);
            onUploadProgress?.(percent);
        },
    });

    return response.data;
};
