import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserData } from '../../App';
import useLocalStorage from '../LocalStorage/LocalStorage';

const PrivateRoute = ({children, ...rest}) => {
    const [loginData, setLoginData] = useLocalStorage('user_data', {})
    const [signedInUser, setSignedInUser] = useContext(UserData)

    return (
        <Route
            {...rest}
            render={({ location }) =>
            signedInUser.uid || loginData.uid ? (
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/signIn",
                    state: { from: location }
                    }}
                />
                )
            }
        />
    );
};

export default PrivateRoute;