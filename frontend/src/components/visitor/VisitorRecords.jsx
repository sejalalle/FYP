import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Search,
  FilterList,
  Visibility,
  Print,
  Close,
  CalendarToday,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components (unchanged)
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
  },
}));

const StyledSearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
}));

const VisitorRecords = () => {
  const [visitors, setVisitors] = useState([]); // Initialize as an empty array
  const [selectedVisitor, setSelectedVisitor] = useState(null); // State for selected visitor details
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]); // State for date filter
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [showFilters, setShowFilters] = useState(false); // State for showing filters

  // Fetch visitor records from the API
  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/visitors'); // Replace with your API endpoint
        // Check if the response is HTML (e.g., a 404 page)
        if (typeof response.data === 'string' && response.data.startsWith('<!doctype html>')) {
          console.error('Received HTML instead of JSON. Check the API endpoint.');
          setVisitors([]); // Fallback to an empty array
        } else if (Array.isArray(response.data)) {
          setVisitors(response.data);
        } else {
          console.error('API response is not an array:', response.data);
          setVisitors([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error('Error fetching visitors:', error);
        setVisitors([]); // Fallback to an empty array in case of error
      }
    };

    fetchVisitors();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle viewing visitor details
  const handleViewVisitor = (visitor) => {
    setSelectedVisitor(visitor);
  };

  // Handle closing the visitor details dialog
  const handleClose = () => {
    setSelectedVisitor(null);
  };

  // Handle printing visitor pass
  const handlePrintPass = (visitor) => {
    console.log('Printing pass for:', visitor.name);
    // Implement printing logic here (e.g., using window.print() or a library)
  };

  // Filter visitors based on search term
  const filteredVisitors = (visitors || []).filter((visitor) => {
    const matchesSearch =
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Get status color for the chip
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'active':
        return 'primary';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" color="primary">
          Visitor Records
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <StyledSearchField
            size="small"
            placeholder="Search visitors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type="date"
            size="small"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </Box>
      </Box>

      {/* Table Section */}
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Time In</TableCell>
              <TableCell>Time Out</TableCell>
              <TableCell>Purpose</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVisitors.map((visitor) => (
              <TableRow key={visitor._id}> {/* Use _id from MongoDB */}
                <TableCell>{visitor.name}</TableCell>
                <TableCell>{visitor.timeIn}</TableCell>
                <TableCell>{visitor.timeOut}</TableCell>
                <TableCell>{visitor.purpose}</TableCell>
                <TableCell>{visitor.contactPerson}</TableCell>
                <TableCell>
                  <Chip
                    label={visitor.status}
                    color={getStatusColor(visitor.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleViewVisitor(visitor)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handlePrintPass(visitor)}>
                    <Print />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Visitor Details Dialog */}
      <Dialog open={Boolean(selectedVisitor)} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Visitor Details
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedVisitor && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                {selectedVisitor.photo ? (
                  <img
                    src={selectedVisitor.photo}
                    alt="Visitor"
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: '200px',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography color="textSecondary">No Photo</Typography>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={8}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Name
                        </Typography>
                        <Typography variant="body1">{selectedVisitor.name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Visitor Type
                        </Typography>
                        <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                          {selectedVisitor.visitorType}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Time In
                        </Typography>
                        <Typography variant="body1">{selectedVisitor.timeIn}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Time Out
                        </Typography>
                        <Typography variant="body1">{selectedVisitor.timeOut}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Purpose
                        </Typography>
                        <Typography variant="body1">{selectedVisitor.purpose}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Contact Person
                        </Typography>
                        <Typography variant="body1">{selectedVisitor.contactPerson}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Location
                        </Typography>
                        <Typography variant="body1">{selectedVisitor.location}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            variant="contained"
            startIcon={<Print />}
            onClick={() => handlePrintPass(selectedVisitor)}
          >
            Print Pass
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VisitorRecords;