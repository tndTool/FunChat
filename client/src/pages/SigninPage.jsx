import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Box, Button, Stack, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link, useNavigate } from 'react-router-dom';

import { userSignIn } from '../api/user.api';

const SigninPage = () => {
    const navigate = useNavigate();

    const [isRequest, setIsRequest] = useState(false);

    const form = useFormik({
        initialValues: {
            username: '',
            password: '',
        },

        validationSchema: yup.object({
            username: yup.string().required('Username is required').min(6).max(20),
            password: yup.string().required('Password is required').min(6).max(20),
        }),

        onSubmit: (values) => onSignIn(values),
    });

    const onSignIn = async ({ username, password }) => {
        if (isRequest) return;
        setIsRequest(true);

        const { response, err } = await userSignIn({
            username,
            password,
        });

        setIsRequest(false);

        if (response) {
            localStorage.setItem('tkn', response.token);
            navigate('/');
        }

        if (err) toast.error(err.message);
    };

    return (
        <Box component="form" noValidate onSubmit={form.handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    placeholder="Username"
                    name="username"
                    value={form.values.username}
                    onChange={form.handleChange}
                    error={form.touched.username && form.errors.username != undefined}
                    helperText={form.touched.username && form.errors.username}
                />

                <TextField
                    fullWidth
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={form.values.password}
                    onChange={form.handleChange}
                    error={form.touched.password && form.errors.password != undefined}
                    helperText={form.touched.password && form.errors.password}
                />

                <LoadingButton type="submit" size="large" variant="contained" loading={isRequest} color="success">
                    sign in
                </LoadingButton>

                <Button component={Link} to="/signup" size="small">
                    sign up
                </Button>
            </Stack>
        </Box>
    );
};

export default SigninPage;