import axios from 'axios';

// laravel api endpoint url
axios.defaults.baseURL = 'http://localhost:8000/api'; 

const responseBody = (response) => response.data;

// objekat za http zahteve
const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),
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
  list: () => requests.get('/budgets'), // GET /budgets
  create: (data) => requests.post('/budgets', data), // POST /budgets
  update: (id, data) => requests.put(`/budgets/${id}`, data), // PUT /budgets/:id
  delete: (id) => requests.del(`/budgets/${id}`), // DELETE /budgets/:id
  savings: () => requests.get('/savings'), // GET /savings
  maxExpenseCategory: () => requests.get('/expenses/max-category'), // GET /expenses/max-category
};

const Incomes = {
  list: (budgetId) => requests.get(`/budgets/${budgetId}/incomes`), // GET /budgets/:budgetId/incomes
  create: (budgetId, data) => requests.post(`/budgets/${budgetId}/incomes`, data), // POST /budgets/:budgetId/incomes
  update: (budgetId, id, data) => requests.put(`/budgets/${budgetId}/incomes/${id}`, data), // PUT /budgets/:budgetId/incomes/:id
  delete: (budgetId, id) => requests.del(`/budgets/${budgetId}/incomes/${id}`), // DELETE /budgets/:budgetId/incomes/:id
};

const Expenses = {
  list: (budgetId) => requests.get(`/budgets/${budgetId}/expenses`), // GET /budgets/:budgetId/expenses
  create: (budgetId, data) => requests.post(`/budgets/${budgetId}/expenses`, data), // POST /budgets/:budgetId/expenses
  update: (budgetId, id, data) => requests.put(`/budgets/${budgetId}/expenses/${id}`, data), // PUT /budgets/:budgetId/expenses/:id
  delete: (budgetId, id) => requests.del(`/budgets/${budgetId}/expenses/${id}`), // DELETE /budgets/:budgetId/expenses/:id
  filter: () => requests.get('/expenses/filter'), // GET /expenses/filter
};

// glavni agent za export
const agent = {
  Auth,
  Budgets,
  Incomes,
  Expenses,
};

export default agent;