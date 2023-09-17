//Import all reducers here and import this file in the main store
import userReducer from '../store/slices/User/user.slice'
const rootReducer = {
    user: userReducer,
};

export default rootReducer;
