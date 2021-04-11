import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts } from './Components/FireHandler';

async function getData (userId) {
    try {
        const data_ = await getPosts(userId);
        return data_;
    } catch {
        return;
    }
}

const Posts = () => {
    const { userId } = useParams();
    const [posts, setPosts] = useState({});

    useEffect(() => {
        const servePosts = async () => {
            setPosts(await getData(userId));
        }
        servePosts();
    }, [userId]);

    return (
    <>
        {posts ?
        (posts.length ?
            posts.map((post, i) => {
                return <p key={i}>{JSON.stringify(post)}</p>
            })
        :
        <p>Loading...</p>)
        :
        <p onClick={async () => setPosts(await getData(userId))}>Error while loading posts, click here to try again</p>}
    </>);
}

export default Posts;