
import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';

//service
import { postsService } from '../services/PostsService';

//react-query
import { useQuery } from '@tanstack/react-query';

const Post = () => {


    const [cover, setCover] = useState("");
    const {id} = useParams();
   
    const queryClient = useQueryClient();

    const {isLoading, data: post, isError, error} = useQuery(
        ['posts', id],
        () => postsService.getSinglePost(id)
    );


    const updatePostMutation = useMutation({
        mutationFn: (post) => postsService.updatePost(post),
        onSuccess: () =>{
            //allows the cache to be udpated after the mutation, and shows the updated data
            queryClient.invalidateQueries(['posts']);  
        }
    })

    //---- NOTE: in order to delete a post use the delete method for json-server and add a new mutation that calls that function
    // then just like the update function, invalidate the query (if you are on the same component) or redirect to the main component using router 
    // (there the refetch will be done automatically)

      
    const updatePost = async(e) => {
        e.preventDefault();
      
        const data = new FormData(e.target);
        let cover64 = "";

        if(cover != ""){
            cover64 = await imageToBase64(cover[0]);
        }else{
            cover64 = data.get("oldcover");
        }

        let updatedPost = {
            id: id,
            name: data.get('title'),
            content: data.get('content'),
            cover: cover64
        }
        
        updatePostMutation.mutate(updatedPost);
    }


    //converts the images into base64 for easy storage on json
    const imageToBase64 = async(element) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onloadend = function() {
                resolve(reader.result)
            }
            reader.onerror = reject;
            reader.readAsDataURL(element);
            
        })    
    }




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


            <div className='update-form-container'>
            <form onSubmit={updatePost}>

                <label htmlFor="title">Post title:</label>
                <input type="text" name="title" id="title" defaultValue={post.name} required  />

                <label htmlFor="content">Post content: </label>
                <textarea name="content" id="content" defaultValue={post.content} required minLength="100"  ></textarea>

                <input type='hidden' name='oldcover' id='hidden' defaultValue={post.cover}  />

                <label htmlFor="cover" className="cover">Cover</label>
                <input type="file" id="cover"  onChange={(e) => setCover(e.target.files)} />

                <input type="submit" value="update post" />
           </form>
            </div>
        </Fragment>
    );
}

export default Post;