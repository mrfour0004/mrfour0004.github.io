import React from 'react';
import BaseComponent from 'BaseComponent.jsx';
import classNames from 'classNames';

class PhaseBox extends BaseComponent {
    constructor(props) {
        super(props)
        this._bind('_handleClick', '_classes');
    }

    _classes (classes) {
        console.log(this.props);

        return classNames (classes, {
            signPhaseBox: true,
            current: (this.props.phase == this.props.alias) ? true : false
        })
    }

    _handleClick (alias) {
        //var alias = $(e.target).attr("data-phase");
        console.log(this.props);
        this.props.phaseHandler(alias);
    }
}

let IconBtn = ({data, btnClass, _handleClick}) => {
    console.log(data);
    var classes = classNames({
        "c-icon": true
    }, btnClass);

    let IconDesc = ({desc}) => {
        console.log(data);
        if (desc != undefined)
            return (<span>{desc}</span>)
        else
            return (<span></span>);
    }

    return (
        <div className="u-btn-box" data-phase={data.alias} onClick={_handleClick}>
            <span className={classes}></span>
            <IconDesc desc={data.desc} />
        </div>
    );
}

let SignInput = ({title, type}) => {
    return (
        <div className="signInputBox">
            <input type={type} className="signInput" required />
            <label className="signInputLabel">{title}</label>
        </div>
    )
}

class SignNavBox extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind('_back');
    }

    _back (e) {
        //console.log($(e.target).attr("data-alias"));
    }

    render () {
        var classes = classNames({
            signNavBox: true
        });

        return (
            <div className={classes}>
                <IconBtn data={{alias: this.props.backAlias, desc: this.props.backAliasTitle}} btnClass="c-icon-back" _handleClick={this.props.handleClick} />
                <h3 className="navTitle">{this.props.title}</h3>
                <IconBtn data={{alias: "LandingBox"}} btnClass="c-icon-cross" _handleClick={() => this.props.handleClick("LandingBox")} />
            </div>
        );
    }
 }

class LandingBox extends PhaseBox {
    constructor (props) {
        super(props);
    }

    render () {
        var classes = this._classes({
            landingBox: true,
        });
        /*
            1. Photo for Profile or App
            2. Inputs
        */
        return (
            <div className={classes}>
                <div className="signLogoBox">
                    <div className="signLogo"></div>
                </div>
                <h1 className="title">Daily UI #001</h1>
                <p className="subTitle">"Life is short, but it's long enough to ruin any man who wants to be ruined." -- Josh Billing</p>
                <div className="actionBox l-flex-between">
                    <button className="c-btn c-btn-signIn" onClick={() => this._handleClick("SignInBox")}><p>Sign In</p></button>
                    <button className="c-btn c-btn-signUp" onClick={() => this._handleClick("SignUpBox")}><p>Sign Up</p></button>
                </div>
            </div>
        )
    }
}

class SignUpBox extends PhaseBox {
    constructor (props) {
        super(props);
    }

    render () {
        /*
            -> NavBar
                -> Back Button
                -> Title
            -> Form
                -> username
                -> email
                -> password, check password
            -> Submit Button
            ->Social Login
                -> Facebook
                -> Twitter
        */
        var classes = this._classes({
            signUpBox: true
        });
        var props = {
            title: "Sign Up",
            backAlias: "SignInBox",
            backAliasTitle: "Sign In",
            handleClick: this._handleClick
        }
        return (
            <div className={classes}>
                <SignNavBox {...props} />
                <SignInput title="Username" type="text" />
                <SignInput title="email" type="text" />
                <SignInput title="Password" type="password" />
            </div>
        )
    }
}

class SignInBox extends PhaseBox {
    constructor (props) {
        super(props);
    }

    render () {
        /*
            -> NavBar
                -> Back Button
                -> Title
            -> Form
            -> Submit Button
        */
        var classes = this._classes({
            signInBox: true
        });

        var props = {
            title: "Sign In",
            backAlias: "SignUpBox",
            backAliasTitle: "Sign Up",
            handleClick: this._handleClick
        }

        return (
            <div className={classes}>
                <SignNavBox {...props} />
            </div>
        )
    }
}

class MsgBox extends PhaseBox {
    constructor (props) {
        super(props);
    }

    render () {
        var classes = this._classes({
            signUpBox: true
        });
        return (
            <div className={classes}></div>
        )
    }
}

export default class DailyUI001 extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            phase: "SignUpBox"
        };

        this._bind("_handleChangePhase");
    }

    _handleChangePhase(phase) {
        console.log(phase);
        this.setState({phase: phase});
    }

    render() {
        return(
            <div className="dailyui001Box">
                <LandingBox alias="LandingBox" phaseHandler={this._handleChangePhase} {...this.state} />
                <SignInBox alias="SignInBox" phaseHandler={this._handleChangePhase} {...this.state} />
                <SignUpBox alias="SignUpBox" phaseHandler={this._handleChangePhase} {...this.state} />
                <MsgBox alias="MsgBox" {...this.state} />
            </div>
        )
    }
}

/*
SignUpBox
    -> Phase 1: Choose "Sign Up" or "Sign In"
    -> Phase 2: Form
    -> Phase 3: Result Message
*/
