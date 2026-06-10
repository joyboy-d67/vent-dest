document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const flyer3D = document.getElementById('flyer3d');
    const btnToggleFold = document.getElementById('btn-toggle-fold');
    const foldBtnText = document.getElementById('fold-btn-text');
    const btnToggleSide = document.getElementById('btn-toggle-side');
    const viewStateLabel = document.getElementById('view-state');
    
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Copy triggers
    const copyPromoTrigger = document.getElementById('copy-promo-trigger');
    const promoCode = document.getElementById('promo-code').innerText;
    
    const copyPhone = document.getElementById('copy-phone');
    const copyEmail = document.getElementById('copy-email');
    
    // Toast notification
    const toast = document.getElementById('toast-message');

    // --- State Variables ---
    let isOpen = false;
    let isBack = false;

    // --- Helper: Show Toast Notification ---
    const showToast = (message) => {
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    };

    // --- Helper: Update View State Label ---
    const updateViewState = () => {
        if (isBack) {
            viewStateLabel.innerText = "Dos (Quatrième de couv)";
            viewStateLabel.style.background = "#0f172a";
        } else {
            if (isOpen) {
                viewStateLabel.innerText = "Ouvert (Pages intérieures)";
                viewStateLabel.style.background = "#10b981"; // Green for open
            } else {
                viewStateLabel.innerText = "Fermé (Face couverture)";
                viewStateLabel.style.background = "#0284c7"; // Blue for cover
            }
        }
    };

    // --- Interactive 3D Controls ---
    
    // Toggle fold (Open/Close)
    btnToggleFold.addEventListener('click', () => {
        // If we are currently showing the back, flip back to front first
        if (isBack) {
            isBack = false;
            flyer3D.classList.remove('is-back');
            btnToggleSide.innerHTML = '<i class="fa-solid fa-rotate"></i> Voir la quatrième de couverture';
        }

        isOpen = !isOpen;
        if (isOpen) {
            flyer3D.classList.add('is-open');
            foldBtnText.innerText = "Fermer le flyer";
            btnToggleFold.innerHTML = '<i class="fa-solid fa-book"></i> Fermer le flyer';
        } else {
            flyer3D.classList.remove('is-open');
            foldBtnText.innerText = "Ouvrir le flyer";
            btnToggleFold.innerHTML = '<i class="fa-solid fa-book-open"></i> Ouvrir le flyer';
        }
        updateViewState();
    });

    // Toggle side (Front / Back Cover)
    btnToggleSide.addEventListener('click', () => {
        isBack = !isBack;
        
        if (isBack) {
            // If it is open, we close it first because back cover is viewed closed
            if (isOpen) {
                isOpen = false;
                flyer3D.classList.remove('is-open');
                btnToggleFold.innerHTML = '<i class="fa-solid fa-book-open"></i> Ouvrir le flyer';
            }
            flyer3D.classList.add('is-back');
            btnToggleSide.innerHTML = '<i class="fa-solid fa-rotate"></i> Voir la couverture (Face)';
        } else {
            flyer3D.classList.remove('is-back');
            btnToggleSide.innerHTML = '<i class="fa-solid fa-rotate"></i> Voir la quatrième de couverture';
        }
        updateViewState();
    });

    // --- Copy Actions ---

    // Copy Promo Code
    copyPromoTrigger.addEventListener('click', () => {
        navigator.clipboard.writeText(promoCode)
            .then(() => {
                showToast("Code promo CHAUD26 copié !");
            })
            .catch(err => {
                console.error("Erreur de copie : ", err);
            });
    });

    // Copy Phone Number
    copyPhone.addEventListener('click', () => {
        const phoneNum = "07 66 28 49 88";
        navigator.clipboard.writeText(phoneNum.replace(/\s/g, ''))
            .then(() => {
                showToast("Numéro de téléphone copié !");
            })
            .catch(err => {
                console.error("Erreur de copie : ", err);
            });
    });

    // Copy Email
    copyEmail.addEventListener('click', () => {
        const emailAddress = "info@vendest.fr";
        navigator.clipboard.writeText(emailAddress)
            .then(() => {
                showToast("Adresse email copiée !");
            })
            .catch(err => {
                console.error("Erreur de copie : ", err);
            });
    });

    // --- Theme Switcher ---
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        if (isDark) {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
        showToast(isDark ? "Mode sombre activé !" : "Mode clair activé !");
    });
});
