import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import AuthRoute from './components/AuthRoute';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const theme = createTheme({
        palette: { mode: 'dark' },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastContainer
                position="bottom-left"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnHover
            />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/signin"
                        element={
                            <AuthRoute>
                                <SigninPage />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <AuthRoute>
                                <SignupPage />
                            </AuthRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
