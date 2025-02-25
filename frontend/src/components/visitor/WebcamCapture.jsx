// src/components/visitor/WebcamCapture.jsx
import React, { useRef, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Typography
} from '@mui/material';
import {
  Camera as CameraIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const WebcamCapture = ({ onPhotoCapture, initialImage = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(initialImage);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start webcam
  const startWebcam = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (err) {
      console.error('Error accessing webcam:', err);
      alert('Unable to access webcam. Please make sure you have granted camera permissions.');
    }
  }, []);

  // Stop webcam
  const stopWebcam = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  // Handle dialog open
  const handleOpen = () => {
    setIsOpen(true);
    startWebcam();
  };

  // Handle dialog close
  const handleClose = () => {
    setIsOpen(false);
    stopWebcam();
  };

  // Take photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to base64
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      
      // Call parent callback
      if (onPhotoCapture) {
        onPhotoCapture(imageData);
      }
      
      handleClose();
    }
  };

  // Retake photo
  const handleRetake = () => {
    setCapturedImage(null);
    if (onPhotoCapture) {
      onPhotoCapture(null);
    }
    handleOpen();
  };

  return (
    <Box>
      {/* Preview Area */}
      <Paper 
        sx={{ 
          p: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography variant="h6">Visitor Photo</Typography>
        
        {capturedImage ? (
          <>
            <Box
              component="img"
              src={capturedImage}
              alt="Captured"
              sx={{
                width: 240,
                height: 240,
                objectFit: 'cover',
                borderRadius: 1
              }}
            />
            <Button
              startIcon={<RefreshIcon />}
              variant="contained"
              color="secondary"
              onClick={handleRetake}
            >
              Retake Photo
            </Button>
          </>
        ) : (
          <Button
            startIcon={<CameraIcon />}
            variant="contained"
            onClick={handleOpen}
          >
            Take Photo
          </Button>
        )}
      </Paper>

      {/* Webcam Dialog */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            Take Photo
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '400px',
              display: 'flex',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
            <canvas
              ref={canvasRef}
              style={{ display: 'none' }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={capturePhoto}
            variant="contained"
            startIcon={<CameraIcon />}
          >
            Capture
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WebcamCapture;

// Example usage in VisitorForm:
/*
import WebcamCapture from './WebcamCapture';

const VisitorForm = () => {
  const handlePhotoCapture = (imageData) => {
    console.log('Captured photo:', imageData);
    // Handle the captured photo data
  };

  return (
    <WebcamCapture
      onPhotoCapture={handlePhotoCapture}
      initialImage={null} // Optional: Pass existing photo
    />
  );
};
*/