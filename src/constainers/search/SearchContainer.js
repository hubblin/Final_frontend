import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeInput, backupdraw, input_tags,clear_backup,clear_tags} from '../../modules/search';
import {withRouter} from 'react-router-dom';
import SearchModal from '../../components/search/SearchModal';

const SearchContainer = ({visible, onCancel, history}) => {
    const {tags, drawStore} = useSelector(({search}) => ({
        tags: search.tags,
        drawStore : search.drawStore
    }));

    const dispatch = useDispatch();
    const onChangeInput = useCallback(input => dispatch(changeInput(input)),[
        dispatch
    ])

    const onBackupDraw = useCallback(input => dispatch(backupdraw(input)), [
        dispatch
    ])

    const onInputTags = useCallback(inputs => dispatch(input_tags(inputs)), [
        dispatch
    ])

    const onClearBackUp = useCallback(input => dispatch(clear_backup(input)),[
        dispatch
    ])

    const onClearTags = useCallback(input => dispatch(clear_tags(input)), [
        dispatch
    ])

    //검색 액션 (history로 이동하고, onCancel실행해서 끄기)
    const onSearch = () => {
        history.push(`/?tag=${tags}`);
        onCancel()
    }

    return (
        <SearchModal
            visible={visible}
            title="태그 검색하기"
            description="검색할 내용을 생각나는데로 그림으로 표현해 주세요."
            onCancel={onCancel}
            onChangeInput={onChangeInput}
            onSearch={onSearch}
            tags={tags}
            drawStore={drawStore}
            onBackupDraw={onBackupDraw}
            onInputTags={onInputTags}
            onClearBackUp={onClearBackUp}
            onClearTags={onClearTags}
        />
    );
};

export default withRouter(SearchContainer);