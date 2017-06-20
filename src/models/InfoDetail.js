class InfoDetail {
    constructor(name, content) {
        this.id = (new Date()).getTime();
        this.name = name;
        this.content = content;
    }
}

export default InfoDetail;