// AI Site Builder JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initializeDragAndDrop();
    initializeAIChat();
});

// Drag and Drop Functionality
function initializeDragAndDrop() {
    const blocks = document.querySelectorAll('.block');
    const dropZone = document.querySelector('.drop-zone');

    blocks.forEach(block => {
        block.addEventListener('dragstart', handleDragStart);
        block.addEventListener('dragend', handleDragEnd);
    });

    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleDrop);
}

function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.textContent);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

function handleDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    
    // Create a new block in the preview area
    const newBlock = document.createElement('div');
    newBlock.className = 'block';
    newBlock.textContent = data;
    
    // Clear the placeholder text if it's the first block
    if (e.target.classList.contains('drop-zone') && e.target.textContent.includes('Drag blocks here')) {
        e.target.textContent = '';
    }
    
    e.target.appendChild(newBlock);
    simulateAIResponse(`Great choice! I've added a ${data} to your layout. Would you like suggestions for content or styling?`);
}

// AI Chat Functionality
function initializeAIChat() {
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');

    sendButton.addEventListener('click', () => sendMessage(chatInput.value));
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage(chatInput.value);
        }
    });
}

function sendMessage(message) {
    if (!message.trim()) return;

    // Add user message
    const chatMessages = document.querySelector('.chat-messages');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);

    // Clear input
    document.querySelector('.chat-input input').value = '';

    // Simulate AI response
    const response = generateAIResponse(message);
    simulateAIResponse(response);
}

function simulateAIResponse(response) {
    setTimeout(() => {
        const chatMessages = document.querySelector('.chat-messages');
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai';
        aiMessage.textContent = response;
        chatMessages.appendChild(aiMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

function generateAIResponse(message) {
    // Simple response generation based on keywords
    const messageLower = message.toLowerCase();
    
    if (messageLower.includes('help')) {
        return "I'm here to help! You can drag blocks from the library to build your site. What would you like to create?";
    } else if (messageLower.includes('style') || messageLower.includes('design')) {
        return "I can suggest modern design patterns and color schemes. Would you like to see some options?";
    } else if (messageLower.includes('content')) {
        return "I can help generate content for your website. What type of content do you need?";
    } else {
        return "I understand you're working on your website. How can I assist you with that?";
    }
}