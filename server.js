const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dashboard'
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/dashboard', express.static(path.join(__dirname, 'dashboard')));
app.use('/api', express.static(path.join(__dirname, 'api')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/icon', express.static(path.join(__dirname, 'icon')));
app.use('/images', express.static(path.join(__dirname, 'dashboard/images')));

// Serve main dashboard page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard', 'dashboard.html'));
});

// Store connected clients
const clients = new Set();

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.add(ws);

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      
      // Handle different message types
      switch (data.type) {
        case 'getDashboardData':
          await sendDashboardData(ws);
          break;
        case 'getNotice':
          await getNotice(ws, data.id);
          break;
        case 'updateNotice':
          await updateNotice(data.value, ws);
          break;
        case 'getEmailData':
          await getEmailData(ws, data.id);
          break;
        case 'sendEmail':
          await sendEmail(data, ws);
          break;
        case 'getCirculationBooksAttendance':
          await getCirculationBooksAttendance(ws, data.param, data.subParam);
          break;
        case 'getTopUser':
          await getTopUser(ws);
          break;
        default:
          console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({ type: 'error', message: error.message }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });

  // Send initial data
  sendDashboardData(ws);
});

// Function to broadcast data to all connected clients
function broadcast(data) {
  const message = JSON.stringify(data);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Get dashboard data
async function sendDashboardData(ws) {
  try {
    // Get all dashboard data
    const dashboardData = await getDashboardTableData();
    
    ws.send(JSON.stringify({
      type: 'dashboardData',
      data: dashboardData
    }));
  } catch (error) {
    console.error('Error sending dashboard data:', error);
    ws.send(JSON.stringify({ type: 'error', message: error.message }));
  }
}

// Get data from dashboard table
function getDashboardTableData() {
  return new Promise((resolve, reject) => {
    db.query('SELECT id, details FROM dashboard', (error, results) => {
      if (error) {
        reject(error);
      } else {
        const data = {};
        results.forEach(row => {
          data[row.id] = row.details;
        });
        resolve(data);
      }
    });
  });
}

// Get notice
async function getNotice(ws, id = 5) {
  try {
    const result = await queryDatabase('SELECT details FROM dashboard WHERE id = ?', [id]);
    if (result && result.length > 0) {
      ws.send(JSON.stringify({
        type: 'noticeData',
        id: id,
        value: result[0].details
      }));
    }
  } catch (error) {
    console.error('Error getting notice:', error);
  }
}

// Update notice
async function updateNotice(value, ws) {
  try {
    await queryDatabase('UPDATE dashboard SET details = ? WHERE id = 5', [value]);
    // Broadcast the update to all clients
    broadcast({
      type: 'noticeUpdated',
      id: 5,
      value: value
    });
    
    if (ws) {
      ws.send(JSON.stringify({
        type: 'success',
        message: 'Notice updated successfully'
      }));
    }
  } catch (error) {
    console.error('Error updating notice:', error);
    if (ws) {
      ws.send(JSON.stringify({ type: 'error', message: error.message }));
    }
  }
}

// Get email subject/data
async function getEmailData(ws, id = 1) {
  try {
    const result = await queryDatabase('SELECT details FROM dashboard WHERE id = ?', [id]);
    if (result && result.length > 0) {
      ws.send(JSON.stringify({
        type: 'emailData',
        value: result[0].details
      }));
    }
  } catch (error) {
    console.error('Error getting email data:', error);
  }
}

// Send email (placeholder - would need actual email service)
async function sendEmail(data, ws) {
  try {
    const { subject, email } = data;
    // Placeholder for email sending logic
    console.log('Sending email:', { subject, email });
    
    ws.send(JSON.stringify({
      type: 'success',
      message: 'Email sent successfully'
    }));
  } catch (error) {
    console.error('Error sending email:', error);
    ws.send(JSON.stringify({ type: 'error', message: error.message }));
  }
}

// Get circulation, books, and attendance data
async function getCirculationBooksAttendance(ws, param, subParam) {
  try {
    let value = '0';
    
    // Simulated data based on the original PHP implementation
    // In a real scenario, you'd query your actual database tables
    if (param === '1') { // Circulation
      if (subParam === '1') value = '101';
      else if (subParam === '2') value = '90';
      else if (subParam === '3') value = '70';
    } else if (param === '2') { // Books
      if (subParam === '1') value = '15000';
      else if (subParam === '2') value = '25000';
    } else if (param === '3') { // Attendance
      if (subParam === '1') value = '40';
      else if (subParam === '2') value = '10';
      else if (subParam === '3') value = '20';
      else if (subParam === '4') value = '30';
    }
    
    ws.send(JSON.stringify({
      type: 'circulationBooksAttendance',
      param,
      subParam,
      value
    }));
  } catch (error) {
    console.error('Error getting data:', error);
  }
}

// Get top user
async function getTopUser(ws) {
  try {
    const result = await queryDatabase('SELECT details FROM dashboard WHERE id IN (1, 2)', []);
    if (result && result.length >= 2) {
      ws.send(JSON.stringify({
        type: 'topUserData',
        memberId: result[0]?.details || 'N/A',
        nameId: result[1]?.details || 'N/A'
      }));
    }
  } catch (error) {
    console.error('Error getting top user:', error);
  }
}

// Helper function for database queries
function queryDatabase(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Periodic data update (every 10 seconds)
setInterval(() => {
  getDashboardTableData().then(data => {
    broadcast({
      type: 'dashboardUpdate',
      data: data
    });
  }).catch(error => {
    console.error('Error in periodic update:', error);
  });
}, 10000);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`WebSocket server ready`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('HTTP server closed');
    wss.close(() => {
      console.log('WebSocket server closed');
      db.end((err) => {
        if (err) console.error('Error closing database:', err);
        console.log('Database connection closed');
        process.exit(0);
      });
    });
  });
});
