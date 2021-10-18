import React from 'react';
import HeaderContainer from '../constainers/common/HeaderContainer';
import PostListContainer from '../constainers/post/PostListContainer';
import PaginationContainer from '../constainers/posts/PaginationContainer';

const PostListPage = () => {
    return (
        <>
            <HeaderContainer/>
            <PostListContainer/>
            <PaginationContainer/>
        </>
    )
}

export default PostListPage;