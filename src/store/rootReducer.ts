//Import all reducers here and import this file in the main store
import todoReducer from './slices/User/todo.slice'
import cacheReducer from './slices/cacheAPI/cache.slice'
const rootReducer = {
    todos: todoReducer,
    cache: cacheReducer
};

export default rootReducer;
