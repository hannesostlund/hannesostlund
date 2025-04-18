let currentImageIndex = 0;
const images = [
    {
        src: 'Photo101.jpg',
        alt: 'Hannes Östlund - Utan titel (Endymion) (silvergelatinfotografi, tonat i guldklorid, 2024–2025)',
        title: 'Utan titel (Endymion)',
        year: '2024–2025',
        material: 'Silvergelatinfotografi, tonat i guldklorid',
        dimensions: '80 x 110 mm'
    },
    {
        src: 'Photo2.png',
        alt: 'Hannes Östlund - Utan titel (glasnegativ, silvergelatin på glas, 2023)',
        title: 'Utan titel',
        year: '2023',
        material: 'Glasnegativ (silvergelatin på glas)',
        dimensions: '88 x 119 x 2 mm'
    },
    {
        src: 'Photo3.png',
        alt: 'Hannes Östlund - Utan titel (glasnegativ, silvergelatin på glas, 2024)',
        title: 'Utan titel',
        year: '2024',
        material: 'Glasnegativ (silvergelatin på glas)',
        dimensions: '88 x 119 x 2 mm'
    },
    {
        src: 'Photo4.png',
        alt: 'Hannes Östlund - Utan titel (glasnegativ, silvergelatin på glas, 2024)',
        title: 'Utan titel',
        year: '2024',
        material: 'Glasnegativ (silvergelatin på glas)',
        dimensions: '88 x 119 x 2 mm'
    },
    {
        src: 'Photo5.png',
        alt: 'Hannes Östlund - Utan titel (glasnegativ, silvergelatin på glas, 2024)',
        title: 'Utan titel',
        year: '2024',
        material: 'Glasnegativ (silvergelatin på glas)',
        dimensions: '88 x 119 x 2 mm'
    },
    {
        src: 'Photo6.png',
        alt: 'Hannes Östlund - Utan titel (Endymion) (glasnegativ, silvergelatin på glas, 2024)',
        title: 'Utan titel',
        year: '2024',
        material: 'Glasnegativ (silvergelatin på glas)',
        dimensions: '88 x 119 x 2 mm'
    },
    {
        src: 'Photo7.png',
        alt: 'Hannes Östlund - Utan titel (glasnegativ, silvergelatin på glas, 2024)',
        title: 'Utan titel',
        year: '2024',
        material: 'Glasnegativ (silvergelatin på glas)',
        dimensions: '180 x 240 x 2 mm'
    },
    {
        src: 'Photo8.png',
        alt: 'Hannes Östlund - Utan titel (glasnegativ, silvergelatin på glas, 2025)',
        title: 'Utan titel',
        year: '2025',
        material: 'Glasnegativ (silvergelatin på glas)',
        dimensions: '180 x 240 x 2 mm'
    }
];

// Globala variabler för zoom och pan
let zoomLevel = 1;
let translateY = 0;
let translateX = 0; // Ny variabel för horisontell förflyttning

// Variabler för dragfunktion
let isDragging = false;
let startY = 0;
let startTranslateY = 0;
let startX = 0;            // Ny variabel för startposition x
let startTranslateX = 0;   // Ny variabel för att spara den initiala x-förflyttningen

function updateImageTransform() {
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
        // Uppdatera muspekaren beroende på zoomnivå
        modalImage.style.cursor = zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default';
    }
}

function updateImageText(index) {
    const imageInfo = images[index];
    const overlayText = document.getElementById('galleryOverlayText');
    overlayText.innerHTML = `<i>${imageInfo.title}</i><br>${imageInfo.year}<br>${imageInfo.material}<br>${imageInfo.dimensions}`;
    overlayText.style.opacity = '1';
}

function changeImage(imageSrc, index) {
    const largeImage = document.getElementById('largeImage');
    const thumbnails = document.querySelectorAll('.thumbnails img');

    largeImage.style.opacity = 0;
    setTimeout(() => {
        largeImage.src = imageSrc;
        largeImage.style.opacity = 1;
        updateImageText(index);
    }, 300);

    thumbnails[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
    });

    currentImageIndex = index;
}

function toggleOverlayText() {
    const overlayText = document.getElementById('galleryOverlayText');
    overlayText.style.opacity = overlayText.style.opacity === '1' ? '0' : '1';
}

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';
}

// Uppdatera räknaren i fullskärmsläget
function updateImageCounter() {
    const counterElem = document.getElementById("imageCounter");
    if (counterElem) {
        counterElem.textContent = `${currentImageIndex + 1}/${images.length}`;
    }
}

