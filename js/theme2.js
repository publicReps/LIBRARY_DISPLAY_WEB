// attendance section
function fetchData() {
    fetch('api/a_api.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('recentlyVisitorsTable').querySelector('tbody');
            table.innerHTML = ''; // Clear existing rows
            data.data.forEach(row => {
                const tr = document.createElement('tr');
                // tr.classList.add('highlight');
                tr.innerHTML = `<td>${row.mem_id}</td><td style="text-transform: capitalize;">${row.fullname}</td><td class="td1">${row.Login_time}</td><td class="td1">${row.Logout_time || ' '}</td><td class="td1">${row.Location}</td>`;
                table.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
// Fetch data initially
fetchData();
setInterval(fetchData, 2000);

// htmx function section
document.addEventListener('htmx:afterSwap', function(evt) {
    try {
        if (evt.detail.target.id === 'a_c') {
            const data = JSON.parse(evt.detail.xhr.responseText);
            document.getElementById('a_c2').innerText = `: ${data.students}`;
            document.getElementById('a_c3').innerText = `: ${data.teachers}`;
            document.getElementById('a_c4').innerText = `: ${data.others}`;
            document.getElementById('a_c1').innerText = `: ${data.male}`;
            document.getElementById('a_c').innerText = `: ${data.female}`;
            document.getElementById('a_c5').innerText = data.visitors;
        }
        if (evt.detail.target.id === 'top1') {
            const data = JSON.parse(evt.detail.xhr.responseText);
            document.getElementById('top').innerText = `Name: ${data.fullname}`;
            document.getElementById('top2').innerText = `Member ID: ${data.mem_id}`;
            document.getElementById('top1').src = data.member_photo || 'icon/img_avatar.png';
        }
        if (evt.detail.target.id === 'ptop1') {
            const data = JSON.parse(evt.detail.xhr.responseText);
            document.getElementById('ptop').innerText = `Name: ${data.fullname}`;
            document.getElementById('ptop2').innerText = `Member ID: ${data.mem_id}`;
            document.getElementById('ptop1').src = data.member_photo || 'icon/img_avatar.png';
        }
        if (evt.detail.target.id === 'sptop1') {
            const data = JSON.parse(evt.detail.xhr.responseText);
            document.getElementById('sptop').innerText = `Name: ${data.fullname}`;
            document.getElementById('sptop2').innerText = `Member ID: ${data.mem_id}`;
            document.getElementById('sptop1').src = data.member_photo || 'icon/img_avatar.png';
        }
    } catch (e) {
        console.error("Error:", e);
        
    }
});