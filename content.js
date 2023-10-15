const hideReelsBasedOnIcon = () => {
    const elements = document.querySelectorAll('i[data-visualcompletion="css-img"]');

    elements.forEach(element => {
        const style = window.getComputedStyle(element);
        const bgImage = style.backgroundImage;
        if (bgImage && bgImage.includes("https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/AI_f_kwC-um.png")) {
            let targetDiv = element.closest('div');

            for (let i = 0; i < 6; i++) {
                if (!targetDiv) break;
                targetDiv = targetDiv.parentElement;
            }

            if (targetDiv) {
                targetDiv.style.display = 'none';

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
        let targetDiv = adElement.closest('div');

        for (let i = 0; i < 6; i++) {
            if (!targetDiv) break;
            targetDiv = targetDiv.parentElement;
        }

        if (targetDiv) {
            targetDiv.style.display = 'none';
        }
    });
};

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

