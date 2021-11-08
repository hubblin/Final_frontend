import React, {memo} from 'react';
import { useSelector } from 'react-redux';
import HeaderContainer from '../constainers/common/HeaderContainer';
import PostListContainer from '../constainers/post/PostListContainer';
import PaginationContainer from '../constainers/posts/PaginationContainer';
import Loading from '../components/common/Loading';

const PostListPage = memo(() => {
    
    let loading = useSelector((state) => state.loading['post/LIST_POSTS']);
    
    return (
        <>
            {loading && <Loading/>}
            <HeaderContainer/>
            <PostListContainer/>
            <PaginationContainer/>
        </>
    )
})

export default PostListPage;