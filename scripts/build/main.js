"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseComponent = (function (_React$Component) {
    _inherits(BaseComponent, _React$Component);

    function BaseComponent() {
        _classCallCheck(this, BaseComponent);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(BaseComponent).apply(this, arguments));
    }

    _createClass(BaseComponent, [{
        key: "_bind",
        value: function _bind() {
            var _this2 = this;

            for (var _len = arguments.length, methods = Array(_len), _key = 0; _key < _len; _key++) {
                methods[_key] = arguments[_key];
            }

            methods.forEach(function (method) {
                return _this2[method] = _this2[method].bind(_this2);
            });
        }
    }]);

    return BaseComponent;
})(React.Component);

var EmptyApp = function EmptyApp() {
    return React.createElement("div", null);
};

var NavSectionItem = function NavSectionItem(_ref) {
    var className = _ref.className;
    var itemName = _ref.itemName;
    var _loadApp = _ref._loadApp;
    return React.createElement(
        "li",
        { className: className, "data-app": itemName, onClick: _loadApp },
        itemName
    );
};

var NavSectionList = (function (_BaseComponent) {
    _inherits(NavSectionList, _BaseComponent);

    function NavSectionList(props) {
        _classCallCheck(this, NavSectionList);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(NavSectionList).call(this, props));

        _this3._bind('_handleLoadApp');
        return _this3;
    }

    _createClass(NavSectionList, [{
        key: "_handleLoadApp",
        value: function _handleLoadApp(e) {
            var appName = $(e.target).attr("data-app");

            this.props._loadApp(appName);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            return React.createElement(
                "ul",
                { className: "navSectionList" },
                this.props.data.map(function (item, index) {
                    var classes = classNames({
                        "navSectionItem": true,
                        "active": item == _this4.props.currentApp ? true : false
                    });
                    return React.createElement(NavSectionItem, { className: classes, key: item, itemName: item, _loadApp: _this4._handleLoadApp });
                })
            );
        }
    }]);

    return NavSectionList;
})(BaseComponent);

var NavSection = (function (_BaseComponent2) {
    _inherits(NavSection, _BaseComponent2);

    function NavSection(props) {
        _classCallCheck(this, NavSection);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(NavSection).call(this, props));
    }

    _createClass(NavSection, [{
        key: "render",
        value: function render() {
            var data = this.props.data;

            var classes = classNames({
                "navSection": true,
                "active": data.list.contains(this.props.currentApp) ? true : false
            });

            return React.createElement(
                "div",
                { className: classes },
                React.createElement(
                    "div",
                    { className: "navSectionTitle" },
                    this.props.data.title
                ),
                React.createElement(NavSectionList, _extends({}, this.props, { data: this.props.data.list }))
            );
        }
    }]);

    return NavSection;
})(BaseComponent);

var NavBox = (function (_BaseComponent3) {
    _inherits(NavBox, _BaseComponent3);

    function NavBox(props) {
        _classCallCheck(this, NavBox);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(NavBox).call(this, props));
    }

    _createClass(NavBox, [{
        key: "render",
        value: function render() {
            var _this7 = this;

            return React.createElement(
                "div",
                { className: "navBox" },
                this.props.data.map(function (item, index) {
                    var props = {
                        key: item.title,
                        data: item,
                        currentApp: _this7.props.currentApp,
                        _loadApp: _this7.props._loadApp
                    };
                    return React.createElement(NavSection, props);
                })
            );
        }
    }]);

    return NavBox;
})(BaseComponent);

;

var ContentBox = (function (_BaseComponent4) {
    _inherits(ContentBox, _BaseComponent4);

    function ContentBox(props) {
        _classCallCheck(this, ContentBox);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ContentBox).call(this, props));
    }

    _createClass(ContentBox, [{
        key: "render",
        value: function render() {
            var Component = window[this.props.appName] || EmptyApp;

            return React.createElement(
                "div",
                { className: "contentBox" },
                React.createElement(Component, null)
            );
        }
    }]);

    return ContentBox;
})(BaseComponent);

;

var MainBox = (function (_BaseComponent5) {
    _inherits(MainBox, _BaseComponent5);

    function MainBox(props) {
        _classCallCheck(this, MainBox);

        var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(MainBox).call(this, props));

        _this9.state = {
            currentApp: "TodoMVC"
        };
        _this9._bind('_loadApp');
        return _this9;
    }

    _createClass(MainBox, [{
        key: "_loadApp",
        value: function _loadApp(name) {
            this.setState({ currentApp: name });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "mainBox" },
                React.createElement(NavBox, { data: getRouteMap(), currentApp: this.state.currentApp, _loadApp: this._loadApp }),
                React.createElement(ContentBox, { appName: this.state.currentApp })
            );
        }
    }]);

    return MainBox;
})(BaseComponent);

ReactDOM.render(React.createElement(MainBox, null), document.getElementById("content"));