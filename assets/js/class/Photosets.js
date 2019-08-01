
class Album {

    constructor(Photosets, stat){
        this.photosets = Photosets;
        this.stat = stat;
    }
}

class Photosets {

    constructor(page, pages, perpage, total, Photoset){
        this.page = page;
        this.pages = pages;
        this.perpage = perpage;
        this.total = total;
        this.photoset = Photoset;
    }

}

class Photoset {
    constructor(id, primary, secret, server, farm, photos, videos, title, description, needs_interstitial, 
        visibility_can_see_set, count_views, count_comments, can_comment, date_create, date_update){
            this.id =  id;
            this.primary =  primary;
            this.secret = secret;
            this.server = server;
            this.farm = farm;
            this.photos = photos;
            this.videos = videos;
            this.title = Title;
            this.description = Description;
            this.needs_interstitial = number;
            this.visibility_can_see_set = visibility_can_see_set;
            this.count_views = count_views;
            this.count_comments = count_comments;
            this.can_comment = can_comment;
            this.date_create = date_create;
            this.date_update = date_update;
        }

}

class Title {
    constructor(_content){
        this._content = _content;
    }
}

class Description {
    constructor(_content){
        this._content = _content;
    }
}







