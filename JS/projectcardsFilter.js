export function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        const categories = card.dataset.category.split(',');
        if (category === 'All' || categories.includes(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

}