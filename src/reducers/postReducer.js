// reducer = updater
import {SET_LOADING_STATUS, GET_POSTS} from '../actions/actionType';
export const initState = {
    loading: false,
    posts: [],
};

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.status
            }
        default:
            return state;
    }
}

export default postReducer;