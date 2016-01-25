import React from 'react'
import BaseComponent from 'BaseComponent.jsx'
import { Router, Route, Link, browserHistory } from 'react-router'
import classNames from 'classNames'
import { connect } from 'react-redux'
import { routeActions } from 'redux-simple-router'

import utils from 'utils';

let NavSectionItem = ({className, itemName, url}) => (
    <li className={className} data-app={itemName}><Link to={url}>{itemName}</Link></li>
)

class NavSectionList extends BaseComponent {
    constructor (props) {
        super(props);
    }

    _handleLoadApp (e) {
        var appName = $(e.target).attr("data-app");

        this.props._loadApp(appName);
    }

    render () {
        return (
            <ul className="navSectionList">
            {this.props.categoryItemList.map((item, index) => {
                var classes = classNames({
                    "navSectionItem": true,
                    "active": item.url == this.props.currentApp ? true : false
                });
                return (<NavSectionItem className={classes} key={item.title} itemName={item.title} url={this.props.categoryName + "/" + item.url} />)
            })}
            </ul>
        );
    }
}

class NavSection extends BaseComponent {
    render() {
        var category = this.props.category;
        var classes = classNames({
            navSection: true,
            active: this.props.active
        })
        return (
            <div className={classes}>
                <h3 className="navSectionTitle">{category.title}</h3>
                <NavSectionList {...this.props} categoryItemList={category.list} categoryName={category.title.toLowerCase()}  />
            </div>
        )
    }
}

class NavBox extends BaseComponent {
    render () {
        return (
            <div className="navBox">
            {this.props.routeMap.map((item, index) => {
                let isCurrentCategory = (this.props.currentCategory == item.title.toLowerCase());
                var props = {
                    key: item.title,
                    category: item,
                    active: isCurrentCategory
                }

                if (isCurrentCategory) {
                    props.currentApp = this.props.currentApp;
                }

                return (<NavSection {...props} />);
            })}
            </div>
        )
    };
}

 export default class MainApp extends BaseComponent {
    constructor (props) {
        super(props);

        this.state ={
            routeMap: utils.getRouteMap()
        };
    }

    render () {
        const { dispatch } = this.props;

        var location = this.props.location.pathname.split("/");
        var routeProps = {
            routeMap: utils.getRouteMap(),
            currentCategory: location[1],
            currentApp: location[2]
        }

        return (
            <div className="mainBox">
                <NavBox {...routeProps} />
                <div className="contentBox">
                    {React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, {
                            dispatch: dispatch
                        })
                    })}
                </div>
            </div>
        );

    }
}

//export default connect()(MainApp);
