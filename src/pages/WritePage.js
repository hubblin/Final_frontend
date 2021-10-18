import React from 'react';

import EditorContainer from '../constainers/write/EditorContainer';
import TagBoxContainer from '../constainers/write/TagBoxContainer';
import WriteActionsButtonsContainer from '../constainers/write/WriteActionButtonsContainer';
import Responsive from '../components/common/Responsive';


const WritePage = () =>{
    return (
        <Responsive>
            <EditorContainer/>
            <TagBoxContainer/>
            <WriteActionsButtonsContainer/>
        </Responsive>
    )
}

export default WritePage;