import React from 'react';
import { Card, CardContent, Box, Typography, Divider, styled } from '@mui/material';

const StyledCard = styled(Card)({
  width: '800px',
  margin: '20px auto',
  backgroundColor: '#fff',
  '@media print': {
    width: '100%',
    boxShadow: 'none',
    margin: 0,
    padding: 0,
  }
});

const InfoRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0',
  borderBottom: '1px solid #e0e0e0',
  '& .label': {
    fontWeight: 600,
    minWidth: '180px',
    color: '#4b5563',
  },
  '@media print': {
    pageBreakInside: 'avoid',
    breakInside: 'avoid',
  }
});

const formatTime = (time) => {
  if (!time) return "N/A";
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

const VisitorPass = ({ visitorData, printRef }) => {
  return (
    <StyledCard ref={printRef}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 1,
          '@media print': {
            breakInside: 'avoid'
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img 
              src="/images/pks.png" 
              alt="Parksons Packaging"
              style={{ height: '40px' }}
              crossOrigin="anonymous"
            />
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              '@media print': {
                fontSize: '24px'
              }
            }}>
              VISITOR PASS
            </Typography>
          </Box>
          <Box sx={{ 
            width: '128px', 
            height: '160px', 
            border: 2,
            borderColor: 'grey.900',
            overflow: 'hidden',
            '@media print': {
              border: '2px solid black'
            }
          }}>
            {visitorData.photo && (
              <img 
                src={visitorData.photo} 
                alt="Visitor"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover'
                }}
                crossOrigin="anonymous"
              />
            )}
          </Box>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: 4,
          '@media print': {
            gap: 2
          }
        }}>
          <Box>
            <InfoRow>
              <span className="label">Pass No:</span>
              <span>{visitorData.srNo || 'TBD'}</span>
            </InfoRow>
            <InfoRow>
              <span className="label">Date:</span>
              <span>{new Date(visitorData.date).toLocaleDateString()}</span>
            </InfoRow>
            <InfoRow>
              <span className="label">Name:</span>
              <span>{visitorData.visitorName}</span>
            </InfoRow>
            <InfoRow>
              <span className="label">Phone:</span>
              <span>{visitorData.phone}</span>
            </InfoRow>
            <InfoRow>
              <span className="label">ID Type & Number:</span>
              <span>{visitorData.idType?.toUpperCase()} - {visitorData.idNumber}</span>
            </InfoRow>
          </Box>
          <Box>
            <InfoRow>
              <span className="label">Visitor Type:</span>
              <span>{visitorData.visitorType}</span>
            </InfoRow>
            <InfoRow>
              <span className="label">Purpose:</span>
              <span>{visitorData.purpose}</span>
            </InfoRow>
            <InfoRow>
              <span className="label">Department:</span>
              <span>{visitorData.department}</span>
            </InfoRow>
            <InfoRow>
              <span className="label">Contact Person:</span>
              <span>{visitorData.contactPerson}</span>
            </InfoRow>
            <InfoRow>
              <span className="label">Address:</span>
              <span style={{ wordBreak: 'break-word' }}>{visitorData.visitorAddress}</span>
            </InfoRow>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: 4, 
          mb: 3,
          '@media print': {
            gap: 2
          }
        }}>
          <InfoRow>
            <span className="label">Time In:</span>
            <span>{formatTime(visitorData.timeIn)}</span>
          </InfoRow>
          <InfoRow>
            <span className="label">Time Out:</span>
            <span>{formatTime(visitorData.timeOut)}</span>
          </InfoRow>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          mt: 4,
          '@media print': {
            pageBreakInside: 'avoid'
          }
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Divider sx={{ width: '128px', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Visitor's Signature
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Divider sx={{ width: '128px', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Security's Signature
            </Typography>
          </Box>
        </Box>

        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            textAlign: 'center', 
            mt: 3,
            '@media print': {
              marginTop: '16px',
              fontSize: '10px'
            }
          }}
          color="text.secondary"
        >
          This pass is valid only for the date and time mentioned above.
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default VisitorPass;