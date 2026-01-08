class Transport{
  create (type){
    let typeTransport
    if(type ==="car"){
      typeTransport = new Car()
    }
     else if (type === "bike"){
    typeTransport = new Bike()
  }else{
    console.log("Такий вид транспорту не підтримується")
  }
  
  return typeTransport;
  }
  
}

class Bike {
  constructor(){
    this.type = "bike"
  }
  ride(){
    return `Їжджу на байку`
  }
  
  stop(){
    return `Зупиняю байк`
  }
}

class Car {
  constructor(){
    this.type = "car"
  }
  ride(){
    return `Їжджу на машині`
  }
  

  
  stop(){
    return `Зупиняю машину`
  }
}


const factory = new Transport();
const myCar = factory.create("car");
const myBike = factory.create("bike");

console.log(myCar.ride());  
console.log(myBike.stop()); 



let currentPage = 1;


async function loadPage(page) {
    const container = document.getElementById('characters-container');
    
    
    container.innerHTML = "<p class='text-center text-xl font-bold py-10'>Loading...</p>";
    
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await response.json();
        
        displayCharacters(data);
        
        
        
        let pageNumDisplay;
        if (data.info.next) {
            
            const urlParams = new URLSearchParams(data.info.next.split('?')[1]);
            pageNumDisplay = parseInt(urlParams.get('page')) - 1; 
        } else {
            pageNumDisplay = data.info.pages;
        }
        
        document.getElementById('current-page-display').innerText = pageNumDisplay;

       
        document.getElementById('prev-btn').disabled = (page === 1);
        document.getElementById('next-btn').disabled = !data.info.next;

    } catch (error) {
        container.innerHTML = "<p class='text-red-500'>Помилка завантаження!</p>";
    }
}

const displayCharacters = (data) => {
    const container = document.getElementById('characters-container');
    container.innerHTML = ""; 

    data.results.forEach(character => {
        
        const statusColor = character.status === 'Alive' ? 'bg-green-500' : 'bg-red-500';

        const card = `
            <div class="flex items-center p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <img src="${character.image}" alt="${character.name}" class="w-20 h-20 rounded-full border-2 border-gray-200 object-cover">
                
                <div class="ml-4">
                    <h3 class="text-xl font-bold text-gray-800 uppercase tracking-tight">${character.name}</h3>
                    <div class="flex items-center mt-1">
                        <span class="w-3 h-3 ${statusColor} rounded-full mr-2"></span>
                        <p class="text-gray-600 font-medium">Status: ${character.status}</p>
                    </div>
                    <p class="text-sm text-gray-400 mt-1">Species: ${character.species}</p>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
};




document.getElementById('next-btn').addEventListener('click', () => {
    currentPage++;
    loadPage(currentPage);
});


document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadPage(currentPage);
    }
});


loadPage(currentPage);