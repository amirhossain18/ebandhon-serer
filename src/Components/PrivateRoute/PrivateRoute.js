import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import useLocalStorage from '../LocalStorage/LocalStorage';

const PrivateRoute = ({children, ...rest}) => {
    const [loginData, setLoginData] = useLocalStorage('user_data', {})

    return (
        <Route
            {...rest}
            render={({ location }) =>
            loginData.uid ? (
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