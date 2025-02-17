document.addEventListener("DOMContentLoaded", function () {
    let gallery = document.querySelector(".photo-container");
    let images = document.querySelectorAll(".photo-container img");
    let totalImages = images.length;
    let index = 1; // Mulai dari gambar kedua untuk menghindari loncatan
    let startX, moveX, isSwiping = false;

    // 🔄 Duplikasi gambar pertama & terakhir untuk loop seamless
    let firstClone = images[0].cloneNode(true);
    let lastClone = images[totalImages - 1].cloneNode(true);
    gallery.appendChild(firstClone);
    gallery.insertBefore(lastClone, images[0]);

    let allImages = document.querySelectorAll(".photo-container img");
    let totalSlides = allImages.length;
    gallery.style.transform = `translateX(-100%)`; // Mulai dari slide pertama (bukan clone)

    function swipeGallery() {
        if (index >= totalSlides - 1) {
            index = 1; // Langsung balik ke slide pertama (bukan clone)
            gallery.style.transition = "none"; 
            gallery.style.transform = `translateX(-100%)`;
        } else {
            index++;
            gallery.style.transition = "transform 0.5s ease-in-out";
            let offset = -index * 100;
            gallery.style.transform = `translateX(${offset}%)`;
        }
    }

    let autoSwipe = setInterval(swipeGallery, 3000); // Auto swipe setiap 3 detik

    // 🌟 Swipe dengan tangan (Touch Gesture)
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
        if (moveX < -50) {
            index++;
        } else if (moveX > 50) {
            index--;
        }

        gallery.style.transition = "transform 0.5s ease-in-out";
        let offset = -index * 100;
        gallery.style.transform = `translateX(${offset}%)`;

        if (index <= 0) {
            setTimeout(() => {
                gallery.style.transition = "none";
                index = totalSlides - 2;
                let resetOffset = -index * 100;
                gallery.style.transform = `translateX(${resetOffset}%)`;
            }, 500);
        } else if (index >= totalSlides - 1) {
            setTimeout(() => {
                gallery.style.transition = "none";
                index = 1;
                let resetOffset = -index * 100;
                gallery.style.transform = `translateX(${resetOffset}%)`;
            }, 500);
        }

        isSwiping = false;
        autoSwipe = setInterval(swipeGallery, 3000);
    });

    // 🌸 Animasi Love Floating
    document.addEventListener("click", function (e) {
        let love = document.createElement("div");
        love.classList.add("love");
        love.innerHTML = "❤️";
        love.fontSize = "50px";
        love.style.left = `${e.clientX}px`;
        love.style.top = `${e.clientY}px`;
        document.body.appendChild(love);

        setTimeout(() => {
            love.remove();
        }, 3000);
    });
});
