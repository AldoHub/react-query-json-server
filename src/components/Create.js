
import React, { Fragment, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

//react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';

//service
import { postsService } from '../services/PostsService';

const Create = () => {

    const [cover, setCover] = useState("");
    const [isBusy, setIsBusy] = useState(false);    

    const queryClient = useQueryClient();

    const addPostMutation = useMutation({
        mutationFn: (post) => postsService.createPost(post),
        onSuccess: () =>{
            
            //do whatever after the mutation has ended
            setIsBusy(false);
            //NOTE: If we want to see the updated values in this component, after the create function, we will need to invalidate the query
            
            //invalidate the query, reset the cache
            //NOTE: this is an overkill in this case, will not work
            queryClient.invalidateQueries(['posts']);
            
        }
    })


    const addPost = async(e) => {
        e.preventDefault();
        setIsBusy(true);

        const data = new FormData(e.target);
        let cover64 = "";
        
        //make the cover into base64
        cover64 = await imageToBase64(cover[0]);

        let post = {
            id: uuidv4(),
            name: data.get('title'),
            content: data.get('content'),
            cover: cover64,
          
        }

        addPostMutation.mutate(post);

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



    let createForm;
    if(isBusy){
        createForm = (
            <div className="loaderContainer">
                <p>Request is being processed</p>
                <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div> 

        )
    }else{
        createForm = (
           <form onSubmit={addPost}>
               <p>Create the new post</p>

                <label htmlFor="title">Post title:</label>
                <input type="text" name="title" id="title" required  />

                <label htmlFor="content">Post content: </label>
                <textarea name="content" id="content" required minLength="100"  ></textarea>


                <label htmlFor="cover" className="cover">Cover</label>
                <input type="file" id="cover" required onChange={(e) => setCover(e.target.files)} />

                <input type="submit" value="create post" />
           </form>
       ) 
    }

    return (
        <>
          {createForm}
        </>
    );
}

export default Create;