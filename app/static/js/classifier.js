document.getElementById('send-button').addEventListener('click', async function () {
    const emailInput = document.getElementById('email-input');
    const emailContent = emailInput.value.trim();
  
    if (!emailContent) {
      alert('Please enter some email content.');
      return;
    }
  
    // Add user input as a chat bubble
    addChatBubble(emailContent, 'user-bubble');
  
    // Clear the input field
    emailInput.value = '';
  
    // Simulate or fetch classification result
    const resultBubble = addChatBubble('Classifying...', 'response-bubble');
    
    try {
      const response = await fetch('http://127.0.0.1:5000/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_content: emailContent }),
      });
  
      const data = await response.json();
  
      // Update chat bubble with the result
      const resultText = data.is_spam ? 'This email is classified as SPAM!' : 'This email is classified as NOT SPAM!';
      updateChatBubble(resultBubble, resultText, data.is_spam ? '#ffcccc' : '#c8f7c5');
    } catch (error) {
      console.error('Error:', error);
      updateChatBubble(resultBubble, 'Error: Unable to classify the email.', '#f5a623');
    }
  });
  
  function addChatBubble(text, className) {
    const chatWindow = document.getElementById('chat-window');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${className}`;
    bubble.textContent = text;
    chatWindow.appendChild(bubble);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the latest bubble
    return bubble;
  }
  
  function updateChatBubble(bubble, text, bgColor) {
    bubble.textContent = text;
    bubble.style.backgroundColor = bgColor || bubble.style.backgroundColor;
  }
  