function openFullscreenModal() {
    console.log("openFullscreenModal anropad");
    let modal = document.getElementById('fullscreenModal');
    if (!modal) {
        // Återställ zoom och pan vid öppning
        zoomLevel = 1;
        translateY = 0;
        translateX = 0;
        modal = document.createElement('div');
        modal.id = 'fullscreenModal';
        modal.classList.add('fullscreen-modal');
        modal.innerHTML = `
            <div class="modal-header">
                <span id="closeModal" class="close">&times;</span>
            </div>
            <!-- Räknaren placeras uppe till vänster -->
            <div id="imageCounter" class="image-counter">${currentImageIndex + 1}/${images.length}</div>
            <!-- Zoom-kontroller placerade i nedre högra hörnet -->
            <div id="zoomControls" class="zoom-controls">
                <button id="zoomOut" class="zoom-btn">-</button>
                <button id="zoomIn" class="zoom-btn">+</button>
            </div>
            <div class="modal-content">
                <span id="prevArrow" class="arrow left">&#10094;</span>
                <img id="modalImage" src="${images[currentImageIndex].src}" alt="Fullscreen Image">
                <span id="nextArrow" class="arrow right">&#10095;</span>
            </div>
            <div class="modal-info" id="modalInfo">
                <div id="modalOverlayText">
                    <i>${images[currentImageIndex].title}</i><br>
                    ${images[currentImageIndex].year}<br>
                    ${images[currentImageIndex].material}<br>
                    ${images[currentImageIndex].dimensions}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        document.getElementById('closeModal').addEventListener('click', closeFullscreenModal);
        document.getElementById('prevArrow').addEventListener('click', () => changeFullscreenImage(-1));
        document.getElementById('nextArrow').addEventListener('click', () => changeFullscreenImage(1));

        // Zoom-knappar med större steg
        document.getElementById('zoomIn').addEventListener('click', () => {
            zoomLevel = Math.min(zoomLevel + 3, 3); // Max zoom = 3
            updateImageTransform();
        });
        document.getElementById('zoomOut').addEventListener('click', () => {
            zoomLevel = Math.max(zoomLevel - 3, 1); // Min zoom = 1
            if (zoomLevel === 1) {
                translateY = 0;
                translateX = 0;
            }
            updateImageTransform();
        });

        const modalImage = document.getElementById('modalImage');
        // Lägg till mousedown-lyssnare direkt på bilden
        modalImage.addEventListener('mousedown', (e) => {
            if (zoomLevel > 1) {
                e.preventDefault();
                isDragging = true;
                startY = e.clientY;
                startTranslateY = translateY;
                startX = e.clientX;              // Spara startposition x
                startTranslateX = translateX;    // Spara den initiala x-förflyttningen
                modalImage.style.cursor = 'grabbing';
                // Lägg till musrörelse- och mouseup-lyssnare
                window.addEventListener('mousemove', dragHandler);
                window.addEventListener('mouseup', stopDrag);
            }
        });
    }
    updateImageCounter();
}

function dragHandler(e) {
    if (isDragging) {
        const dy = e.clientY - startY;
        const dx = e.clientX - startX;
        translateY = startTranslateY + dy;
        translateX = startTranslateX + dx;
        updateImageTransform();
    }
}

function stopDrag(e) {
    if (isDragging) {
        isDragging = false;
        const modalImage = document.getElementById('modalImage');
        modalImage.style.cursor = 'grab';
        window.removeEventListener('mousemove', dragHandler);
        window.removeEventListener('mouseup', stopDrag);
    }
}

function closeFullscreenModal() {
    console.log("closeFullscreenModal anropad");
    const modal = document.getElementById('fullscreenModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
        window.removeEventListener('mousemove', dragHandler);
        window.removeEventListener('mouseup', stopDrag);
    }
}

function changeFullscreenImage(direction) {
    console.log("changeFullscreenImage anropad med direction:", direction);
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    changeImage(images[currentImageIndex].src, currentImageIndex);

    const modalImage = document.getElementById('modalImage');
    const modalOverlayText = document.getElementById('modalOverlayText');
    if (modalImage && modalOverlayText) {
        modalImage.style.opacity = 0;
        setTimeout(() => {
            modalImage.src = images[currentImageIndex].src;
            modalImage.style.opacity = 1;
            modalOverlayText.innerHTML = `<i>${images[currentImageIndex].title}</i><br>
                                          ${images[currentImageIndex].year}<br>
                                          ${images[currentImageIndex].material}<br>
                                          ${images[currentImageIndex].dimensions}`;
            // Vid bildbyte återställs zoom och pan
            zoomLevel = 1;
            translateY = 0;
            translateX = 0;
            updateImageTransform();
            updateImageCounter();
        }, 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateImageText(currentImageIndex);
    
    const largeImage = document.getElementById('largeImage');

    if (window.innerWidth > 768) {
        console.log("Desktop-detektion: fullskärmsläge aktiverat");
        largeImage.addEventListener('click', openFullscreenModal);
    } else {
        console.log("Mobil-detektion: toggla overlay-text");
        largeImage.addEventListener('click', toggleOverlayText);
    }
    
    const thumbnailsWrapper = document.querySelector('.thumbnails-wrapper');
    thumbnailsWrapper.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            const scrollLeft = thumbnailsWrapper.scrollLeft;
            const maxScrollLeft = thumbnailsWrapper.scrollWidth - thumbnailsWrapper.clientWidth;
            if (scrollLeft <= 1) {
                thumbnailsWrapper.classList.add('hide-left-fade');
            } else {
                thumbnailsWrapper.classList.remove('hide-left-fade');
            }
            if (scrollLeft >= maxScrollLeft - 1) {
                thumbnailsWrapper.classList.add('hide-right-fade');
            } else {
                thumbnailsWrapper.classList.remove('hide-right-fade');
            }
        });
    });

    const scrollLeft = thumbnailsWrapper.scrollLeft;
    const maxScrollLeft = thumbnailsWrapper.scrollWidth - thumbnailsWrapper.clientWidth;
    if (scrollLeft === 0) {
        thumbnailsWrapper.classList.add('hide-left-fade');
    }
    if (scrollLeft >= maxScrollLeft) {
        thumbnailsWrapper.classList.add('hide-right-fade');
    }
});

// Ny eventlyssnare för ensamma bilder (photo101 och photo102)
document.querySelectorAll('.image-wrapper.photo101 img, .image-wrapper.photo102 img')
    .forEach(img => {
        img.addEventListener('click', (e) => {
            // Stoppa eventuell bubbla om du inte vill att andra klickhändelser ska triggas
            e.stopPropagation();
            openFullscreenModalSingle(img);
        });
});

/* Mejladressen (säkrare mot skräppost än att skriva ut i html), blir blå länk utan css */
document.addEventListener("DOMContentLoaded", function () {
    const user = "hannesostlund";
    const domain = "hotmail.com";
    const email = user + "@" + domain;

    const emailLink = document.createElement("a");
    emailLink.href = "mailto:" + email;
    emailLink.textContent = email;

    document.getElementById("emailPlaceholder").appendChild(emailLink);
});

// Funktion för att öppna fullskärmsläge för en ensam bild
function openFullscreenModalSingle(imageElement) {
    // Återställ zoom och pan
    zoomLevel = 1;
    translateY = 0;
    translateX = 0;
    // Skapa modalelementet
    const modal = document.createElement('div');
    modal.id = 'fullscreenModalSingle';
    modal.classList.add('fullscreen-modal');
    modal.innerHTML = `
        <div class="modal-header">
            <span id="closeModalSingle" class="close">&times;</span>
        </div>
        <div class="modal-content">
            <img id="modalImageSingle" src="${imageElement.src}" alt="${imageElement.alt}">
        </div>
        <div id="zoomControlsSingle" class="zoom-controls">
            <button id="zoomOutSingle" class="zoom-btn">-</button>
            <button id="zoomInSingle" class="zoom-btn">+</button>
        </div>
        <div class="modal-info" id="modalInfoSingle">
            <div id="modalOverlayTextSingle">
                ${getOverlayText(imageElement)}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Stäng-knapp
    document.getElementById('closeModalSingle').addEventListener('click', closeFullscreenModalSingle);

    // Zoom-knappar
    document.getElementById('zoomInSingle').addEventListener('click', () => {
        zoomLevel = Math.min(zoomLevel + 3, 3); // max zoom = 3
        updateImageTransformSingle();
    });
    document.getElementById('zoomOutSingle').addEventListener('click', () => {
        zoomLevel = Math.max(zoomLevel - 3, 1); // min zoom = 1
        if (zoomLevel === 1) {
            translateY = 0;
            translateX = 0;
        }
        updateImageTransformSingle();
    });

    // Lägg till drag-funktion för pan (på samma sätt som för galleriet)
    const modalImageSingle = document.getElementById('modalImageSingle');
    modalImageSingle.addEventListener('mousedown', (e) => {
        if (zoomLevel > 1) {
            e.preventDefault();
            isDragging = true;
            startY = e.clientY;
            startTranslateY = translateY;
            startX = e.clientX;
            startTranslateX = translateX;
            modalImageSingle.style.cursor = 'grabbing';
            window.addEventListener('mousemove', dragHandlerSingle);
            window.addEventListener('mouseup', stopDragSingle);
        }
    });
}

function updateImageTransformSingle() {
    const modalImageSingle = document.getElementById('modalImageSingle');
    if (modalImageSingle) {
        modalImageSingle.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
        modalImageSingle.style.cursor = zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default';
    }
}

function dragHandlerSingle(e) {
    if (isDragging) {
        const dy = e.clientY - startY;
        const dx = e.clientX - startX;
        translateY = startTranslateY + dy;
        translateX = startTranslateX + dx;
        updateImageTransformSingle();
    }
}

function stopDragSingle(e) {
    if (isDragging) {
        isDragging = false;
        const modalImageSingle = document.getElementById('modalImageSingle');
        if (modalImageSingle) {
            modalImageSingle.style.cursor = 'grab';
        }
        window.removeEventListener('mousemove', dragHandlerSingle);
        window.removeEventListener('mouseup', stopDragSingle);
    }
}

function closeFullscreenModalSingle() {
    const modal = document.getElementById('fullscreenModalSingle');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
        window.removeEventListener('mousemove', dragHandlerSingle);
        window.removeEventListener('mouseup', stopDragSingle);
    }
}

// Hjälpfunktion för att hämta overlaytexten från den ensamma bildens HTML
function getOverlayText(imageElement) {
    // Letar efter ett syskon-element med klassen .image-overlay i samma förälder
    let overlay = imageElement.parentElement.querySelector('.image-overlay');
    if (overlay) {
        return overlay.innerHTML;
    }
    return '';
}



