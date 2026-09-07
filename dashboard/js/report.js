// top one user, notice, email- js with htmx
document.addEventListener('htmx:afterOnLoad', function(evt) {
    const response = evt.detail.xhr.responseText;
    // try {
    var data;
    if (evt.detail.target.id === 'result') {
        data = JSON.parse(response);
        // const data = JSON.parse(response);
        document.getElementById('result1').src = data.member_photo || '../icon/img_avatar.png';
        document.getElementById('result').innerText = `Name: ${data.fullname}`;
        document.getElementById('result2').innerText = `Member ID: ${data.mem_id}`;
    }
});


// datetime and holidays js
const festivals = {
    "2025-02-02": "First festival 1",
    "2025-02-03": "Second festival 2",
    "2025-02-01": "Third festival 3",
    "2025-02-05": "Four festival 4",
    "2025-02-06": "Five festival 5",
    "2025-02-07": "Six festival 6",
    "2025-02-08": "Seven festival 7",
    "2025-02-09": "Eight festival 8",
    "2025-02-14": "Nine festival 9",
};
const today = new Date();
const date = new Date();
today.setDate(today.getDate() + 1);
const formattedDate = today.toISOString().split('T')[0];
const festivalName = festivals[formattedDate] || "Normal Day";
// console.log(formattedDate);
// console.log(today);
document.getElementById('date').innerText = date.toDateString().split('T')[0];
document.getElementById('festival-name').innerText = `Next Day: ${festivalName}`;
