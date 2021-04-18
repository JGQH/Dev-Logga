import { useEffect } from 'react';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import { getUserData, getUserPosts } from './Components/FireHandler';
import { useAsync } from './Libraries/Hooks';

const RealProfile = () => {
    const { userId } = useParams();
    const [ data, dState, dReload ] = useAsync(() => getUserData(userId));
    const [ posts, pState, pReload ] = useAsync(() => getUserPosts(userId));

    useEffect(() => {
        dReload();
        pReload();
    }, [userId]);

    return (
    <>
        <div className="profile-info">
            {dState === "LOADING" && <p>Loading User Data...</p>}
            {dState === "ERROR" && <p onClick={dReload}>Error while loading data, click here to try again</p>}
            {dState === "FINISHED" &&
            <>
                <h1>{data.username}</h1>
                <div className="description">
                    {data.description}
                </div>
                {Object.keys(data.networking).length > 0 && 
                <div className="networking">
                    <h3>Networks:</h3>
                    {Object.keys(data.networking).map((net, i) => {
                        const url = data.networking[net];
                        return <p key={i}>{net}: {url}</p>
                    })}
                </div>}
                <div className="following">
                    Following: {data.following.length}
                </div>
            </>}
        </div>
        <div className="profile-posts">
            {pState === "LOADING" && <p>Loading Posts...</p>}
            {pState === "ERROR" && <p onClick={pReload}>Error while loading posts, click here to try again.</p>}
            {pState === "FINISHED" && posts.map((post, i) => {
                return <p key={i}>{post.content}</p>
            })}
        </div>
    </>);
}

const Profile = () => {
    const match = useRouteMatch();

    return (
    <Switch>
        <Route path={`${match.path}/:userId`}>
            <RealProfile />
        </Route>
        <Route path={match.path}>
            <p>Introduce a User ID, like "{`${match.path}/{User ID}`}"</p>
        </Route>
    </Switch>);
}

export default Profile;