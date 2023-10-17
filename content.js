const hideReelsBasedOnIcon = () => {
    const elements = document.querySelectorAll('i[data-visualcompletion="css-img"]');

    elements.forEach(element => {
        const style = window.getComputedStyle(element);
        const bgImage = style.backgroundImage;
        if (bgImage && bgImage.includes("https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/qJQphCq64kQ.png")) {
            let targetDiv = element.closest('div'); // Direct parent div

            // Traverse upwards until we reach the main parent div
            for (let i = 0; i < 6; i++) {
                if (!targetDiv) break;
                targetDiv = targetDiv.parentElement;
            }

            if (targetDiv) {
                // Hide the main parent div
                targetDiv.style.display = 'none';

                // Hide the previous three div siblings
                let sibling = targetDiv;
                for (let i = 0; i < 3; i++) {
                    sibling = sibling.previousElementSibling;
                    if (sibling) {
                        sibling.style.display = 'none';
                    }
                }
            }
        }
    });
};

const hideAdsBasedOnSVG = () => {
    const adElements = document.querySelectorAll('svg[title="Shared with Public"]');

    adElements.forEach(adElement => {
        let targetDiv = adElement.closest('div'); // Direct parent div

        // Traverse upwards until we reach the main parent div
        for (let i = 0; i < 6; i++) {
            if (!targetDiv) break;
            targetDiv = targetDiv.parentElement;
        }

        if (targetDiv) {
            targetDiv.style.display = 'none';
        }
    });
};

// MutationObserver setup
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            hideReelsBasedOnIcon();
            hideAdsBasedOnSVG();
        }
    });
});

const config = {
    childList: true,
    subtree: true
};

observer.observe(document.body, config);
