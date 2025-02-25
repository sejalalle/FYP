import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Container, CircularProgress, Button } from '@mui/material';

const ApprovalHandler = ({ type }) => {
  const { visitorId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResponse = async () => {
      try {
        await updateVisitorStatus(visitorId, type);
        setStatus('success');
      } catch (error) {
        console.error('Error updating visitor status:', error);
        setStatus('error');
      } finally {
        setLoading(false);
      }
    };

    handleResponse();

    return () => {
      setStatus('processing');
    };
  }, [visitorId, type, navigate]);

  const updateVisitorStatus = async (visitorId, type) => {
    const response = await fetch(`/api/visitor/${visitorId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: type === 'approve' ? 'approved' : 'rejected' }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update visitor status');
    }

    return response.json();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {loading && <CircularProgress />}
      {status === 'success' && (
        <Alert severity="success">
          Visitor has been {type === 'approve' ? 'approved' : 'rejected'} successfully!
        </Alert>
      )}
      {status === 'error' && (
        <Alert severity="error">
          An error occurred while updating the visitor status. Please try again.
        </Alert>
      )}
      {status !== 'processing' && (
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Go Back
        </Button>
      )}
    </Container>
  );
};

export default ApprovalHandler;