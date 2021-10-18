import React from 'react';
import SearchModal from './SearchModal';


const AskSearchModal = ({visible, onConfirm ,onCancel}) =>{
    return(
        <SearchModal
            visible={visible}
            title="검색하기"
            description="검색할 내용을 그림으로 표현해 주세요."
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    )
}

export default AskSearchModal;