import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

import Loading from './Loading';
import { userCheckTkn } from '../api/user.api';

const ProtectedRoute = (props) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            setIsLoading(true);

            const { response, err } = await userCheckTkn();

            if (err) {
                localStorage.removeItem('tkn');
                navigate('/signin');
            }

            if (response) {
                localStorage.setItem('username', response.username);
                setIsLoading(false);
            }
        };

        const tkn = localStorage.getItem('tkn');

        if (tkn) checkToken();
        else navigate('/signin');
    }, [navigate]);

    return isLoading ? <Loading /> : <Box sx={{ height: '100vh' }}>{props.children}</Box>;
};

export default ProtectedRoute;
