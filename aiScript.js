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
// Array of sample AI-generated artworks
        const artworks = [
            { id: 1, title: 'Minecraft Style', category: 'minecraft', url: 'https://lh3.googleusercontent.com/pw/AP1GczMugjtXoG5UvqwkeP2ZlQFC36mvLQIhBy6LBTnw5Sk2cNEX_3yRkYCnS8yBM4t8fMhSUCzAprAMYUu_HHtBcYc6c_nejgxFA2QIJ5aYANscLlpRTl8k4WWZoUi9bo69uuHP6mTbTMW-s7yQCbUnxfoU=w864-h1184-s-no-gm?authuser=0', description: 'เจนภาพสไตล์ Minecraft' },
            { id: 2, title: 'Minecraft Style', category: 'minecraft', url: 'https://lh3.googleusercontent.com/pw/AP1GczM4qxESS59orQtRn_lT3rAgL9O7sGcLHTQDP_W6aKR3GDvKkAvA1Kj7ubX08I4GVG3oCCgumEXWMVjOYoSUfXDF6nAjRsMzfqmftOar43GCHcP7LLSxyEAtWMgyauqFi04MwEUAXlO3wRg8m-BGlZk-=w832-h1248-s-no-gm?authuser=0', description: 'เจนภาพสไตล์ Minecraft' },
        ];

        // Get DOM elements
        const gallery = document.getElementById('gallery');
        const imageModal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalCategory = document.getElementById('modal-category');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const categoryButtons = document.querySelectorAll('.category-tab');

        // Function to render the gallery items
        const renderGallery = (filteredArtworks) => {
            gallery.innerHTML = ''; // Clear previous items
            filteredArtworks.forEach(artwork => {
                const item = document.createElement('div');
                item.className = 'gallery-image-container relative rounded-xl overflow-hidden bg-gray-800 group';
                item.innerHTML = `
                    <img src="${artwork.url}" alt="${artwork.title}" class="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h4 class="text-white text-lg font-semibold">${artwork.title}</h4>
                        <p class="text-gray-300 text-sm">${getThaiCategory(artwork.category)}</p>
                    </div>
                `;
                item.addEventListener('click', () => showModal(artwork));
                gallery.appendChild(item);
            });
        };

        // Function to map category slugs to Thai names
        const getThaiCategory = (category) => {
            switch (category) {
                case 'scifi': return 'แนวไซไฟ';
                case 'fantasy': return 'แนวแฟนตาซี';
                case 'abstract': return 'แนวนามธรรม';
                case 'minecraft': return 'แนวมายคราฟ';
                default: return '';
            }
        };

        // Function to filter the gallery based on category
        const filterGallery = (category) => {
            // Remove 'active' class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            document.getElementById(`${category}-btn`).classList.add('active');

            const filteredArtworks = category === 'all' ? artworks : artworks.filter(item => item.category === category);
            renderGallery(filteredArtworks);
        };

        // Function to show the modal with image details
        const showModal = (artwork) => {
            modalImage.src = artwork.url;
            modalTitle.textContent = artwork.title;
            modalCategory.textContent = getThaiCategory(artwork.category);
            imageModal.classList.remove('hidden');
        };

        // Function to hide the modal
        const hideModal = () => {
            imageModal.classList.add('hidden');
        };

        // Event listeners
        closeModalBtn.addEventListener('click', hideModal);
        imageModal.addEventListener('click', (e) => {
            if (e.target.id === 'image-modal') {
                hideModal();
            }
        });

        // Initial rendering of all artworks on page load
        document.addEventListener('DOMContentLoaded', () => {
            renderGallery(artworks);
        });