import React, { PropTypes } from 'react';
import BaseComponent from 'BaseComponent.jsx';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classNames';

import { RedditActions, fetchPosts } from 'redditActions.js'
import { GoogleLoader } from 'GoogleLoader.jsx'

let RedditListItem = ({item}) => {
    let hasThumbnail = item.thumbnail.indexOf("/") >= 0;
    let thumbnailClasses;

    if (!hasThumbnail) {
        thumbnailClasses = classNames({
            middleBox: true,
            thumbnail: true,
            default: (item.thumbnail == "default") ? true : false,
            self: (item.thumbnail == "self") ? true: false
        })
    }

    return (
        <li className="redditListItem l-flex l-flex-alignCenter">
            <div className="itemImgBox">
                {(() => {
                    if (hasThumbnail) {
                        return (<img className="middleBox" src={item.thumbnail} />);
                    } else {
                        return (<a className={thumbnailClasses} href={item.url} target="_blank"></a>)
                    }
                })()}
            </div>
            <div className="itemInfoBox l-flex-stretch">
                <h3 className="title" ><a href={item.url} target="_blank">{item.title}</a></h3>
                <h5 style={{marginBottom:5}}>submmited by <span className="author c-btnLink c-btnLink-reddit"><a href={"https://www.reddit.com/user/" + item.author} target="_blank">{item.author}</a></span></h5>
                <h5><a href={"https://www.reddit.com" + item.permalink} className="comments c-btnLink c-btnLink-reddit" target="_blank">{item.num_comments} comments</a></h5>
            </div>
        </li>
    )
}

let RedditList = ({posts}) => {
    if (posts.isFetching) {
        return (<div>Fetching</div>)
    }
    if (posts.didInvalidate == true) {
        return (<div>Invalidate Subreddit</div>)
    }
    if (posts.items.length == 0) {
        return (<div>list is null</div>)
    } else {
        return (
            <ul className="redditList">
            {posts.items.map((item, index) => <RedditListItem key={item.id} item={item} />)}
            </ul>
        )
    }
}

let RedditSearchInput = ({isFetching, keyDownHandler}) => {
    let className = classNames({
        redditSearchInputBox: true,
        isFetching: isFetching,
        "l-flex": true,
        "l-flex-alignCenter": true
    })

    return (
        <div className={className}>
            <input className="redditSearchInput" onKeyDown={keyDownHandler} type="text" placeholder="What topics do you want to search?" disabled={isFetching} />
            <div className="loaderBox">
                <GoogleLoader size="30" />
            </div>
        </div>
    )
}

class RedditApp extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind("searchInputKeyDownHandler")
    }

    searchInputKeyDownHandler(e) {
        if (e.keyCode != 13) {
            return
        }

        let subreddit = e.target.value;
        this.props.dispatch(RedditActions.selectSubreddit(subreddit));
        this.props.dispatch(fetchPosts(subreddit));
    }

    render() {
        console.log(this.props);
        let posts;
        if (this.props.selectedSubreddit != undefined) {
            posts = this.props.postsBySubreddit[this.props.selectedSubreddit] || [];
        } else { posts = [] }

        return (
            <div className="redditBox">
                <RedditSearchInput isFetching={posts.isFetching || false} keyDownHandler={this.searchInputKeyDownHandler} />
                {(() => {
                    if (posts.items != undefined && !posts.isFetching && !posts.didInvalidate) {
                        return (<RedditList posts={posts} />)
                    }
                })()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedSubreddit: state.selectedSubreddit,
        postsBySubreddit: state.postsBySubreddit
    }
}

export default connect(mapStateToProps)(RedditApp);
