document.addEventListener('DOMContentLoaded', () => {
    const acToggleBtn = document.getElementById('ac-toggle-btn');
    const body = document.body;

    acToggleBtn.addEventListener('click', () => {
        const isAcOn = body.classList.contains('body-ac-on');
        
        if (isAcOn) {
            // Turn OFF
            body.classList.remove('body-ac-on');
            body.classList.replace('cool-theme', 'desert-theme');
            acToggleBtn.textContent = 'OFF';
        } else {
            // Turn ON
            body.classList.add('body-ac-on');
            body.classList.replace('desert-theme', 'cool-theme');
            acToggleBtn.textContent = 'ON';
        }
    });
});
