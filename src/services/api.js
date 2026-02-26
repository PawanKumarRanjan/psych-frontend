import axios from 'axios';

// Get API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Submit assessment data to backend
 * @param {Object} assessmentData - Object containing name, email, and answers
 * @returns {Promise<Object>} Response containing assessment results
 */
export const submitAssessment = async (assessmentData) => {
  try {
    const response = await apiClient.post('/assessments', assessmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to submit assessment' };
  }
};

/**
 * Get assessment by ID
 * @param {String} id - Assessment ID
 * @returns {Promise<Object>} Assessment data
 */
export const getAssessmentById = async (id) => {
  try {
    const response = await apiClient.get(`/assessments/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch assessment' };
  }
};

/**
 * Get all assessments for a specific email
 * @param {String} email - User email
 * @returns {Promise<Object>} List of assessments
 */
export const getAssessmentByEmail = async (email) => {
  try {
    const response = await apiClient.get(`/assessments/email/${email}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch assessments' };
  }
};

/**
 * Get all questions
 * @returns {Promise<Object>} List of all questions sorted by order
 */
export const getAllQuestions = async () => {
  try {
    const response = await apiClient.get('/questions');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch questions' };
  }
};

/**
 * Get questions by category
 * @param {String} category - Category name (analytical, creative, social, leadership)
 * @returns {Promise<Object>} List of questions for the category
 */
export const getQuestionsByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/questions/category/${category}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch questions' };
  }
};

/**
 * Get a single question by ID
 * @param {String} id - Question ID
 * @returns {Promise<Object>} Question data
 */
export const getQuestionById = async (id) => {
  try {
    const response = await apiClient.get(`/questions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch question' };
  }
};

/**
 * Get all career domains
 * @returns {Promise<Object>} List of all career domains
 */
export const getAllCareerDomains = async () => {
  try {
    const response = await apiClient.get('/career-domains');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch career domains' };
  }
};

/**
 * Get a career domain by name
 * @param {String} name - Career domain name (analytical, creative, social, leadership)
 * @returns {Promise<Object>} Career domain data
 */
export const getCareerDomainByName = async (name) => {
  try {
    const response = await apiClient.get(`/career-domains/name/${name}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch career domain' };
  }
};

/**
 * Get a career domain by ID
 * @param {String} id - Career domain ID
 * @returns {Promise<Object>} Career domain data
 */
export const getCareerDomainById = async (id) => {
  try {
    const response = await apiClient.get(`/career-domains/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch career domain' };
  }
};

export default apiClient;
