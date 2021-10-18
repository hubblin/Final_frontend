import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const SearchInputBlock = styled.div`
    display: flex;
    border : 1px solid black;
    border-radius: 4px;
`;

const SInput = styled.input`
    //기본스타일로 초기화
    background:  none;
    outline: none;
    border: none;
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    display: flex;
    flex: 1;
`;

const SButton = styled.button`
    //기본 스타일 초기화
    outline: none;
    border: none;
    background: #868e96;
    color: white;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.2s background ease-in;
    &:hover{
        background: #adb5bd;
    }
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
`;

const StyledButton = styled.button`
    //기본 스타일 초기화
    margin-top: 0.2rem;
    width: 100%;
    outline: none;
    border: none;
    color: white;
    height: 3rem;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    background: ${palette.cyan[5]};
    &:hover{
        background: ${palette.cyan[4]};
    }
`



const Tag = styled.div`
    margin-right: 0.5rem;
    color: ${palette.gray[6]};
    cursor: pointer;
    &:hover{
        opacity: 0.5;
    }
`;

const TagListBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5rem;
`;

//렌더링을 최소화 하기위한 최적화 memo
const TagItem = React.memo(({tag, onRemove}) => <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>)


//렌더링을 최소화 하기위한 최적화 memo
const TagList = React.memo(({tags, onRemove}) => (
    <TagListBlock>
        {tags.map(tag => (
            <TagItem key={tag} tag={tag} onRemove={onRemove}/>
        ))}
    </TagListBlock>
))

const SearchInput = ({ tags, onChangeInput, onSearch}) =>{
    const [input, setInput] = useState('');
    const [localTags, setLocalTags] = useState([]);

    const insertTag = useCallback(
        tag => {
            if(!tag) return; //공백이라면 추가하지 않음
            if(localTags.includes(tag)) return; //이미 존재한다면 추가하지 않음
            const nextTags = [...localTags, tag];
            setLocalTags(nextTags);
            onChangeInput(nextTags);
        },
        [localTags, onChangeInput],
    );

    const onRemove = useCallback(
        tag => {
            const nextTags = localTags.filter(t => t !== tag);
            setLocalTags(nextTags);
            onChangeInput(nextTags);
        },
        [localTags, onChangeInput],
    );

    const onChange = useCallback(e =>{
        setInput(e.target.value);
    },[]
    );

    const onAdd = useCallback(e=>{
        e.preventDefault();
        insertTag(input.trim()); // 앞뒤 공백을 없앤 후 등록
        setInput('');
    },[input, insertTag]);

    //tags 값이 바뀔 때
    useEffect(() => {
        setLocalTags(tags);
    }, [tags]);

    return(
        <div>
            <SearchInputBlock className="SearchInsert" >
                <SInput placeholder="검색 태그를 입력하세요"
                    value={input}
                    onChange={onChange}
                />
                <SButton onClick={onAdd}>
                    추가
                </SButton>
            </SearchInputBlock>
            <TagList tags={localTags} onRemove={onRemove}/>
            <StyledButton onClick={onSearch}>검색하기</StyledButton>
        </div>
    );
}

export default SearchInput;