import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const visitorService = {
  // Get all visitors
  getAllVisitors: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/visitors`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get visitor by ID
  getVisitorById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/visitors/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new visitor
  createVisitor: async (visitorData) => {
    try {
      const response = await axios.post(`${BASE_URL}/visitors`, visitorData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update visitor status
  updateVisitorStatus: async (id, status) => {
    try {
      const response = await axios.patch(`${BASE_URL}/visitors/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get pre-arrival visitors
  getPreArrivalVisitors: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/visitors/pre-arrival`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Send visitor approval request
  sendApprovalRequest: async (contactNumber, visitorData) => {
    try {
      const response = await axios.post(`${BASE_URL}/visitors/approval-request`, {
        contactNumber,
        visitorData
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};