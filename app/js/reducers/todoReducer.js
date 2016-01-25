import { combineReducers } from 'redux'
import { ActionTypes, Filters } from 'todoActions'

const { SHOW_ALL } = Filters;

export function todos(state = [], action) {
    switch (action.type) {
        case ActionTypes.ADD_TODO:
            return [
                ...state,
                {
                    id: new Date().valueOf(),
                    description: action.description,
                    completed: false
                }
            ]
        case ActionTypes.COMPLETE_TODO:
        console.log(action);
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    completed: true
                }),
                ...state.slice(action.index + 1)
            ]
        case ActionTypes.DELETE_TODO:
            return [
                ...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ]
        case ActionTypes.DELETE_ALL:
            return []
        default:
            return state
    }
}

export function todoFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case ActionTypes.SET_FILTER:
            return action.filter
            break;
        default:
            return state
    }
}

/*
export default combineReducers({
    //visibilityFilter,
    todos
})
*/
