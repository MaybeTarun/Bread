document.addEventListener("DOMContentLoaded", function() {
    const breadImages = document.querySelectorAll('.bread');
    const counterText = document.querySelector('.countertext');
    let breadCount = 0;
    const spawnedPositions = [];

    const popSound = document.getElementById('popSound');
    popSound.playbackRate = 2; 

    breadImages.forEach(bread => {
        const initialPosition = getRandomPosition();
        const initialRotation = getRandomRotation();
        bread.style.left = `${initialPosition.x}px`;
        bread.style.top = `${initialPosition.y}px`;
        bread.style.transform = `rotate(${initialRotation}deg)`;

        bread.addEventListener('click', (event) => {
            bread.classList.add('clicked');
            breadCount++;
            updateCounter();
            playSound(popSound);

            const yumText = document.createElement('div');
            yumText.textContent = 'Yum!';
            yumText.classList.add('yum-text');
            yumText.style.position = 'absolute';
            yumText.style.left = event.pageX + 'px';
            yumText.style.top = event.pageY + 'px';
            document.body.appendChild(yumText);

            setTimeout(() => {
                yumText.remove();
            }, 1000);

            setTimeout(() => {
                bread.classList.remove('clicked');
                const position = getRandomPosition();
                const rotation = getRandomRotation();
                bread.style.left = `${position.x}px`; 
                bread.style.top = `${position.y}px`; 
                bread.style.transform = `rotate(${rotation}deg)`;
            }, 4000);
        });
    });

    function updateCounter() {
        counterText.textContent = `You collected ${breadCount}x `;
    }

    function getRandomPosition() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const radius = 300;
        const minDistance = 100;

        let randomX, randomY;
        do {
            randomX = Math.random() * (window.innerWidth - 100);
            randomY = Math.random() * (window.innerHeight - 100);
        } while (
            Math.sqrt((randomX - centerX) ** 2 + (randomY - centerY) ** 2) < radius ||
            spawnedPositions.some(position => Math.sqrt((randomX - position.x) ** 2 + (randomY - position.y) ** 2) < minDistance)
        );

        spawnedPositions.push({ x: randomX, y: randomY }); 

        return { x: randomX, y: randomY };
    }

    function getRandomRotation() {
        return Math.random() * 360;
    }

    function playSound(sound) {
        sound.currentTime = 0;
        sound.play();
    }
});
