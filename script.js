// Get the entire document body
const body = document.body;
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('⚠ คลิกขวาถูกปิดใช้งาน');
});
 // Prevent text selection (highlighting)
body.addEventListener('selectstart', function(e) {
        e.preventDefault();
});
// Prevent dragging of any element (images, text)
body.addEventListener('dragstart', function(e) {
        e.preventDefault();
        alert("⚠ ไม่อนุญาติการกระทำดังกล่าว")
});
// Prevent copying using Ctrl+C or Cmd+C
document.addEventListener('keydown', function(e) {
// Check for Ctrl/Cmd key and 'C' key
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
                e.preventDefault();
                alert("⚠ ไม่อนุญาติการกระทำดังกล่าว")
                }
});

// Function to hide the popup
function hidePopup() {
    const popup = document.getElementById('developmentPopup');
    popup.style.display = 'none';
}

// Function to hide Welcome Screen
function hideWelcomeScreen() {
        const welcomeScreen = document.querySelector('.welcome-container');
        const particlesContainer = document.querySelector('.particles');

        welcomeScreen.style.animation = 'fadeOut 1s forwards';
        if (particlesContainer) {
            particlesContainer.style.animation = 'fadeOut 1s forwards';
        }
        welcomeScreen.style.display = 'none';
        particlesContainer.style.display = 'none';
}
// Create particles
const particlesContainer = document.createElement('div');
      particlesContainer.className = 'particles';
document.body.appendChild(particlesContainer);
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 5 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.setProperty('--x', `${(Math.random() - 0.5) * 500}px`);
        particle.style.setProperty('--y', `${(Math.random() - 0.5) * 500}px`);
        particlesContainer.appendChild(particle);
}


function isMetaAppWeb() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /FBAV|FBAN|Messenger|Instagram/i.test(userAgent);
}
function handleDevToolsCheck() {
    document.addEventListener("keydown", e => {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i")) {
        e.preventDefault();
        alert("⚠ ไม่อนุญาติให้ใช้ Console");
        }
    });
    const checkDevTools = () => {
        const threshold = 160;
        let widthThreshold = window.outerWidth - window.innerWidth > threshold;
        let heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
            alert("⚠ กรุณาปิด Console เพื่อใช้งานเว็บไซต์");
            window.location.href = "about:blank";
        }
    };
    document.addEventListener("keydown", function(e) {
        if (e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === "i"))) {
            e.preventDefault();
            alert("⚠ กรุณาปิด Console (F12) เพื่อใช้งานเว็บไซต์");
            return false;
        }
    });
setInterval(checkDevTools, 1000);
}


// เช็ค Meta App
if (!isMetaAppWeb()) {
    handleDevToolsCheck();
}

  






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


// AI Chatbox
const API_URL = "https://script.google.com/macros/s/AKfycbzIKLk7qY8kRyc-mPvX8Vt7BJLgsoPGopq0yphTGWSt-GnnD5MLH4_vYwjbXE-2bOQIlg/exec";

// ฟังก์ชันสำหรับบันทึกประวัติการสนทนา
function saveChatHistory() {
    const chatbox = document.getElementById("chatbox");
    const messages = Array.from(chatbox.children).map(msg => ({
        text: msg.innerText,
        cls: msg.classList.contains('user') ? 'user' : 'bot'
    }));

    // บันทึกเวลาปัจจุบันในรูปแบบตัวเลข (milliseconds)
    const dataToSave = {
        history: messages,
        timestamp: Date.now() 
    };
    
    localStorage.setItem('chatData', JSON.stringify(dataToSave));
}

// ฟังก์ชันสำหรับโหลดประวัติการสนทนา
function loadChatHistory() {
    const chatbox = document.getElementById("chatbox");
    const storedData = localStorage.getItem('chatData');

    if (storedData) {
        const data = JSON.parse(storedData);
        const savedTimestamp = data.timestamp;
        const now = Date.now();
        
        // 86400000 คือจำนวน milliseconds ใน 24 ชั่วโมง
        const ONE_DAY_IN_MS = 86400000;

        if (now - savedTimestamp > ONE_DAY_IN_MS) {
            localStorage.removeItem('chatData');
            console.log("Chat history has been cleared automatically after 24 hours.");
            return;
        }

        const messages = data.history;
        messages.forEach(msg => {
            appendMessage(msg.text, msg.cls);
        });
    }
}
 
async function sendMessage() {
    const input = document.getElementById("message-chatbox");
    const chatbox = document.getElementById("chatbox");
    const userMsg = input.value.trim();
    if (!userMsg) return;

    // แสดงข้อความผู้ใช้
    appendMessage(userMsg, "user");
    input.value = "";
    saveChatHistory();

    // แสดงข้อความ "กำลังตอบ..."
    const typingMsg = appendMessage("กำลังตอบ", "bot typing");

    try {
        const res = await fetch(`${API_URL}?message=${encodeURIComponent(userMsg)}`);
        const data = await res.json();

        // เมื่อได้คำตอบแล้ว ให้นำข้อความจริงไปใส่และลบคลาส typing
        typingMsg.innerText = data.reply || "เกิดข้อผิดพลาด";
        typingMsg.classList.remove('typing'); // <-- ลบคลาส typing
    } catch (err) {
        typingMsg.innerText = "❌ Error: " + err.message;
        typingMsg.classList.remove('typing'); // <-- ลบคลาส typing
    }
    saveChatHistory();

    chatbox.scrollTop = chatbox.scrollHeight;
}

function appendMessage(text, cls) {
    const chatbox = document.getElementById("chatbox");
    const div = document.createElement("div");
    div.className = "msg " + cls;
    
    // ตั้งค่าข้อความเริ่มต้น
    div.innerText = text;

    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
    return div; // คืน element เพื่อแก้ไขข้อความ
}

// เพิ่มการกด Enter เพื่อส่งข้อความ
document.getElementById("message-chatbox").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// โหลดประวัติการสนทนาเมื่อหน้าเว็บโหลด
window.onload = loadChatHistory;