class Info {
    constructor(title, category, details) {
        this.id = (new Date()).getTime();
        this.title = title;
        this.category = category;
        this.details = details;
    }
}

export default Info;