<script src="//ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script>
  /**
   * Run initializations on web app load.
   */
  $(function() {
    // Call the server here to retrieve any information needed to build the page.
    google.script.run
       .withSuccessHandler(function(contents) {
            // Respond to success conditions here.
            updateDisplay(contents);
          })
       .withFailureHandler(function(msg) {
            // Respond to failure conditions here.
            $('#main-heading').text(msg);
            $('#main-heading').addClass("error");
            $('#error-message').show();
          })
       .getFolderContents(folderId);
  });


    // ตรวจสอบ user agent เพื่อดูว่ากำลังเปิดในเบราว์เซอร์ของ Facebook หรือไม่
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isFacebookApp = /FBAV|FBAN|Messenger/i.test(userAgent);

  if (isFacebookApp) {
    // สร้างลิงก์ใหม่ที่เปิดในเบราว์เซอร์ภายนอก
    // ใช้ window.location.href แทน เพื่อให้แน่ใจว่าทำงานได้บนหลายแพลตฟอร์ม
    window.location.href = 'https://script.google.com/macros/s/AKfycbxBBJntYBEtkew4hAvkje1UYENdwdHgI0-9roeMPwNC2zq5KV4CMrs-GQYZrtQp1tWARQ/exec';
  }




  
// Function to hide the popup
function hidePopup() {
    const popup = document.getElementById('developmentPopup');
    popup.style.display = 'none';
}

  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('คลิกขวาถูกปิดใช้งาน');
  });




  /**
   * Updates display of folder contents.
   *
   * @param {Object} contents list of content filenames, along with
   *     the root folder name.
   */
  function updateDisplay(contents) {
    var headingText = "Displaying contents for " + contents.rootName + " folder:";
    $('#main-heading').text(headingText);
    for (var i = 0; i < contents.children.length; i++) {
      var name = contents.children[i];
      $('#results').append('<div>' + name + '</div>');
    }
  }
  window.addEventListener("scroll", function() {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
  });



/* UserReview.html */
let selectedRating = 0;

// ⭐ จัดการดาว
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#starRating i").forEach(star => {
    star.addEventListener("click", function() {
      selectedRating = this.getAttribute("data-value");
      document.querySelectorAll("#starRating i").forEach(s => s.classList.remove("active"));
      for (let i = 0; i < selectedRating; i++) {
        document.querySelectorAll("#starRating i")[i].classList.add("active");
      }
    });
  });
});

// 📷 ฟังก์ชันแปลงรูปเป็น Base64
function getBase64(file, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => callback(reader.result);
  reader.onerror = error => console.error("Error: ", error);
}

// 🚀 ส่งรีวิว
function submitReview() {
  const reviewerName = document.getElementById("reviewerName").value;
  const text = document.getElementById("reviewText").value;
  const imageFile = document.getElementById("reviewImage").files[0];

  if (!selectedRating) return alert("กรุณาให้คะแนนดาวก่อน");
  if (!text.trim()) return alert("กรุณาเขียนข้อความรีวิว");
  if (!reviewerName.trim()) return alert("กรุณาใส่ชื่อของคุณก่อน");

  if (imageFile) {
    getBase64(imageFile, (base64) => {
      sendToGoogleSheet(reviewerName, selectedRating, text, base64);
    });
  } else {
    sendToGoogleSheet(reviewerName, selectedRating, text, "");
  }
}

// 📡 ส่งข้อมูลไป Apps Script
function sendToGoogleSheet(name, rating, text, image) {
  alert("กำลังส่งรีวิว...");

  google.script.run
    .withSuccessHandler(function(response) {
      alert("สำเร็จ! " + response.message);
      // โหลดรีวิวใหม่ทันทีหลังจากส่งสำเร็จ
      loadReviews();
    })
    .withFailureHandler(function(error) {
      alert("❌ เกิดข้อผิดพลาด: " + error.message);
    })
    .processReview({ name: name, rating: rating, text: text, image: image });
}


// MyWork.html
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('portfolioSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cardWidth = 320; // ความกว้างของการ์ด + gap (300px + 20px)

    let isDown = false;
    let startX;
    let scrollLeft;

    // การเลื่อนด้วยเมาส์ (Drag)
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // เพิ่มความเร็วในการเลื่อน
        slider.scrollLeft = scrollLeft - walk;
    });

    // การเลื่อนด้วยปุ่ม
    nextBtn.addEventListener('click', () => {
        slider.scrollLeft += cardWidth;
    });

    prevBtn.addEventListener('click', () => {
        slider.scrollLeft -= cardWidth;
    });
});

</script>
