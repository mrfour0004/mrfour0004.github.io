export const ActionTypes = {
    ADD_TODO: 'TODO_ADD',
    COMPLETE_TODO: 'TODO_COMPLETE',
    DELETE_TODO: 'TODO_DELETE',
    DELETE_ALL: 'TODO_DELETE_ALL',
    SET_FILTER: 'TODO_SET_FILTER'
}

export const Filters = {
    SHOW_ALL: 'all',
    SHOW_COMPLETED: 'completed',
    SHOW_ACTIVE: 'active'
}

export const Actions = {
    addTodo: function (description) {
        return { type: ActionTypes.ADD_TODO, description}
    },
    completeTodo: function (index) {
        return { type: ActionTypes.COMPLETE_TODO, index}
    },
    deleteTodo: function (index) {
        return { type: ActionTypes.DELETE_TODO, index}
    },
    deleteAll: function () {
        return { type: ActionTypes.DELETE_ALL }
    },
    setFilter: function (filter) {
        return { type: ActionTypes.SET_FILTER, filter }
    }
}
