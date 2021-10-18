import React from 'react';
import styled from 'styled-components';
import {MdClear} from 'react-icons/md';

const SearchHeaderBlock = styled.div`
    height: 100%;
    padding-right: 0.5rem;
    align-items: center;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    display: flex;
    justify-content: flex-end;
    background: white;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.08);

    .clearButton{
        font-size: 1.5rem;
        cursor: pointer;
        &:hover{
            color: #adb5bd;
        }
    }
`;



const SearchHeader = ({onCancel,onClearBackUp,onClearTags}) =>{
    const cancelAction = () => {
        onCancel()
        onClearBackUp()
        onClearTags()
    }

    return(
        <SearchHeaderBlock>
            <MdClear className="clearButton" onClick={cancelAction}/>
        </SearchHeaderBlock>
    )
}

export default SearchHeader;