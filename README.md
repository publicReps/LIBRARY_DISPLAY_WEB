# Real-time Dashboard with WebSocket

This is a Node.js-based real-time dashboard that uses WebSocket for live updates.

## Features

- **Real-time Updates**: All data updates are pushed to connected clients via WebSocket
- **Dashboard Display**: Shows circulation, books, attendance, and collection statistics
- **Notice Management**: Update and broadcast notices to all connected clients
- **Email Functionality**: Send emails through the dashboard interface
- **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

- Node.js (v14 or higher)
- MySQL/MariaDB database
- npm (Node Package Manager)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure database connection in `server.js`:
```javascript
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dashboard'
});
```

3. Import the database schema:
```bash
mysql -u root -p dashboard < dashboard.sql
```

## Usage

Start the server:
```bash
npm start
```

Or run directly:
```bash
node server.js
```

The dashboard will be available at: `http://localhost:3000`

## How It Works

### Server (server.js)
- Creates an HTTP server with Express
- Sets up a WebSocket server for real-time communication
- Connects to MySQL database for data retrieval
- Broadcasts updates to all connected clients every 10 seconds

### Client (dashboard/js/dashboard.js)
- Establishes WebSocket connection on page load
- Requests initial data from server
- Listens for real-time updates
- Automatically reconnects if connection is lost
- Sends updates (notices, emails) via WebSocket

### Dashboard Page (dashboard/dashboard.html)
- Removed HTMX dependencies
- Uses pure JavaScript with WebSocket for all data operations
- Real-time display of library statistics
- Interactive notice and email forms

## API Messages

### Client to Server
- `getDashboardData`: Request all dashboard data
- `getNotice`: Request notice text
- `updateNotice`: Update notice text
- `getEmailData`: Request email data
- `sendEmail`: Send email
- `getCirculationBooksAttendance`: Get specific statistics
- `getTopUser`: Get top user information

### Server to Client
- `dashboardData`: Initial dashboard data
- `dashboardUpdate`: Periodic data update
- `noticeData`: Notice text
- `noticeUpdated`: Notice update confirmation
- `circulationBooksAttendance`: Statistics data
- `topUserData`: Top user information
- `success`: Operation successful
- `error`: Error message

## File Structure

```
/workspace
├── server.js              # Main Node.js server with WebSocket
├── package.json           # NPM configuration
├── README.md             # This file
├── dashboard.sql         # Database schema
└── dashboard/
    ├── dashboard.html    # Main dashboard page
    ├── js/
    │   └── dashboard.js  # WebSocket client code
    ├── css/
    │   └── dashboard.css # Styles
    └── images/           # Image assets
```

## Customization

- Change the port by setting the `PORT` environment variable
- Modify the broadcast interval in `server.js` (default: 10 seconds)
- Add new data endpoints by extending the message handler in `server.js`

## License

ISC
