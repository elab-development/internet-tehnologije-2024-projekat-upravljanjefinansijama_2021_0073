import axios from 'axios';

// laravel api endpoint url
axios.defaults.baseURL = 'http://localhost:8000/api'; 

// dodaj default header za JSON
axios.defaults.headers.post["Content-Type"] = "application/json";

// interceptor za token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const responseBody = (response) => response.data;

// wrapper za http zahteve
const requests = {
  get: (url, config) => axios.get(url, config).then(responseBody),
  post: (url, body, config) => axios.post(url, body, config).then(responseBody),
  put: (url, body, config) => axios.put(url, body, config).then(responseBody),
  del: (url, config) => axios.delete(url, config).then(responseBody),
};

// api endpointi
const Auth = {
  register: (data) => requests.post('/register', data),
  login: (data) => requests.post('/login', data),
  logout: () => requests.post('/logout'),
  profile: () => requests.get('/profile'),
  forgotPassword: (data) => requests.post('/forgot-password', data),
  resetPassword: (data) => requests.post('/reset-password', data),
};

const Budgets = {
  list: () => requests.get('/budgets'),
  create: (data) => requests.post('/budgets', data),
  update: (id, data) => requests.put(`/budgets/${id}`, data),
  delete: (id) => requests.del(`/budgets/${id}`),
  savings: () => requests.get('/savings'),
  maxExpenseCategory: () => requests.get('/expenses/max-category'),
};

const Incomes = {
  list: (budgetId) => requests.get(`/budgets/${budgetId}/incomes`),
  create: (budgetId, data) => requests.post(`/budgets/${budgetId}/incomes`, data),
  update: (budgetId, id, data) => requests.put(`/budgets/${budgetId}/incomes/${id}`, data),
  delete: (budgetId, id) => requests.del(`/budgets/${budgetId}/incomes/${id}`),
};

const Expenses = {
  list: (budgetId) => requests.get(`/budgets/${budgetId}/expenses`),
  create: (budgetId, data) => requests.post(`/budgets/${budgetId}/expenses`, data),
  update: (budgetId, id, data) => requests.put(`/budgets/${budgetId}/expenses/${id}`, data),
  delete: (budgetId, id) => requests.del(`/budgets/${budgetId}/expenses/${id}`),
  filter: () => requests.get('/expenses/filter'),
};

// nove grupe
const Exchange = {
  convert: ({ from, to, amount }) =>
    requests.get('/exchange/convert', { params: { from, to, amount } }),
};

const Crypto = {
  prices: ({ ids, fiat, display }) =>
    requests.get('/crypto/prices', { params: { ids, fiat, display } }),
};

const Exports = {
  csv: ({ budget_id, from, to }) =>
    axios.get('/exports/expenses.csv', {
      responseType: 'blob',
      params: { budget_id, from, to },
    }),
  pdf: ({ from, to }) =>
    axios.get('/exports/report.pdf', {
      responseType: 'blob',
      params: { from, to },
    }),
};

const Receipts = {
  list: (expenseId) => requests.get(`/expenses/${expenseId}/receipts`),
  upload: (expenseId, form) =>
    requests.post(`/expenses/${expenseId}/receipts`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => requests.del(`/receipts/${id}`),
};

// glavni agent
const agent = {
  Auth,
  Budgets,
  Incomes,
  Expenses,
  Exchange,
  Crypto,
  Exports,
  Receipts,
};

export default agent;
