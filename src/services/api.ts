import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. AUTOMATIC TOKEN ATTACHMENT (Interceptor)
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// 2. API FUNCTIONS
export const getArticles = async () => {
  const response = await api.get('/articles/');
  return response.data;
};

export const getArticleBySlug = async (slug: string) => {
  const response = await api.get(`/articles/${slug}`);
  return response.data;
};

export const login = async (username: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const response = await api.post('/token', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return response.data; 
};

// FIX: Updated types to include 'cover_image' and 'tags'
export const createArticle = async (data: { 
  title: string; 
  content: string; 
  slug: string;
  cover_image?: string;
  tags?: string[];
}) => {
  const response = await api.post('/articles/', data);
  return response.data;
};

// FIX: Changed 'fetch' to 'api.get' to match the rest of your file
export const getAllTags = async (): Promise<string[]> => {
  const response = await api.get('/tags/');
  return response.data;
};

export const getArticlesByTag = async (tag: string) => {
  // Use encoded tag to handle spaces or special characters safely
  const response = await api.get(`/articles/tag/${encodeURIComponent(tag)}`);
  return response.data;
};

export default api;