import React from 'react';

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props)
        this._bind('_compareProps');
    }

    _bind(...methods) {
        methods.forEach( (method) => this[method] = this[method].bind(this));
    }

    _compareProps(nextProps, ...props) {
        var shouldUpdate = false;
        props.forEach( (prop) => {
            if (JSON.stringify(this.props[prop]) !== JSON.stringify(nextProps[prop])) {
                shouldUpdate = true; return false;
            }
        });
        return shouldUpdate;
    }
}
