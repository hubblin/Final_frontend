import React from 'react';
import styled from 'styled-components';

import SearchInput from './SearchInput';
import SearchDraw from './SearchDraw';
import SearchOptions from './SearchOptions';
import SearchHeader from './SearchHeader';



const Fullscreen = styled.div`
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SearchModalBlock = styled.div`
    background: white;
    height: 90%;
    border-radius: 4px;
    box-shadow: 0px 0px 8px rgba(0,0,0,0.125);
    h2{
        margin-top: 0;
        margin-bottom: 1rem;
    }
    p{
        maring-bottom: 3rem;
    }
    .searchContents{
        overflow-y: auto;
        height: 97%;
        padding: 1.5rem;
    }
    .searchHeader{
        height: 3%;
    }
`;




const SearchModal = ({
    title,
    description,
    onCancel,
    visible,
    onChangeInput,
    onSearch,
    tags,
    drawStore,
    onBackupDraw,
    onInputTags,
    onClearBackUp,
    onClearTags
}) =>{
    if(!visible) return null;




    return(
        <Fullscreen>
            <SearchModalBlock>
                <div className="searchHeader">
                    <SearchHeader onClearBackUp={onClearBackUp} onCancel={onCancel} onClearTags={onClearTags}/>
                </div>
                <div className="searchContents">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <div>
                        <SearchDraw tags={tags} onInputTags={onInputTags} drawStore={drawStore} onBackupDraw={onBackupDraw} onClearBackUp={onClearBackUp}/>
                    </div>
                    <div>
                        <SearchOptions tags={tags} onChangeInput={onChangeInput}/>
                    </div>
                    <div>
                        <SearchInput tags={tags} onChangeInput={onChangeInput} onSearch={onSearch}/>
                    </div>

                </div>
            </SearchModalBlock>
        </Fullscreen>

    )
}

export default SearchModal;