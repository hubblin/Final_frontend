import React, {useState} from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import {Link} from 'react-router-dom';
import palette from '../../lib/styles/palette';
import { MdSearch } from "react-icons/md";


import SearchContainer from '../../constainers/search/SearchContainer';

const HeaderBlock = styled.div`
    position: fixed;
    width:100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.08);
    z-index: 100;
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
    height: 4rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content : space-between; /* 자식 엘리먼트 사이의 여백을 최대로 설정 */
    .logo {
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
    }
    .right{
        display: flex;
        align-items: center;
    }

    .logo_search_container{
        display: flex;
    }

    .search {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 2rem;
        &:hover{
            color: ${palette.gray[8]};

        }
    }

`;


/**
 * 헤더가 fixed로 되어 있기 때문에 페이지의 콘텐츠가 4rem 아래에 나타나도록 해 주는 컴포넌트
 */
const Spacer = styled.div`
    height: 4rem;
`

const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;
`;

const Header = ({user, onLogout}) =>{
    const [modal, setModal] = useState(false);
    const onSearchButtonClick = () => {
        setModal(true);
    };
    const onCancel = () => {
        setModal(false);
    }



    return(
        <>
            <HeaderBlock>
                <Wrapper>
                    <div className="logo_search_container">
                        <Link to="/" className="logo">
                            곰팡이핀머핀
                        </Link>
                        <div className="search" onClick={onSearchButtonClick}>
                            <MdSearch />
                        </div>
                        
                    </div>
                    
                    {user ? (
                        <div className="right">
                            <UserInfo>{user.username}</UserInfo>
                            <Button onClick={onLogout}>로그아웃</Button>
                        </div>
                    ):(
                        <div className="right">
                            <Button to="/login">로그인</Button>
                        </div>
                    )}

                </Wrapper>
            </HeaderBlock>
            <Spacer/>
            <SearchContainer
                visible={modal}
                onCancel={onCancel}
            />

        </>
    )
}

export default Header;