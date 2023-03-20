import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Container, Typography } from '@mui/material';

import Header from './Header';
import Loading from './Loading';
import { userCheckTkn } from '../api/user.api';

const AuthRoute = (props) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            setIsLoading(true);

            const { response, err } = await userCheckTkn();

            if (err) {
                localStorage.removeItem('tkn');
                setIsLoading(false);
            }

            if (response) return navigate('/');
        };

        const tkn = localStorage.getItem('tkn');

        if (tkn) checkToken();
        else setIsLoading(false);
    }, [navigate]);

    return isLoading ? (
        <Loading />
    ) : (
        <Container
            component="main"
            maxWidth="md"
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Header>
                <Typography variant="h5" fontWeight="600" color="#ccffff">
                    Fun Chat AI
                </Typography>
            </Header>

            <Box width="100%">{props.children}</Box>

            <Box padding={2}>
                <Typography variant="caption" color="primary">
                    <a
                        rel="noreferrer"
                        href="https://github.com/tndTool/FunChat.git"
                        target="_blank"
                        style={{ textDecoration: 'none', color: '#ccffff' }}
                    >
                        © 2023 Copyright: Nguyễn Đức Toàn
                    </a>
                </Typography>
            </Box>
        </Container>
    );
};

export default AuthRoute;
