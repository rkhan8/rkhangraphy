

     class Title {
        _content: string;
    }

     class Description {
        _content: string;
    }

     class Photoset {
        id: string;
        primary: string;
        secret: string;
        server: string;
        farm: number;
        photos: number;
        videos: number;
        title: Title;
        description: Description;
        needs_interstitial: number;
        visibility_can_see_set: number;
        count_views: string;
        count_comments: string;
        can_comment: number;
        date_create: string;
        date_update: string;
    }

     class Photosets {
        page: number;
        pages: number;
        perpage: number;
        total: number;
        photoset: Photoset[];
    }

     class RootObject {
        photosets: Photosets;
        stat: string;
    }



