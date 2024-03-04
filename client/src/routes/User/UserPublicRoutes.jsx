import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserPublicRoutes = ({ component: Component }) => {
    const user = useSelector(state => state.user.isLoggedIn);

    console.log("&&&&&&&&&",user);
    
    if (user) {
        return <Navigate to="/login" />;
    }
    
    return <Component />;
};

export default UserPublicRoutes;
