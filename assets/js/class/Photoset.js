
class Gallery {

    constructor(Photos, stat){
        this.photoset = Photos;
        this.stat = stat;
    }
}

class Photos {

    constructor(id, primary, owner, ownername, Photo, page, per_page, perpage, pages, title, total){
        this.id = id;
        this.primary = primary;
        this.owner = owner;
        this.ownername = ownername;
        this.photo = Photo;
        this.page = page;
        this.per_page = per_page;
        this.perpage = perpage;
        this.pages = pages;
        this.title =title;
        this.total = total;

    }
}








