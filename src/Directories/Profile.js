import { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import { getUserData } from './Components/FireHandler';

async function getData(userId) {
    try {
        const data_ = await getUserData(userId);
        return data_;
    } catch {
        return;
    }
}

const RealProfile = () => {
    const { userId } = useParams();
    const [ data, setData ] = useState({});

    useEffect(() => {
        async function getId() {
            setData(await getData(userId));
        }
        getId();
    }, [userId]);

    return (
    <>
        <div className="profile-info">
            {data ?
            (data.username ?
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
            </>
            :
            <p>Loading...</p>)
            :
            <p onClick={async () => setData(await getData(userId))}>Error while loading info, click here to try again.</p>}
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