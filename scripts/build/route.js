"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListCategory = function ListCategory(title, list) {
    _classCallCheck(this, ListCategory);

    this.title = title;
    this.list = list;
};

var getRouteMap = function getRouteMap() {
    return [new ListCategory("Profile", []), new ListCategory("Gallery", ["TodoMVC"]), new ListCategory("DailyUI", ["dailyui#001"])];
};