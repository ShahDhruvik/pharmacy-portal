//Import all reducers here and import this file in the main store
import todoReducer from './slices/User/todo.slice'
const rootReducer = {
    todos: todoReducer,
};

export default rootReducer;
