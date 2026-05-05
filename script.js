let state = {
    apiBase: localStorage.getItem('blixa_url') || 'https://openrouter.ai/api/v1',
    apiKey: localStorage.getItem('blixa_key') || '',
    model: 'google/gemini-2.0-flash-001',
    chats: JSON.parse(localStorage.getItem('blixa_chats')) || [],
    currentChatId: null,
    isDarkMode: localStorage.getItem('blixa_theme') === 'dark',
    isTyping: false
};

const elements = {
    chatContainer: document.getElementById('chat-container'),
    chatList: document.getElementById('chat-list'),
    userInput: document.getElementById('user-input'),
    sendBtn: document.getElementById('send-btn'),
    welcomeView: document.getElementById('welcome-view'),
    loader: document.getElementById('loader')
};

window.onload = () => {
    lucide.createIcons();
    if (state.isDarkMode) document.documentElement.classList.add('dark');
    renderChatList();
    setTimeout(() => {
        elements.loader.style.opacity = '0';
        setTimeout(() => elements.loader.remove(), 500);
    }, 1000);
};

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('-translate-x-full');
}

function toggleDarkMode() {
    state.isDarkMode = !state.isDarkMode;
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('blixa_theme', state.isDarkMode ? 'dark' : 'light');
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    elements.sendBtn.disabled = !textarea.value.trim();
}

function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

function saveSettings() {
    state.apiKey = document.getElementById('api-key-input').value;
    localStorage.setItem('blixa_key', state.apiKey);
    closeModal('settings-modal');
}

function renderChatList() {
    elements.chatList.innerHTML = state.chats.slice().reverse().map(chat => `
        <div class="p-4 rounded-xl cursor-pointer transition-all ${state.currentChatId === chat.id ? 'bg-brand-500 text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-400'}" onclick="loadChat(${chat.id})">
            <span class="text-xs font-black uppercase truncate block">${chat.title}</span>
        </div>
    `).join('');
}

function goHome() { location.reload(); }
function newChat() {
    state.currentChatId = null;
    elements.chatContainer.innerHTML = '';
    elements.chatContainer.appendChild(elements.welcomeView);
    elements.welcomeView.classList.remove('hidden');
}
