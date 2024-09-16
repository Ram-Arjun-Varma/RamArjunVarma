document.querySelector('.chatbot-toggle').addEventListener('click', function () {
    const chatbotContainer = document.querySelector('.chatbot-container');
    chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
});

document.querySelectorAll('.predefined-question').forEach(function (element) {
    element.addEventListener('click', function () {
        const answer = this.getAttribute('data-answer');
        document.getElementById('chatbot-answer').innerText = answer;
    });
    
});