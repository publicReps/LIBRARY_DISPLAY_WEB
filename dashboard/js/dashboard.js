// WebSocket connection for real-time updates
let ws = null;
let reconnectInterval = 3000;

function connectWebSocket() {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${protocol}//${window.location.host}`;
  
  ws = new WebSocket(wsUrl);

  ws.onopen = function() {
    console.log('Connected to WebSocket server');
    document.getElementById('response').innerHTML = 'Connected';
    
    // Request initial data
    requestDashboardData();
  };

  ws.onmessage = function(event) {
    try {
      const message = JSON.parse(event.data);
      handleWebSocketMessage(message);
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };

  ws.onclose = function() {
    console.log('WebSocket disconnected. Reconnecting...');
    document.getElementById('response').innerHTML = 'Reconnecting...';
    setTimeout(connectWebSocket, reconnectInterval);
  };

  ws.onerror = function(error) {
    console.error('WebSocket error:', error);
    document.getElementById('response').innerHTML = 'Connection Error';
  };
}

function handleWebSocketMessage(message) {
  switch (message.type) {
    case 'dashboardData':
    case 'dashboardUpdate':
      updateDashboardFields(message.data);
      break;
    case 'noticeData':
      document.getElementById('notice').value = message.value;
      break;
    case 'noticeUpdated':
      document.getElementById('notice').value = message.value;
      break;
    case 'circulationBooksAttendance':
      updateCirculationBooksAttendance(message.param, message.subParam, message.value);
      break;
    case 'topUserData':
      document.getElementById('top').innerText = message.nameId || 'Firstname Lastname';
      document.getElementById('top2').innerText = message.memberId || 'BSC/2023/09';
      break;
    case 'success':
      document.getElementById('response').innerHTML = message.message;
      setTimeout(() => {
        document.getElementById('response').innerHTML = 'Status';
      }, 2000);
      break;
    case 'error':
      console.error('Server error:', message.message);
      document.getElementById('response').innerHTML = 'Error';
      break;
  }
}

function updateDashboardFields(data) {
  // Update all editable fields with dashboard data
  if (data[1]) document.getElementById('editableField_1').innerHTML = data[1];
  if (data[2]) document.getElementById('editableField_2').innerHTML = data[2];
  if (data[6]) document.getElementById('id_a').innerText = data[6];
  if (data[7]) document.getElementById('id_b').innerText = data[7];
  if (data[8]) document.getElementById('id_c').innerText = data[8];
  if (data[9]) document.getElementById('id_d').innerText = data[9];
  if (data[10]) document.getElementById('id_e').innerText = data[10];
  if (data[11]) document.getElementById('id_f').innerText = data[11];
  if (data[12]) document.getElementById('id_g').innerText = data[12];
  if (data[13]) document.getElementById('id_h').innerText = data[13];
  if (data[14]) document.getElementById('id_i').innerText = data[14];
}

function updateCirculationBooksAttendance(param, subParam, value) {
  // Find the element with matching hx-get attribute and update it
  const elements = document.querySelectorAll('[hx-get]');
  elements.forEach(el => {
    const hxGet = el.getAttribute('hx-get');
    if (hxGet && hxGet.includes(`param=${param}`) && hxGet.includes(`sub_param=${subParam}`)) {
      el.innerText = value;
    }
  });
}

function requestDashboardData() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'getDashboardData' }));
    ws.send(JSON.stringify({ type: 'getNotice', id: 5 }));
    ws.send(JSON.stringify({ type: 'getTopUser' }));
    
    // Request circulation, books, and attendance data
    requestCirculationBooksAttendance();
  }
}

function requestCirculationBooksAttendance() {
  if (!ws || ws.readyState !== WebSocket.OPEN) return;
  
  // Circulation data
  ws.send(JSON.stringify({ type: 'getCirculationBooksAttendance', param: '1', subParam: '1' }));
  ws.send(JSON.stringify({ type: 'getCirculationBooksAttendance', param: '1', subParam: '2' }));
  ws.send(JSON.stringify({ type: 'getCirculationBooksAttendance', param: '1', subParam: '3' }));
  
  // Books data
  ws.send(JSON.stringify({ type: 'getCirculationBooksAttendance', param: '2', subParam: '1' }));
  ws.send(JSON.stringify({ type: 'getCirculationBooksAttendance', param: '2', subParam: '2' }));
  
  // Attendance data
  ws.send(JSON.stringify({ type: 'getCirculationBooksAttendance', param: '3', subParam: '1' }));
  ws.send(JSON.stringify({ type: 'getCirculationBooksAttendance', param: '3', subParam: '2' }));
  ws.send(JSON.stringify({ type: 'getCirculationBooksAttendance', param: '3', subParam: '3' }));
  ws.send(JSON.stringify({ type: 'getCirculationBooksAttendance', param: '3', subParam: '4' }));
}

function updateNotice(value) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'updateNotice', value: value }));
  }
}

function sendEmail(subject, email) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'sendEmail', subject: subject, email: email }));
  }
}

// Initialize WebSocket connection when page loads
document.addEventListener('DOMContentLoaded', function() {
  connectWebSocket();
});
