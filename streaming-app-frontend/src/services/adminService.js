// TODO: Replace these placeholder values with real Spring Boot admin endpoints once final API contracts are shared.

const adminStats = {
    totalVideos: 128,
    totalUsers: 56,
    totalViews: 482390,
    processingVideos: 7,
};

const recentUploads = [
    {
        id: 901,
        title: "System Design for Streaming Apps",
        uploader: "Aarav Singh",
        uploadedAt: "2026-08-18T09:30:00Z",
        status: "PROCESSING",
    },
    {
        id: 902,
        title: "CloudFront Delivery Setup",
        uploader: "Riya Patel",
        uploadedAt: "2026-08-17T16:12:00Z",
        status: "COMPLETED",
    },
    {
        id: 903,
        title: "JWT Authentication Frontend Integration",
        uploader: "Vikram Rao",
        uploadedAt: "2026-08-17T11:08:00Z",
        status: "UPLOADED",
    },
    {
        id: 904,
        title: "Beginner Guide to HLS Playback",
        uploader: "Neha Sharma",
        uploadedAt: "2026-08-16T18:40:00Z",
        status: "FAILED",
    },
];

const users = [
    {
        id: 1,
        name: "Aarav Singh",
        email: "aarav.singh@example.com",
        role: "SUPER_ADMIN",
        status: "ENABLED",
    },
    {
        id: 2,
        name: "Riya Patel",
        email: "riya.patel@example.com",
        role: "ADMIN",
        status: "ENABLED",
    },
    {
        id: 3,
        name: "Vikram Rao",
        email: "vikram.rao@example.com",
        role: "USER",
        status: "ENABLED",
    },
    {
        id: 4,
        name: "Neha Sharma",
        email: "neha.sharma@example.com",
        role: "USER",
        status: "DISABLED",
    },
    {
        id: 5,
        name: "Kunal Mehta",
        email: "kunal.mehta@example.com",
        role: "USER",
        status: "ENABLED",
    },
];

export const getAdminStats = async () => {
    return adminStats;
};

export const getRecentUploads = async () => {
    return recentUploads;
};

export const getAllUsers = async () => {
    return users;
};

export const makeAdmin = async (userId) => {
    const target = users.find((user) => user.id === userId);
    if (target) target.role = "ADMIN";
    return target;
};

export const removeAdmin = async (userId) => {
    const target = users.find((user) => user.id === userId);
    if (target) target.role = "USER";
    return target;
};

export const disableUser = async (userId) => {
    const target = users.find((user) => user.id === userId);
    if (target) target.status = "DISABLED";
    return target;
};

export const enableUser = async (userId) => {
    const target = users.find((user) => user.id === userId);
    if (target) target.status = "ENABLED";
    return target;
};

export const deleteUser = async (userId) => {
    const index = users.findIndex((user) => user.id === userId);
    if (index >= 0) {
        users.splice(index, 1);
    }

    return true;
};
