// This JavaScript will hide the message after 3 seconds
document.body.addEventListener('htmx:afterSwap', function (event) {
  if (event.target.id === 'message') {
    document.getElementById('form').reset();

    setTimeout(function () {
      event.target.innerHTML = '';
    }, 3000);
  }
});

// drag and drop in preview div
const dropZone = document.getElementById('dragndrop');
const previewa = document.getElementById('imagePreview');
dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropZone.style.opacity = '0.8';
});
dropZone.addEventListener('dragleave', () => {
  dropZone.style.opacity = '';
  previewa.innerHTML = '';
});
dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.style.opacity = '';
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const imga = document.createElement('img');
        imga.src = reader.result;
        // dropZone.style.display = 'block';
        previewa.innerHTML = '';
        previewa.appendChild(imga);
      };
      reader.readAsDataURL(file);
      document.getElementById("photo").files = files
    } else {
      alert('Please drop a valid image file.');
    }
  }
})
// photo preview
document.getElementById('photo').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      const preview = document.getElementById('imagePreview');
      preview.innerHTML = '';
      preview.appendChild(img);
    }
    reader.readAsDataURL(file);
  } else {
    document.getElementById('imagePreview').innerHTML = 'No image selected';
  }
});


// function hi() {
//     fetch('apis/f_header.php?q=2')
//         .then(response => response.json())
//         .then(data => {
//             if (data.header_a) {
//                 document.getElementById('editableField_1').innerText = data.header_a;
//                 document.getElementById('id_1').value = data.id_a;
//                 // fetchUserDetails(); // Call the search function
//             }
//             if (data.header_b) {
//                 document.getElementById('editableField_2').innerText = data.header_b;
//                 document.getElementById('id_2').value = data.id_b;
//             }    
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }



// // document.getElementById("editableField_1").addEventListener("dblclick", function() {
// //     // Make the field editable on double-click
// //     this.contentEditable = true;
// //     this.focus(); // Focus the input field
// // });
// document.getElementById("editableField_1").addEventListener("dblclick", function() {
//     // Make the field editable on double-click
//     this.contentEditable = true;
//     this.focus(); // Focus the input field

//     let range = document.createRange();
//     let sel = window.getSelection();

//     // Ensure the cursor moves to the END of the text
//     if (this.childNodes.length > 0) {
//         range.setStart(this.childNodes[this.childNodes.length - 1], this.childNodes[this.childNodes.length - 1].length);
//         range.collapse(false); // Moves cursor to the end
//         sel.removeAllRanges();
//         sel.addRange(range);
//     }
// });

// document.getElementById("editableField_2").addEventListener("dblclick", function() {
//     // Make the field editable on double-click
//     this.contentEditable = true;
//     this.focus(); // Focus the input field
//     let range = document.createRange();
//     let sel = window.getSelection();

//     // Ensure the cursor moves to the END of the text
//     if (this.childNodes.length > 0) {
//         range.setStart(this.childNodes[this.childNodes.length - 1], this.childNodes[this.childNodes.length - 1].length);
//         range.collapse(false); // Moves cursor to the end
//         sel.removeAllRanges();
//         sel.addRange(range);
//     }
// });

// document.getElementById("editableField_1").addEventListener("blur", function() {
//     // Make the field readonly when clicked outside
//     this.contentEditable = false;
//     // Get the updated content
//     const updatedData = this.innerText.trim();
//     const id = document.getElementById('id_1').value;
//     // Send the updated data to the server using fetch (AJAX)
//     updateServer(id, updatedData);
// }, true); // Capture the event on the document level to detect clicks outside

// document.getElementById("editableField_2").addEventListener("blur", function() {
//     this.contentEditable = false;
//     const updatedData = this.innerText.trim();
//     const id = document.getElementById('id_2').value;
//     updateServer(id, updatedData);
// }, true);

// // Function to send updated data to the server
// function updateServer(id, data) {
//     fetch('apis/u_header.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded' // Sending form data
//         },
//         body: new URLSearchParams({
//             newid: id,
//             newData: data
//         })
//     })
//     .then(response => response.text())
//     .then(data => {
//         // console.log("Data updated successfully:", data);
//         if (data === "successfull") {
//             console.log("succesfully completed");
//         }
//     })
//     .catch((error) => {
//         console.error("Error updating data:", error);
//     });
// }

// // hi();
// document.addEventListener('DOMContentLoaded', function() {
//     hi(); // Call the hi() function after the DOM is ready
// });


// double click update function for member id updation
document.querySelectorAll(".editable").forEach(function (el) {
  el.addEventListener("dblclick", function () {
    this.contentEditable = true;
    this.focus();
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
    const updatedData = this.innerText.trim();
    this.appendChild(hiddenInput);

    if (hiddenInput && updatedData) {
      //   hiddenInput.value = updatedData;
      updateServer(hiddenInput.value, updatedData);
    }
  });
});

function updateServer(id, data) {
  alert(data);
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

// double click editable for card_1 and card_2
function a(param) {
  setTimeout(function () {
      document.querySelectorAll("." + param).forEach(function (el) {
          el.addEventListener("dblclick", function () {
              this.contentEditable = true;
              this.focus();
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
              const updatedData = this.innerText.trim();

              // const hiddenInput = this.querySelector('input[type="hidden"]');
              this.appendChild(hiddenInput);


              if (hiddenInput && updatedData) {
                  //   hiddenInput.value = updatedData;
                  updateServerphoto(hiddenInput.value, updatedData, param);
              }
          });
      });
  }, 5000);
}

function updateServerphoto(id, data, param) {
  fetch('apis/u_d_l_api.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
          newid: id,
          newData: data,
          param: param
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
a("card_1");
a("card_2");