
import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//service
import { postsService } from '../services/PostsService';

//react-query
import { useQuery } from '@tanstack/react-query';

const Post = () => {

    const {id} = useParams();
   
    const {isLoading, data: post, isError, error} = useQuery(
        ['posts', id],
        () => postsService.getSinglePost(id)
    );


    //--- TODO: add update mutation    

    //show loading/error 
    if(isLoading) {
        return <div>Loading posts, please wait...</div>;
    }else if(isError){
        return <div>Error: {error}</div>
    }
    
    return (
        <Fragment>
            <div className='post-container' >
                <div className='left'>
                    <img src={post.cover} />
                </div>
                <div className='right'>
                    <h1>{post.name}</h1>
                    <div>
                        {post.content}
                    </div>
                </div>
               
                
            </div>
        </Fragment>
    );
}

export default Post;