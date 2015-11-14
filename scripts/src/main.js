class BaseComponent extends React.Component {
    _bind(...methods) {
        methods.forEach( (method) => this[method] = this[method].bind(this));
    }
}

let EmptyApp = () => (
    <div></div>
)

let NavSectionItem = ({className, itemName, _loadApp}) => (
    <li className={className} data-app={itemName} onClick={_loadApp}>{itemName}</li>
)

class NavSectionList extends BaseComponent {
    constructor (props) {
        super(props);
    }

    _handleLoadApp = (e) => {
        var appName = $(e.target).attr("data-app");

        this.props._loadApp(appName);
    }

    render () {
        return (
            <ul className="navSectionList">
            {this.props.data.map((item, index) => {
                var classes = classNames({
                    "navSectionItem": true,
                    "active": (item == this.props.currentApp ? true : false )
                });
                return (<NavSectionItem className={classes} key={item} itemName={item} _loadApp={this._handleLoadApp} />)
            })}
            </ul>
        );
    }
}

class NavSection extends BaseComponent {
    constructor (props) {
        super(props);
    }

    render() {
        var data = this.props.data;

        var classes = classNames({
            "navSection": true,
            "active": (data.list.contains(this.props.currentApp) ? true : false )
        });

        return (
            <div className={classes}>
                <div className="navSectionTitle">{this.props.data.title}</div>
                <NavSectionList {...this.props} data={this.props.data.list}  />
            </div>
        );
    }
}

class NavBox extends BaseComponent {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="navBox">
            {this.props.data.map((item, index) => {
                var props = {
                    key: item.title,
                    data: item,
                    currentApp: this.props.currentApp,
                    _loadApp: this.props._loadApp
                }
                return (<NavSection {...props} />);
            })}
            </div>
        );
    }
};

class ContentBox extends BaseComponent {
    constructor (props) {
        super(props);
    }

    render (){
        let Component = window[this.props.appName] || EmptyApp;

        return (
            <div className="contentBox">
                <Component />
            </div>
        );
    }
};

class MainBox extends BaseComponent  {
    constructor (props) {
        super(props);
        this.state = {
            currentApp: "TodoMVC"
        };
    }

    _loadApp = (name) => {
        this.setState({currentApp: name});
    }

    render () {
        return (
            <div className="mainBox">
                <NavBox data={getRouteMap()} currentApp={this.state.currentApp} _loadApp={this._loadApp} />
                <ContentBox appName={this.state.currentApp} />
            </div>
        );
    }
}

ReactDOM.render(
    <MainBox />,
    document.getElementById("content")
);
