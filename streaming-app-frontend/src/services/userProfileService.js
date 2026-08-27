// TODO: Replace these placeholder values with the real Spring Boot endpoints for profile, watch history, and subscriptions.

export const getCurrentUserProfile = async () => ({
    id: 1,
    name: "Aarav Singh",
    email: "aarav.singh@example.com",
    role: "ADMIN",
    joinedDate: "2026-01-15",
    avatar: "AS",
});

export const getWatchHistory = async () => [
    {
        id: 101,
        title: "Final Year Project Demo",
        description: "A sample uploaded demo for the StreamFlow portfolio project.",
        watchedAt: "2026-08-17T18:45:00Z",
        duration: "08:14",
        thumbnail:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 104,
        title: "Cloud Deployment Walkthrough",
        description: "Project walkthrough covering the deployment and media pipeline.",
        watchedAt: "2026-08-16T11:10:00Z",
        duration: "05:46",
        thumbnail:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 106,
        title: "How HLS Streaming Works in Practice",
        description: "Overview of HLS, FFmpeg, and streaming delivery flow.",
        watchedAt: "2026-08-15T09:00:00Z",
        duration: "11:09",
        thumbnail:
            "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80",
    },
];

export const getSubscriptions = async () => [
    {
        id: 1,
        name: "StreamFlow Studio",
        subscribers: "24.5K",
        status: "LIVE",
        avatar: "SF",
    },
    {
        id: 2,
        name: "Code Desk",
        subscribers: "18.2K",
        status: "NEW",
        avatar: "CD",
    },
    {
        id: 3,
        name: "Backend Basics",
        subscribers: "31.9K",
        status: "LIVE",
        avatar: "BB",
    },
];
