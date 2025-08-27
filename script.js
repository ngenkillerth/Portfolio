

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

var devtools = /./;
devtools.toString = function() {
    this.opened = true;
};

(function() {
  const checkDevTools = () => {
    const threshold = 160; // ค่าความกว้าง/สูง ที่ devtools เปิด
    let widthThreshold = window.outerWidth - window.innerWidth > threshold;
    let heightThreshold = window.outerHeight - window.innerHeight > threshold;
    if (widthThreshold || heightThreshold) {
      alert("⚠ กรุณาปิด Console (F12) เพื่อใช้งานเว็บไซต์");
      window.location.href = "about:blank"; // redirect ออกไป
    }
  };

  // ตรวจทุก 1 วิ
  setInterval(checkDevTools, 1000);

  // จับ F12 และ Ctrl+Shift+I
  document.addEventListener("keydown", function(e) {
    if (e.key === "F12" || 
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i"))) {
      e.preventDefault();
      alert("⚠ กรุณาปิด Console (F12) เพื่อใช้งานเว็บไซต์");
      return false;
    }
  });
})();

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
// REPLACE THIS URL WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
        const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxBBJntYBEtkew4hAvkje1UYENdwdHgI0-9roeMPwNC2zq5KV4CMrs-GQYZrtQp1tWARQ/exec"; 

        document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('reviewForm');
            const statusMessage = document.getElementById('statusMessage');
            const reviewsContainer = document.getElementById('reviewsContainer');
            const ratingStars = document.querySelectorAll('.star-rating .star');
            const ratingInput = document.getElementById('ratingInput');
            const imageInput = document.getElementById('reviewImage');
            const imagePreview = document.getElementById('imagePreview');
            const previewImg = document.getElementById('previewImg');
            
            let selectedRating = 0;

            // --- Star Rating Logic ---
            ratingStars.forEach(star => {
                star.addEventListener('click', () => {
                    const value = parseInt(star.dataset.value);
                    selectedRating = value;
                    ratingInput.value = value;
                    updateStarDisplay();
                });
                star.addEventListener('mouseover', () => {
                    updateStarDisplay(star.dataset.value);
                });
                star.addEventListener('mouseout', () => {
                    updateStarDisplay(selectedRating);
                });
            });

            function updateStarDisplay(hoverValue = selectedRating) {
                ratingStars.forEach(star => {
                    const starValue = parseInt(star.dataset.value);
                    if (starValue <= hoverValue) {
                        star.classList.add('selected');
                        star.classList.add('text-yellow-400'); // Use Tailwind class for color
                    } else {
                        star.classList.remove('selected');
                        star.classList.remove('text-yellow-400');
                    }
                });
            }

            // --- Image Preview Logic ---
            imageInput.addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        previewImg.src = e.target.result;
                        imagePreview.classList.remove('hidden');
                    };
                    reader.readAsDataURL(file);
                } else {
                    imagePreview.classList.add('hidden');
                    previewImg.src = '';
                }
            });

            // --- Form Submission Logic ---
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                statusMessage.textContent = 'กำลังส่งรีวิว...';
                statusMessage.className = 'mt-4 text-center font-bold text-gray-500';

                const formData = new FormData(form);
                const reviewData = {
                    name: formData.get('name'),
                    rating: parseInt(formData.get('rating')),
                    text: formData.get('reviewText')
                };

                // Handle image conversion to Base64
                const imageFile = formData.get('reviewImage');
                if (imageFile && imageFile.size > 0) {
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                        reviewData.image = reader.result;
                        await submitReview(reviewData);
                    };
                    reader.readAsDataURL(imageFile);
                } else {
                    await submitReview(reviewData);
                }
            });

            async function submitReview(data) {
                try {
                    const response = await fetch(GAS_WEB_APP_URL, {
                        method: 'POST',
                        mode: 'no-cors', // Use no-cors to prevent CORS issues with Google Apps Script
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            action: 'processReview',
                            data: JSON.stringify(data)
                        })
                    });
                    // Because of 'no-cors', we can't read the response body.
                    // We'll assume success and refresh the reviews.
                    statusMessage.textContent = 'รีวิวถูกส่งแล้ว! 🙏';
                    statusMessage.className = 'mt-4 text-center font-bold text-green-600';
                    form.reset();
                    selectedRating = 0;
                    updateStarDisplay();
                    imagePreview.classList.add('hidden');
                    fetchReviews(); // Refresh reviews after submission
                } catch (error) {
                    statusMessage.textContent = 'เกิดข้อผิดพลาดในการส่งรีวิว 😞';
                    statusMessage.className = 'mt-4 text-center font-bold text-red-600';
                    console.error('Error submitting review:', error);
                }
            }

            // --- Fetch and Display Reviews Logic ---
            async function fetchReviews() {
                reviewsContainer.innerHTML = `<div class="text-center text-gray-500 py-10">กำลังโหลดรีวิว...</div>`;
                try {
                    const response = await fetch(`${GAS_WEB_APP_URL}?action=getReviews`);
                    const result = await response.json();

                    if (result.status === "success" && result.reviews) {
                        reviewsContainer.innerHTML = '';
                        if (result.reviews.length === 0) {
                            reviewsContainer.innerHTML = `<p class="text-center text-gray-500 py-10">ยังไม่มีรีวิวในขณะนี้</p>`;
                        } else {
                            result.reviews.forEach(review => {
                                const reviewCard = document.createElement('div');
                                reviewCard.className = 'review-card bg-white p-6 rounded-xl space-y-3';
                                reviewCard.innerHTML = `
                                    <div class="flex justify-between items-center mb-2">
                                        <div class="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-blue-500">
                                                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1 -9 0ZM19.5 18a.75.75 0 0 1 -.75.75h-15a.75.75 0 0 1 -.75-.75v-2.25A4.5 4.5 0 0 1 6.75 11.25h10.5A4.5 4.5 0 0 1 21 15.75v2.25Z" clip-rule="evenodd" />
                                            </svg>
                                            <h3 class="font-bold text-lg">${review.name}</h3>
                                        </div>
                                        <div class="text-yellow-400">
                                            ${'★'.repeat(review.rating)}${'★'.repeat(5 - review.rating)}
                                        </div>
                                    </div>
                                    <p class="text-gray-700">${review.text}</p>
                                    ${review.imageUrl ? `<img src="${review.imageUrl}" alt="Review Image" class="mt-4 rounded-lg max-h-40 mx-auto">` : ''}
                                    <p class="text-xs text-gray-400 mt-2">${review.date}</p>
                                `;
                                reviewsContainer.appendChild(reviewCard);
                            });
                        }
                    } else {
                        reviewsContainer.innerHTML = `<p class="text-center text-red-500 py-10">ไม่สามารถดึงข้อมูลรีวิวได้: ${result.message}</p>`;
                    }
                } catch (error) {
                    reviewsContainer.innerHTML = `<p class="text-center text-red-500 py-10">เกิดข้อผิดพลาดในการโหลดรีวิว. กรุณาลองใหม่อีกครั้ง</p>`;
                    console.error('Error fetching reviews:', error);
                }
            }

            // Fetch reviews on page load
            fetchReviews();
        });