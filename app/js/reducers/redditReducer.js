import { combineReducers } from 'redux'
import { RedditActionTypes } from 'redditActions'

export function selectedSubreddit(state = 'reactjs', action) {
    switch (action.type) {
    case RedditActionTypes.SELECT_SUBREDDIT:
        return action.subreddit;
    default:
        return state;
    }
}

function posts(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
    case RedditActionTypes.INVALIDATE_SUBREDDIT:
        return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: true
        })
    case RedditActionTypes.REQUEST_POSTS:
        return Object.assign({}, state, {
            isFetching: true,
            didInvalidate: false
        })
    case RedditActionTypes.RECEIVE_POSTS:
        return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: false,
            items: action.posts,
            lastUpdated: action.receivedAt
        })
    default:
        return state
    }
}

export function postsBySubreddit(state = {}, action) {
    switch (action.type) {
        case RedditActionTypes.INVALIDATE_SUBREDDIT:
        case RedditActionTypes.RECEIVE_POSTS:
        case RedditActionTypes.REQUEST_POSTS:
            let nextState = {}
            nextState[action.subreddit] = posts(state[action.subreddit], action);
            return Object.assign({}, state, nextState);
            /* the above codes is equal to the following:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
            })
            */
        default:
            return state
    }
}

/*
const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit
})
*/
