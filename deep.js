let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: '5yx6BWlEVcY',
        playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: '5yx6BWlEVcY',
            controls: 0,
            showinfo: 0,
            modestbranding: 1
        },
        events: {
            onReady: (event) => {
                event.target.mute(); 
                event.target.playVideo();
            }
        }
    });
}

function toggleMusic() {
    const btn = document.getElementById('musicControl');

    if (player.isMuted()) {
        player.unMute();
        btn.innerText = '⏯️'; 
        btn.classList.add('playing'); 
    } else {
        player.mute();
        btn.innerText = '⏯️'; 
        btn.classList.remove('playing'); 
    }
}

// --- Gallery swipe & heart animation ---
document.addEventListener("DOMContentLoaded", function () {
    let gallery = document.querySelector(".photo-container");
    let images = document.querySelectorAll(".photo-container img");
    let totalImages = images.length;
    let index = 1;
    let startX, moveX, isSwiping = false;

    let firstClone = images[0].cloneNode(true);
    let lastClone = images[totalImages - 1].cloneNode(true);
    gallery.appendChild(firstClone);
    gallery.insertBefore(lastClone, images[0]);

    let allImages = document.querySelectorAll(".photo-container img");
    let totalSlides = allImages.length;
    gallery.style.transform = `translateX(-100%)`;

    function swipeGallery() {
        if (index >= totalSlides - 1) {
            index = 1;
            gallery.style.transition = "none";
            gallery.style.transform = `translateX(-100%)`;
        } else {
            index++;
            gallery.style.transition = "transform 0.5s ease-in-out";
            let offset = -index * 100;
            gallery.style.transform = `translateX(${offset}%)`;
        }
    }

    let autoSwipe = setInterval(swipeGallery, 3000);

    gallery.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
        clearInterval(autoSwipe);
    });

    gallery.addEventListener("touchmove", (e) => {
        if (!isSwiping) return;
        moveX = e.touches[0].clientX - startX;
        gallery.style.transform = `translateX(calc(-${index * 100}% + ${moveX}px))`;
    });

    gallery.addEventListener("touchend", () => {
        if (moveX < -50) index++;
        else if (moveX > 50) index--;

        gallery.style.transition = "transform 0.5s ease-in-out";
        let offset = -index * 100;
        gallery.style.transform = `translateX(${offset}%)`;

        if (index <= 0) {
            setTimeout(() => {
                gallery.style.transition = "none";
                index = totalSlides - 2;
                gallery.style.transform = `translateX(-${index * 100}%)`;
            }, 500);
        } else if (index >= totalSlides - 1) {
            setTimeout(() => {
                gallery.style.transition = "none";
                index = 1;
                gallery.style.transform = `translateX(-${index * 100}%)`;
            }, 500);
        }

        isSwiping = false;
        autoSwipe = setInterval(swipeGallery, 3000);
    });

    // Floating love ❤️
    document.addEventListener("click", function (e) {
        let love = document.createElement("div");
        love.classList.add("love");
        love.innerHTML = "❤️";
        love.style.position = "absolute";
        love.style.left = `${e.clientX}px`;
        love.style.top = `${e.clientY}px`;
        love.style.fontSize = "24px";
        love.style.pointerEvents = "none";
        document.body.appendChild(love);

        setTimeout(() => love.remove(), 2000);
    });
});
