import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';

const CHANGE_INPUT = 'search/CHAGE_INPUT'; //인풋 변경
const INPUT_TAGS = 'search/INPUT_TAGS'; //배열로 들어오면 처리할 부분
const CLEAR_TAGS = 'search/CLEAR_TAGS';//태그 배열 비우기

const BACK_UP = 'search/BACK_UP';//그림 그린거 백업
const CLEAR_BACK_UP = 'search/CLEAR_BACK_UP';//백업 배열 비우기

export const changeInput = createAction(
    CHANGE_INPUT,
    input => input
)

export const backupdraw = createAction(
    BACK_UP,
    input => input
)

export const input_tags = createAction(
    INPUT_TAGS,
    inputs => inputs
)

export const clear_backup = createAction(
    CLEAR_BACK_UP,
    input => input
)

export const clear_tags = createAction(
    CLEAR_TAGS,
    input => input
)

//초기값 지정
const initialState = {
    tags: [],
    drawStore: []
};

export default handleActions({
    [CHANGE_INPUT]: (state, {payload: input}) => 
        produce(state, draft => {
            draft.tags = input;
    }),
    [BACK_UP] : (state, {payload: input}) => 
        produce(state, draft => {
            draft.drawStore = input
    }),
    [INPUT_TAGS] : (state, {payload: inputs}) => 
        produce(state, draft => {
            Array.prototype.push.apply(draft.tags, inputs);
    }),
    [CLEAR_BACK_UP] : (state, {payload: input}) => 
        produce(state, draft => {
            draft.drawStore = [];
    }),
    [CLEAR_TAGS] : (state, {payload: input}) => 
        produce(state, draft => {
            draft.tags = [];
    })
},initialState)