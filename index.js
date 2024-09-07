const express = require('express');
const path = require('path');
const app = express();

// Middleware to serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware to check if the request is within working hours
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const hour = now.getHours();

  // Check if it's Monday to Friday and between 9 AM and 5 PM
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('<h1>Sorry, the application is only available during working hours (Monday to Friday, 9 AM to 5 PM).</h1>');
  }
};

// Apply the custom middleware
app.use(checkWorkingHours);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
