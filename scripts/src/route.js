
class ListCategory {
    constructor(title, list) {
        this.title = title;
        this.list = list;
    }
}

let getRouteMap = () => {
    return [
        new ListCategory("Profile", []),
        new ListCategory("Gallery", ["TodoMVC"]),
        new ListCategory("DailyUI", ["dailyui#001"])
    ]
}
