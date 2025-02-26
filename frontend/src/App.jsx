import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme, Container, Box } from '@mui/material';

// Landing page components
import Navbar from './components/Navbar';
import VideoSection from './components/VideoSection';
import Slider from './components/Slider';
import BoxCategories from './components/BoxCategories';
import Cards from './components/Cards';
import Footer from './components/Footer';

// Visitor components
import PreArrival from './components/visitor/PreArrival';
import VisitorForm from './components/visitor/VisitorForm';
import VisitorRecords from './components/visitor/VisitorRecords';
import WebcamCapture from './components/visitor/WebcamCapture';
import ApprovalHandler from './components/visitor/ApprovalHandler';

// Dashboard components
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import About from './pages/About';

// Mockup Components
import Home from './Mockup/pages/Home';
import Customization from './Mockup/pages/Customization'; // You'll need to create this

// Create a custom Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

// Component for the landing page layout
const LandingPage = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Navbar />
    <Container maxWidth="xl" sx={{ flex: 1, px: 0 }}>
      <VideoSection />
      <Slider />
      <BoxCategories />
      <Cards />
    </Container>
    <Footer />
  </Box>
);

// Layout component for dashboard pages
const DashboardLayout = ({ children }) => (
  <Box sx={{ 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'background.default'
  }}>
    <Navbar />
    <Box sx={{ flex: 1, p: 3 }}>
      {children}
    </Box>
    <Footer />
  </Box>
);

// Layout component for visitor pages
const VisitorLayout = ({ children }) => (
  <Box sx={{ 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'background.default'
  }}>
    <Navbar />
    <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
      {children}
    </Container>
    <Footer />
  </Box>
);

// Layout component for mockup pages (without header/footer for full control)
const MockupLayout = ({ children }) => (
  <Box sx={{ 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'background.default'
  }}>
    {children}
  </Box>
);

// Protected Route component with loading state
const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        Loading...
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Main App component
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          
          {/* Visitor Management routes */}
          <Route path="/visitor-form" element={
            <VisitorLayout>
              <VisitorForm />
            </VisitorLayout>
          } />
          <Route path="/visitor-records" element={
            <VisitorLayout>
              <VisitorRecords />
            </VisitorLayout>
          } />
          <Route path="/webcam-capture" element={
            <VisitorLayout>
              <WebcamCapture />
            </VisitorLayout>
          } />
          <Route path="/approve-visitor/:visitorId" element={
            <VisitorLayout>
              <ApprovalHandler type="approve" />
            </VisitorLayout>
          } />
          <Route path="/reject-visitor/:visitorId" element={
            <VisitorLayout>
              <ApprovalHandler type="reject" />
            </VisitorLayout>
          } />

          {/* Mockup routes */}
          <Route path="/mockup" element={
            <MockupLayout>
              <Home />
            </MockupLayout>
          } />
          <Route path="/mockup/customization/:boxType" element={
            <MockupLayout>
              <Customization />
            </MockupLayout>
          } />

          {/* Protected dashboard routes */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          
          {/* Catch-all route for unknown paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;