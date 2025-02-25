import React, { useState , useRef} from 'react';
import { 
  Box,
  Stack,
  TextField,
  Button,
  FormControl,
  Paper,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Fade,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import {
  PersonOutline,
  AccessTime,
  PhotoCamera,
  Save,
  ArrowForward,
  ArrowBack,
  Print,
  Download,
  Badge
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { jsPDF } from 'jspdf';
import emailjs from '@emailjs/browser';
import WebcamCapture from './WebcamCapture';
import VisitorPass from './VisitorPass1'; // Ensure this is the correct import
import html2canvas from 'html2canvas'; // Import html2canvas

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  height: '100%',
  background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    '&:hover fieldset': {
      borderColor: theme.palette.grey[900],
    },
  },
}));

const VisitorForm = ({ onSubmitSuccess }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailStatus, setEmailStatus] = useState('');
  
  const [visitorData, setVisitorData] = useState({
    srNo: '',
    date: new Date().toISOString().split('T')[0],
    timeIn: '',
    timeOut: '',
    visitorName: '',
    visitorAddress: '',
    purpose: '',
    contactPerson: '',
    contactEmail: '',
    visitorType: '',
    idNumber: '',
    photo: '',
    department: '',
    phone: ''
  });

  const steps = ['Personal Details', 'Visit Information', 'Photo & Declaration', 'Preview'];

  const validateForm = () => {
    const newErrors = {};
    
    if (!visitorData.visitorName) newErrors.visitorName = 'Name is required';
    if (!visitorData.visitorAddress) newErrors.visitorAddress = 'Address is required';
    if (!visitorData.phone) newErrors.phone = 'Phone number is required';
    if (!visitorData.idNumber) newErrors.idNumber = 'ID number is required';
    if (!visitorData.purpose) newErrors.purpose = 'Purpose is required';
    if (!visitorData.contactPerson) newErrors.contactPerson = 'Contact person is required';
    if (!visitorData.contactEmail) {
      newErrors.contactEmail = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(visitorData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email address';
    }
    if (!visitorData.department) newErrors.department = 'Department is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendApprovalEmail = async () => {
    try {
      const templateParams = {
        to_email: visitorData.contactEmail,
        to_name: visitorData.contactPerson,
        visitor_name: visitorData.visitorName,
        visitor_purpose: visitorData.purpose,
        visit_date: visitorData.date,
        visit_time: visitorData.timeIn,
        department: visitorData.department,
        approve_link: `${window.location.origin}/approve-visitor/${visitorData.srNo}`,
        reject_link: `${window.location.origin}/reject-visitor/${visitorData.srNo}`
      };

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      return response.status === 200; // Check if the response status is OK
    } catch (error) {
      console.error('Error sending email:', error);
      return false; // Return false if there was an error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const dataToSend = {
      name: visitorData.visitorName,
      contactEmail: visitorData.contactEmail,
      phone: visitorData.phone,
      purpose: visitorData.purpose,
      photo: visitorData.photo,
      checkInTime: visitorData.timeIn,
      checkOutTime: visitorData.timeOut,
      department: visitorData.department,
      contactPerson: visitorData.contactPerson,
      idNumber: visitorData.idNumber,
    };

    try {
      const response = await fetch('http://localhost:5000/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Failed to save visitor data');
      }

      const data = await response.json();
      console.log('Visitor saved:', data);

      const emailSent = await sendApprovalEmail();
      if (emailSent) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onSubmitSuccess();
        }, 3000);
      }
    } catch (error) {
      console.error('Error saving visitor data:', error);
      setEmailStatus('error');
    }
  };
  const visitorPassRef = useRef(null);


  const handlePrint = async () => {
    const printContent = visitorPassRef.current;
    if (!printContent) {
      console.error("Visitor Pass element not found!");
      return;
    }

    try {
      // Add print-specific styles
      const style = document.createElement('style');
      style.textContent = `
        @media print {
          body * {
            visibility: hidden;
          }
          #visitor-pass-content, #visitor-pass-content * {
            visibility: visible;
          }
          #visitor-pass-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `;
      document.head.appendChild(style);

      window.print();

      // Clean up
      document.head.removeChild(style);
    } catch (error) {
      console.error('Error printing:', error);
    }
  };

  const handleDownloadPDF = async () => {
    const printContent = visitorPassRef.current;
    if (!printContent) {
      console.error("Visitor Pass element not found!");
      return;
    }

    try {
      const canvas = await html2canvas(printContent, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff',
        windowWidth: printContent.scrollWidth,
        windowHeight: printContent.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure all images are loaded
          const images = clonedDoc.getElementsByTagName('img');
          for (let img of images) {
            img.crossOrigin = "anonymous";
          }
        }
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20; // 10mm margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Center the image
      const x = 10;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight, '', 'FAST');
      pdf.save(`visitor-pass-${visitorData.visitorName || 'unnamed'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVisitorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoCapture = (imageData) => {
    setVisitorData((prevData) => ({
      ...prevData,
      photo: imageData
    }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 2 && !validateForm()) return;
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ color: 'grey.900' }} gutterBottom>
              <PersonOutline sx={{ mr: 1, verticalAlign: 'middle' }} />
              Personal Information
            </Typography>
            <StyledTextField
              fullWidth
              label="Visitor Name"
              name="visitorName"
              value={visitorData.visitorName}
              onChange={handleInputChange}
              error={!!errors.visitorName}
              helperText={errors.visitorName}
            />
            <StyledTextField
              fullWidth
              label="Address"
              name="visitorAddress"
              value={visitorData.visitorAddress}
              onChange={handleInputChange}
              multiline
              rows={3}
              placeholder="Enter complete address"
              error={!!errors.visitorAddress}
              helperText={errors.visitorAddress}
            />
            <StyledTextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={visitorData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <FormControl fullWidth>
              <InputLabel>Visitor Type</InputLabel>
              <Select
                value={visitorData.visitorType}
                name="visitorType"
                onChange={handleInputChange}
                label="Visitor Type"
              >
                <MenuItem value="supplier">Supplier</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <StyledTextField
              fullWidth
              label="ID Number"
              name="idNumber"
              value={visitorData.idNumber}
              onChange={handleInputChange}
              placeholder="Enter ID number"
              error={!!errors.idNumber}
              helperText={errors.idNumber}
            />
            <StyledTextField
              fullWidth
              label="Department"
              name="department"
              value={visitorData.department}
              onChange={handleInputChange}
              error={!!errors.department}
              helperText={errors.department}
              required
            />
            <StyledTextField
              fullWidth
              label="Contact Person"
              name="contactPerson"
              value={visitorData.contactPerson}
              onChange={handleInputChange}
              error={!!errors.contactPerson}
              helperText={errors.contactPerson}
              required
            />
            <StyledTextField
              fullWidth
              label="Contact Person Email"
              name="contactEmail"
              type="email"
              value={visitorData.contactEmail}
              onChange={handleInputChange}
              error={!!errors.contactEmail}
              helperText={errors.contactEmail}
              required
            />
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ color: 'grey.900' }} gutterBottom>
              <AccessTime sx={{ mr: 1, verticalAlign: 'middle' }} />
              Visit Details
            </Typography>
            <StyledTextField
              fullWidth
              type="date"
              label="Date"
              name="date"
              value={visitorData.date}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <StyledTextField
                fullWidth
                type="time"
                label="Time In"
                name="timeIn"
                value={visitorData.timeIn}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
              <StyledTextField
                fullWidth
                type="time"
                label="Time Out"
                name="timeOut"
                value={visitorData.timeOut}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <StyledTextField
              fullWidth
              label="Purpose of Visit"
              name="purpose"
              value={visitorData.purpose}
              onChange={handleInputChange}
              placeholder="Enter visit purpose"
              error={!!errors.purpose}
              helperText={errors.purpose}
            />
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ color: 'grey.900' }} gutterBottom>
              <PhotoCamera sx={{ mr: 1, verticalAlign: 'middle' }} />
              Visitor Photo & Declaration
            </Typography>
            <WebcamCapture onPhotoCapture={handlePhotoCapture} />
            <Typography variant="body2" color="textSecondary">
              By submitting this form, I agree to the company's policies and terms regarding visitor entry and behavior.
            </Typography>
          </Stack>
        );

        case 3:
          return (
            <Container>
              <Typography variant="h6" sx={{ color: 'grey.900' }} gutterBottom>
                <Badge sx={{ mr: 1, verticalAlign: 'middle' }} />
                Preview
              </Typography>
              <div id="visitor-pass-content">
                <VisitorPass visitorData={visitorData} printRef={visitorPassRef} />
              </div>
              <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 3 }} className="no-print">
                <Button 
                  variant="contained" 
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                  sx={{ bgcolor: 'grey.900', '&:hover': { bgcolor: 'grey.800' } }}
                >
                  Back
                </Button>
                <Button 
                  variant="contained"
                  onClick={handleSubmit}
                  startIcon={<Save />}
                  disabled={emailStatus === 'sending'}
                  sx={{ bgcolor: 'grey.900', '&:hover': { bgcolor: 'grey.800' } }}
                >
                  {emailStatus === 'sending' ? 'Sending...' : 'Save & Send Approval'}
                </Button>
                <Button 
                  variant="contained"
                  onClick={handlePrint}
                  startIcon={<Print />}
                  sx={{ bgcolor: 'grey.900', '&:hover': { bgcolor: 'grey.800' } }}
                >
                  Print
                </Button>
                <Button 
                  variant="contained"
                  onClick={handleDownloadPDF}
                  startIcon={<Download />}
                  sx={{ bgcolor: 'grey.900', '&:hover': { bgcolor: 'grey.800' } }}
                >
                  Download PDF
                </Button>
              </Stack>
            </Container>
          );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <StyledPaper>
        <Typography variant="h4" gutterBottom sx={{ color: 'grey.900' }}>
          Visitor Entry Form
        </Typography>
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel
          sx={{
            '& .MuiStepLabel-root .Mui-active': { color: 'grey.900' },
            '& .MuiStepLabel-root .Mui-completed': { color: 'grey.700' },
            mb: 4
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
          {renderStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="contained"
              startIcon={<ArrowBack />}
              sx={{ bgcolor: 'grey.900', '&:hover': { bgcolor: 'grey.800' } }}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                type="submit"
                endIcon={<Save />}
                disabled={emailStatus === 'sending'}
                sx={{ bgcolor: 'grey.900', '&:hover': { bgcolor: 'grey.800' } }}
              >
                {emailStatus === 'sending' ? 'Sending...' : 'Submit'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowForward />}
                sx={{ bgcolor: 'grey.900', '&:hover': { bgcolor: 'grey.800' } }}
              >
                Next
              </Button>
            )}
          </Box>
        </form>
      </StyledPaper>
      <Fade in={showSuccess}>
        <Alert severity="success" sx={{ mt: 2 }}>
          Visitor information saved and approval email sent successfully!
        </Alert>
      </Fade>
    </Container>
  );
}

export default VisitorForm;