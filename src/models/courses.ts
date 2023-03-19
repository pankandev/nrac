export interface SnippetThumbnail {
    url: string;
    width: number;
    height: number;
}

export interface PlaylistSnippet {
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    thumbnails: {
        default: SnippetThumbnail,
        medium?: SnippetThumbnail,
        high?: SnippetThumbnail,
        standard?: SnippetThumbnail,
        maxres: SnippetThumbnail,
    },
    channelTitle: string,
    localized: {
        title: string,
        description: string,
    }
}

export interface PlaylistItemSnippet {
    channelId: string;
    channelTitle: string;
    description: string;
    playlistId: string;
    position: number;
    publishedAt: string;
    resourceId: {
        videoId: string;
        kind: string;
    };
    thumbnails: {
        default: SnippetThumbnail;
        maxres: SnippetThumbnail;
        high?: SnippetThumbnail;
        medium?: SnippetThumbnail;
        standard?: SnippetThumbnail;
    };
    title: string;
    videoOwnerChannelId: string;
    videoOwnerChannelTitle: string;
}

export interface Course {
    playlistId: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    snippet: PlaylistSnippet;
}

export interface CourseItem {
    title: string;
    description: string;
    videoId: string;
    thumbnailUrl: string;
    durationSeconds: number;
    snippet: PlaylistItemSnippet;
    order: number;
}

export interface CourseItemProgress {
    videoId: string;
    leftAtSeconds: number;
    completed: boolean;
}

export interface Note {
    body: string;
    author: string;
    playlistId: string;
    videoId: string;
}
