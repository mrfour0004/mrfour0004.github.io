import fetch from 'isomorphic-fetch'

export const RedditActionTypes = {
    SELECT_SUBREDDIT: 'SELECT_SUBREDDIT',
    INVALIDATE_SUBREDDIT: 'INVALIDATE_SUBREDDIT',
    REQUEST_POSTS: 'REQUEST_POSTS',
    RECEIVE_POSTS: 'RECEIVE_POSTS'
}

export const RedditActions = {
    selectSubreddit: function(subreddit) {
        return {
            type: RedditActionTypes.SELECT_SUBREDDIT,
            subreddit
        }
    },
    invalidateSubreddit: function(subreddit) {
        return {
            type: RedditActionTypes.INVALIDATE_SUBREDDIT,
            subreddit
        }
    },
    requestPosts: function(subreddit) {
        return {
            type: RedditActionTypes.REQUEST_POSTS,
            subreddit
        }
    },
    receivePosts: function(subreddit, json) {
        return {
            type: RedditActionTypes.RECEIVE_POSTS,
            subreddit,
            posts: json.data.children.map(child => child.data),
            receivedAt: Date.now()
        }
    }
}

export function fetchPosts(subreddit) {
    return function(dispatch) {
        dispatch(RedditActions.requestPosts(subreddit))
        return fetch('http://www.reddit.com/r/' + subreddit + '.json')
        .then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json()
        })
        .then(json => dispatch(RedditActions.receivePosts(subreddit, json)))
        .catch(error => {
            dispatch(RedditActions.invalidateSubreddit(subreddit));
            console.log(error);
        })
    }
}
