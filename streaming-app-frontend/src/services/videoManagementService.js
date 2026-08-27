// TODO: Replace this placeholder data layer with the real Spring Boot video API once the exact backend endpoints are confirmed.

const currentVideos = [
    {
        id: 101,
        title: "Final Year Project Demo",
        description: "A sample uploaded demo video for the StreamFlow portfolio project.",
        category: "Technology",
        status: "COMPLETED",
        views: 1280,
        thumbnail:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        duration: "08:14",
    },
    {
        id: 102,
        title: "Cloud Deployment Walkthrough",
        description: "Project walkthrough covering deployment and media delivery pipeline.",
        category: "Cloud",
        status: "PROCESSING",
        views: 640,
        thumbnail:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        duration: "05:46",
    },
    {
        id: 103,
        title: "Security and Streaming Overview",
        description: "Short explanation of streaming security and authentication flow.",
        category: "Security",
        status: "UPLOADED",
        views: 930,
        thumbnail:
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80",
        duration: "06:22",
    },
];

export const uploadVideoPlaceholder = async ({ title, description, category, file }, onProgress) => {
    const fakeUploadId = Date.now();

    return new Promise((resolve) => {
        let progress = 0;

        const tick = () => {
            progress += 20;
            onProgress?.(Math.min(progress, 100));

            if (progress >= 100) {
                resolve({
                    id: fakeUploadId,
                    title,
                    description,
                    category,
                    fileName: file?.name || "video.mp4",
                    status: "PROCESSING",
                    views: 0,
                    thumbnail:
                        "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80",
                    duration: "00:00",
                });
                return;
            }

            setTimeout(tick, 350);
        };

        setTimeout(tick, 200);
    });
};

export const getMyVideos = async () => {
    return currentVideos;
};

export const updateVideoStatus = async (videoId, nextStatus) => {
    const target = currentVideos.find((video) => video.id === videoId);
    if (target) {
        target.status = nextStatus;
    }

    return target;
};

export const deleteMyVideo = async (videoId) => {
    const index = currentVideos.findIndex((video) => video.id === videoId);
    if (index >= 0) {
        currentVideos.splice(index, 1);
    }

    return true;
};
