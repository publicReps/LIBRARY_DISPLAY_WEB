document.querySelectorAll(".edit").forEach(function (el) {
    el.addEventListener("dblclick", function () {
        this.contentEditable = true;
        this.focus();
        this.style.textAlign = 'center';
        // Place cursor at the end
        let range = document.createRange();
        let sel = window.getSelection();
        range.selectNodeContents(this);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    });

    let hiddenInput;
    el.addEventListener('focus', function () {
        // Check if this is the first time focus (optional safeguard)
        hiddenInput = this.querySelector('input[type="hidden"]');
        // editableDiv.appendChild(input);
    });

    el.addEventListener("blur", function () {
        this.contentEditable = false;
        this.style.textAlign = 'right';
        // this.style.textAlign = '-webkit-match-parent';
        const updatedData = this.innerText.trim();

        // const hiddenInput = this.querySelector('input[type="hidden"]');
        this.appendChild(hiddenInput);


        if (hiddenInput && updatedData) {
            //   hiddenInput.value = updatedData;
            updateServer(hiddenInput.value, updatedData);
        }
    });
});

function updateServer(id, data) {
    fetch('apis/d_u.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            newid: id,
            newData: data
        })
    })
        .then(response => response.text())
        .then(data => {
            if (data === "successfull") {
                console.log("Successfully updated");
            }
        })
        .catch(error => {
            console.error("Error updating data:", error);
        });
}


// document.addEventListener('htmx:afterOnLoad', function (evt) {
//     if (evt.detail.target.id === 'a') {
//         const response = evt.detail.xhr.responseText;
//         try {
//             const data = JSON.parse(response);
//             // evt.detail.target.innerText = data.data.header1 || 'No data found';
//             document.getElementById('a').innerText = data.psjuly;
//             document.getElementById('b').innerText = data.ptjuly;
//             document.getElementById('c').innerText = data.july;
//             document.getElementById('e').innerText = data.psaugust;
//             document.getElementById('f').innerText = data.ptaugust;
//             document.getElementById('g').innerText = data.august;
//             document.getElementById('j').innerText = data.psseptember;
//             document.getElementById('i').innerText = data.ptseptember;
//             document.getElementById('k').innerText = data.september;
//             document.getElementById('m').innerText = data.psoctober;
//             document.getElementById('n').innerText = data.ptoctober;
//             document.getElementById('o').innerText = data.october;
//             document.getElementById('q').innerText = data.psnovember;
//             document.getElementById('s').innerText = data.ptnovember;
//             document.getElementById('u').innerText = data.november;
//             document.getElementById('w').innerText = data.psdecember;
//             document.getElementById('x').innerText = data.ptdecember;
//             document.getElementById('y').innerText = data.december;
//             document.getElementById('aa').innerText = data.csjanuary;
//             document.getElementById('bb').innerText = data.ctjanuary;
//             document.getElementById('cc').innerText = data.january;
//             document.getElementById('ee').innerText = data.csfebruary;
//             document.getElementById('ff').innerText = data.ctfebruary;
//             document.getElementById('gg').innerText = data.february;
//             document.getElementById('jj').innerText = data.csmarch;
//             document.getElementById('ii').innerText = data.ctmarch;
//             document.getElementById('kk').innerText = data.march;
//             document.getElementById('mm').innerText = data.csapril;
//             document.getElementById('nn').innerText = data.ctapril;
//             document.getElementById('oo').innerText = data.april;
//             document.getElementById('qq').innerText = data.csmay;
//             document.getElementById('ss').innerText = data.ctmay;
//             document.getElementById('tt').innerText = data.may;
//             document.getElementById('vv').innerText = data.csjune;
//             document.getElementById('ww').innerText = data.ctjune;
//             document.getElementById('xa').innerText = data.june;
//             document.getElementById('d').innerText = data.w1;
//             document.getElementById('h').innerText = data.w2;
//             document.getElementById('l').innerText = data.w3;
//             document.getElementById('p').innerText = data.w4;
//             document.getElementById('v').innerText = data.w5;
//             document.getElementById('z').innerText = data.w6;
//             document.getElementById('dd').innerText = data.w7;
//             document.getElementById('hh').innerText = data.w8;
//             document.getElementById('ll').innerText = data.w9;
//             document.getElementById('pp').innerText = data.w10;
//             document.getElementById('uu').innerText = data.w11;
//             document.getElementById('yy').innerText = data.w12;
//             document.getElementById('tw').innerText = data.wdays;
//             document.getElementById('st').innerText = data.stotal;
//             document.getElementById('tet').innerText = data.ttotal;
//             document.getElementById('tusers').innerText = data.total;
//             document.getElementById('saverage').innerText = data.saverage;
//             document.getElementById('taverage').innerText = data.taverage;
//             document.getElementById('average').innerText = data.average;
//             document.getElementById('students').innerText = data.students;
//             document.getElementById('teachers').innerText = data.teachers;
//             document.getElementById('mtotal').innerText = data.mtotal;
//             document.getElementById('percentage').innerText = data.percentage;
//         } catch (e) {
//             evt.detail.target.innerText = 'Error parsing response';
//         }
//     }
// });