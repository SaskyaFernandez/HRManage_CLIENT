// import { useRecoilValue } from 'recoil';
// import { tokenAtom } from '../../atoms/token.atom.js';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ element }) => {

//     const token = useRecoilValue(tokenAtom);
//     console.log('Here', token);

//     if (!token) {
//         return <Navigate to='/login' />;
//     }

//     return element;
// }

// export default PrivateRoute;