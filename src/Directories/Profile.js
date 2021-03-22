import { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import { getUserData } from './Components/FireHandler';

const RealProfile = () => {
    const { userId } = useParams();
    const [ data, setData ] = useState({});

    useEffect(() => {
        const getData = async () => {
            try {
                const data_ = await getUserData(userId);
                setData(data_);
            } catch {
                setData(null);
            }
        }
        getData();
    }, [userId]);

    return (
    <>
        {data ?
        (data.username ?
        JSON.stringify(data)
        :
        <p>Loading...</p>)
        :
        <p>Error while loading info</p>}
    </>);
}

const Profile = () => {
    const match = useRouteMatch();

    return (
    <>
        <Switch>
            <Route path={`${match.path}/:userId`}>
                <RealProfile />
            </Route>
            <Route path={match.path}>
                <p>Introduce a User ID, like "{`${match.path}/{User ID}`}"</p>
            </Route>
        </Switch>
    </>);
}

export default Profile;