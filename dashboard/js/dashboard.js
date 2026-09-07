document.querySelectorAll(".edit").forEach(function(el) {
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

  document.addEventListener('htmx:afterSwap', function(evt) {
      try {
          if (evt.detail.target.id === 'top1') {
              const data = JSON.parse(evt.detail.xhr.responseText);
              document.getElementById('top').innerText = data.fullname;
              document.getElementById('top2').innerText = data.mem_id;
              document.getElementById('top1').src = data.member_photo || '../icon/img_avatar.png';
          }
      } catch (error) {
          console.error("Error:", error);
      }
  });