class ListCategory {
    constructor(title, list) {
        this.title = title;
        this.list = list;
    }
}

class ListItem {
    constructor(title, url) {
        this.title = title;
        this.url = url;
    }
}

export default class utils {
    static getRouteMap () {
        return [
            new ListCategory("Profile", []),
            new ListCategory("Gallery", [
                new ListItem("TodoMVC", "todomvc"),
                new ListItem("TodoRedux", "todoredux")
            ])/*,
            new ListCategory("DailyUI", [
                new ListItem("DailyUI001", "day001")
            ])*/
        ]
    }
}
