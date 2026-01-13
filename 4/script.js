let currentPage = 1;
let isFetching = false; 
let hasNextPage = true;

const container = document.getElementById('characters-container');
const loader = document.getElementById('loading-indicator');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');


async function loadCharacters(page) {
    if (isFetching || !hasNextPage) return;
    isFetching = true;
    loader.classList.remove('hidden');

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await response.json();
        
        hasNextPage = !!data.info.next;
        renderCharacters(data.results);
    } catch (error) {
        console.error("Помилка:", error);
    } finally {
        isFetching = false;
        loader.classList.add('hidden');
    }
}


function renderCharacters(characters) {
    characters.forEach(char => {
        const statusColor = char.status === 'Alive' ? 'bg-green-500' : 'bg-red-500';
        const card = `
            <div class="character-card flex items-center p-4 bg-white rounded-xl shadow-md cursor-pointer hover:scale-[1.02] transition-transform border border-gray-100" 
                 data-id="${char.id}">
                <img src="${char.image}" class="w-16 h-16 rounded-full pointer-events-none">
                <div class="ml-4 pointer-events-none">
                    <h3 class="text-lg font-bold">${char.name}</h3>
                    <p class="text-sm text-gray-500">${char.status} - ${char.species}</p>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', card);
    });
}


container.addEventListener('click', async (event) => {
    const card = event.target.closest('.character-card');
    if (!card) return;

    const charId = card.dataset.id;
    openModal(charId);
});

async function openModal(id) {
    modal.classList.remove('hidden');
    modalContent.innerHTML = "<p class='py-10 text-blue-600 font-bold'>Loading...</p>";

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const char = await response.json();

        modalContent.innerHTML = `
            <img src="${char.image}" class="w-48 h-48 rounded-xl mx-auto mb-4 border-4 border-blue-100">
            <h2 class="text-2xl font-bold mb-2">${char.name}</h2>
            <p class="text-lg text-gray-700">Status: <span class="font-bold">${char.status}</span></p>
            <p class="text-gray-500">Species: ${char.species}</p>
            <p class="text-gray-500">Gender: ${char.gender}</p>
            <button id="close-btn-inner" class="mt-6 px-8 py-2 bg-blue-600 text-white rounded-lg font-bold">Закрити</button>
        `;
    } catch (e) {
        modalContent.innerHTML = "Помилка завантаження";
    }
}


modal.addEventListener('click', (e) => {
    
    if (e.target.id === 'modal' || e.target.id === 'close-modal' || e.target.id === 'close-btn-inner') {
        modal.classList.add('hidden');
    }
});


window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        currentPage++;
        loadCharacters(currentPage);
    }
});


loadCharacters(currentPage);