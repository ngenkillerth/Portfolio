const userAgent = navigator.userAgent || navigator.vendor || window.opera;
const isMetaApp = /FBAV|FBAN|Messenger|Instagram/i.test(userAgent);

function handleDevToolsCheck() {
    const checkDevTools = () => {
        const threshold = 160;
        let widthThreshold = window.outerWidth - window.innerWidth > threshold;
        let heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
            alert("⚠ กรุณาปิด Console (F12) เพื่อใช้งานเว็บไซต์");
            window.location.href = "about:blank";
        }
    };

    setInterval(checkDevTools, 1000);

    document.addEventListener("keydown", function(e) {
        if (e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === "i"))) {
            e.preventDefault();
            alert("⚠ กรุณาปิด Console (F12) เพื่อใช้งานเว็บไซต์");
            return false;
        }
    });
}

// --- แก้ปัญหา redirect loop ---
/* if (!isMetaApp) {
    handleDevToolsCheck();
} */



  
// Function to hide the popup
function hidePopup() {
    const popup = document.getElementById('developmentPopup');
    popup.style.display = 'none';
}

  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('คลิกขวาถูกปิดใช้งาน');
  });

var devtools = /./;
devtools.toString = function() {
    this.opened = true;
};


// Run the function when the page loads
window.onload = checkDevTools;

// Your other JavaScript functions and code go here


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


// userReview.html
// ฟังก์ชันสำหรับดึงข้อมูลและแสดงผลรีวิว
async function fetchReviews() {
    const SPREADSHEET_ID = '1ytQuhzz63mLqiEKP9ozPT8LLqerFS1wzaHVH6JzKtIw'; 
    const SHEET_ID = '269614832'; 

// URL สำหรับดึงข้อมูลในรูปแบบ JSON โดยใช้ Google Visualization API
    const API_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&gid=${SHEET_ID}`;

// ฟังก์ชันสำหรับสร้างดาวตามคะแนน
    function createStars(rating) {
    let stars = '';
    const maxRating = 5;
    for (let i = 0; i < maxRating; i++) {
        if (i < rating) {
            stars += '⭐'; 
        } else {
            stars += '☆'; 
        }
    }
    return stars;
    }
    const reviewsContainer = document.getElementById('reviews-container');
    try {
        const response = await fetch(API_URL);
        const dataText = await response.text();
        const jsonpData = dataText.substring(47, dataText.length - 2);
        const jsonData = JSON.parse(jsonpData);
        reviewsContainer.innerHTML = '';

        if (jsonData.table.rows.length > 0) {
            jsonData.table.rows.forEach(row => {
                const timestamp = row.c[0] ? row.c[0].f || row.c[0].v : 'ไม่ระบุวันที่';
                const name = row.c[1] ? row.c[1].v : 'ไม่ระบุชื่อ';
                const rating = row.c[2] ? row.c[2].v : 0;
                const message = row.c[3] ? row.c[3].v : 'ไม่มีคำอธิบาย';

                const reviewCard = document.createElement('div');
                reviewCard.classList.add('review-card');
                reviewCard.innerHTML = `
                    <div class="review-header">
                        <span class="review-title">ผู้รีวิว: ${name}</span>
                        <span class="review-date">${timestamp}</span>
                    </div>
                    <div class="review-rating">${createStars(rating)}</div>
                    <p class="review-message mt-2">คำอธิบาย: ${message}</p>
                `;
                reviewsContainer.appendChild(reviewCard);
            });
        } else {
            reviewsContainer.innerHTML = `<p class="text-center text-gray-500">ยังไม่มีรีวิวในตอนนี้</p>`;
        } 
    } catch (error) {
        console.error('Error fetching reviews:', error);
        reviewsContainer.innerHTML = `<p class="text-center text-red-500">ไม่สามารถดึงข้อมูลรีวิวได้</p>`;
    }
}
