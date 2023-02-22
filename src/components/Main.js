
import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//service
import { postsService } from '../services/PostsService';

//react-query
import { useQuery } from '@tanstack/react-query';

const Main = () => {
    /**
     * Since we are on a nother component when adding new posts
     * when coming back to this main component, the refetch will be done by react query
     *
     *
     *
     * NOTE: in the case we are on the same component we will not see the updated values
     * unless we invalidate the query for the posts, then it will do a refetch
     */

    const {isLoading, data: posts, isError, error} = useQuery(
        ['posts'],
        () => postsService.getPosts()
    );


    //show loading/error 
    if(isLoading) {
     return <div>Loading posts, please wait...</div>;
    }else if(isError){
     return <div>Error: {error}</div>
    }

    return (
        <Fragment>
            <div className='posts-container'>
              {posts.map(post => {
                return(
                    <div className='post' key={post.id}>
                        <Link to={"post/" + post.id}>
                            <div className="cover" style={{backgroundImage: "url(" + post.cover + ")" }}></div>
                        </Link>
                        <p>{post.name}</p>

                    </div>
                );
              })}
            </div>
        </Fragment>
    );
}

export default Main;