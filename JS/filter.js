import { filterProjects } from "./projectcardsFilter";
const buttons = document.querySelectorAll('.filter-button');
// Attach event listeners
buttons.forEach(button => {
    button.addEventListener('click', function () {
        filterProjects(this.getAttribute('data-category'));
    });
});

// Set default filter to "All"
filterProjects('All');