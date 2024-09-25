
const cardContainer = document.getElementById('card-container');
const searchInput = document.getElementById('search');
let allItems = [];


async function fetchData() {
    try {
        const response = await fetch('https://data-lesson-13.vercel.app/phones'); // API URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        allItems = data; 
        displayCards(allItems); 
    } catch (error) {
        console.error('Ma\'lumotlarni olishda xato:', error);
    }
}

// Kartalarni ko'rsatish funksiyasi
function displayCards(items) {
    cardContainer.innerHTML = ''; // Kartalarni tozalash

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow';

        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="h-48 w-full object-cover rounded mb-4">
            <h2 class="text-lg font-bold mb-2">${item.title}</h2>
            <p class="text-gray-600 mb-2">${item.brand}</p>
            <p class="text-blue-500 font-semibold">$${item.price}</p>
        `;

        cardContainer.appendChild(card);
    });
}

// Qidiruv funksiyasi
searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredItems = allItems.filter(item =>
        item.brand.toLowerCase().includes(searchTerm) ||
        item.title.toLowerCase().includes(searchTerm)
    );
    displayCards(filteredItems);
});

// Ma'lumotlarni yuklash
fetchData();




