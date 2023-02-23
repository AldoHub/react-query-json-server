/**
 * Service that connects the fake db with the rest of the application
 * run it using "npm run fake-db"
 */

let api_uri = "http://localhost:3001";


//gets all posts
const getPosts = async() => {
    const response = await fetch(`${api_uri}/posts`);
    const posts = await response.json();
    return posts;
}

//saves the json format to the fake db
const createPost = async(post) => {

    const options = {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }

    let c =  await fetch(`${api_uri}/posts`, options);
    return await c.json();

}

//returns a single post using the id provided
const getSinglePost = async(postId) => {
    const response = await fetch(`${api_uri}/posts/${postId}`);
    const post = await response.json();
    return post;
}


const updatePost = async(post) => {
    const options = {
        method: "put",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }

    const response = await fetch(`${api_uri}/posts/${post.id}`, options);
    return await response.json();
}

//export the functions
export const postsService = {
    getPosts,
    createPost,
    getSinglePost,
    updatePost,
}

