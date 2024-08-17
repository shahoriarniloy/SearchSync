import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';


const PrivateRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();



    if(loading){
        return <span className="loading loading-bars loading-lg "></span>
    }
    if(!user){
        return <Navigate to='/login' state={{from:location}} replace></Navigate>
    }
    
    return (
        <div>
           {children}
        </div>
    );
};

export default PrivateRoutes;

PrivateRoutes.propTypes ={
    children: PropTypes.node
}