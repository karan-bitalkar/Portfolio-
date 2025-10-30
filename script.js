// Simple project modal
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const title = btn.dataset.title;
    const img = btn.dataset.img;
    const desc = btn.dataset.desc;
    const tech = btn.dataset.tech;
    const link = btn.dataset.link || '#';

    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-img').src = img;
    document.getElementById('modal-desc').textContent = desc;
    document.getElementById('modal-tech').textContent = 'Tech: ' + tech;
    document.getElementById('modal-link').href = link;

    document.getElementById('project-modal').style.display = 'flex';
  });
});

// close modal
document.querySelector('.modal-close').addEventListener('click', () => {
  document.getElementById('project-modal').style.display = 'none';
});
document.getElementById('project-modal').addEventListener('click', (e) => {
  if (e.target.id === 'project-modal') document.getElementById('project-modal').style.display = 'none';
});




// Chatbot toggle
const chatbotToggle = document.getElementById("chatbotToggle");
const chatbot = document.getElementById("chatbot");
const closeChatbot = document.getElementById("closeChatbot");
const chatBody = document.getElementById("chatbotBody");
const chatInput = document.getElementById("chatInput");
const sendMsg = document.getElementById("sendMsg");

// Open chatbot
chatbotToggle.addEventListener("click", () => {
  chatbot.style.display = "flex";
  chatbotToggle.style.display = "none";
});

// Close chatbot
closeChatbot.addEventListener("click", () => {
  chatbot.style.display = "none";
  chatbotToggle.style.display = "flex";
});

// Send message
sendMsg.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const msg = chatInput.value.trim();
  if (msg === "") return;

  // User message
  const userDiv = document.createElement("div");
  userDiv.classList.add("user-msg");
  userDiv.textContent = msg;
  chatBody.appendChild(userDiv);

  chatInput.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  // Bot reply delay
  setTimeout(() => {
    const botDiv = document.createElement("div");
    botDiv.classList.add("bot-msg");

    // Basic bot logic
    let reply = "I'm here to help you! 😊";
    if (msg.toLowerCase().includes("hello"))
      reply = "Hi there! 👋 How’s your day going?";
    else if (msg.toLowerCase().includes("project"))
      reply = "You can check out my projects below in the portfolio section!";
    else if (msg.toLowerCase().includes("contact"))
      reply = "You can reach me via the Contact section or on LinkedIn!";
    else if (msg.toLowerCase().includes("skills"))
      reply = "I'm skilled in HTML, CSS, JavaScript, React, Java, and Spring Boot!";
    else if (msg.toLowerCase().includes("bye"))
      reply = "Goodbye 👋 Have a great day!";

    botDiv.textContent = reply;
    chatBody.appendChild(botDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 500);
}







// Send message
async function sendMessage() {
  const msg = chatInput.value.trim();
  if (msg === "") return;

  const userDiv = document.createElement("div");
  userDiv.classList.add("user-msg");
  userDiv.textContent = msg;
  chatBody.appendChild(userDiv);
  chatInput.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  // Show "typing..."
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("bot-msg");
  typingDiv.textContent = "Typing...";
  chatBody.appendChild(typingDiv);

  chatBody.scrollTop = chatBody.scrollHeight;

  // Send to backend for ChatGPT reply
  try {
    const response = await fetch("chatgpt.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });

    const data = await response.json();
    typingDiv.textContent = data.reply || "Sorry, I didn’t get that 😅";
  } catch (error) {
    typingDiv.textContent = "Error connecting to AI 😢";
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}

