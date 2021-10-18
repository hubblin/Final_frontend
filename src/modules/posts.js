import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import {takeLatest} from 'redux-saga/effects';

const [
    LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
] = createRequestActionTypes('post/LIST_POSTS');

export const listPosts = createAction(
    LIST_POSTS,
    ({tag, username, page}) => ({tag, username, page}),
)

const listPostSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
export function* postsSaga(){
    yield takeLatest(LIST_POSTS, listPostSaga);
}

const initialState = {
    post: null,
    error: null,
    lastPage: 1,
};



const post = handleActions(
    {
        [LIST_POSTS_SUCCESS]: (state, {payload: post, meta: response}) => ({
            ...state,
            post,
            lastPage: parseInt(response.headers['last-page'],10), //문자열을 숫자로 변환
        }),
        [LIST_POSTS_FAILURE] : (state, {payload: error}) => ({
            ...state,
            error,
        }),

    },
    initialState,
);

export default post;