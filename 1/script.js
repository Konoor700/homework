//1 Написати програму, яка виводить числа від 1 до 10, використовуючи цикли for і while.  

console.log("Цикл for")
for(let i=1;i<=10;i++){
  console.log(i);
}

console.log("Цикл while")

let q = 0;
while(q<10){
  q++;
  console.log(q);
}

//2 Створити масив, що складається з елементів різних типів (примітивів) (число, рядок, булева змінна) довжиною 10 елементів. Вивести їх тип за допомогою typeof у консоль. Виведення здійсніть за допомогою перебору масиву різними способами: методом forEach, циклами for, while і do while.

console.log("Цикл for")

let arr = [1,'Hi',true,2,'Bad','JSON','Be',false,12,34];

for (let i = 0; i < arr.length; i++) {
  console.log(typeof arr[i]);
}

console.log("Цикл while")

let d = 0;

while(d<arr.length){
  
  console.log(typeof arr[d])
  d++;
}

console.log("Цикл do while")

let j = 0;

do{
  console.log(typeof(arr[j]) )
  j++;
}while(j<arr.length)


console.log("Метод forEach");

arr.forEach((element) => console.log(typeof(element)));

//3. Створити масив об'єктів (приклад об'єкта {name: ‘’, age: xx, pets: [cat, dog]}) і використати метод filter, щоб вивести всіх, кому більше 20 років.  

const arrObjects = [
  {name:"Inna",age:78,pets:["cat","dog"]},
  {name:"Aina",age:15,pets:["cat"]},
  {name:"Max",age:23,pets:["turtle"]},
  {name:"Viktor",age:35,pets:[]},
  {name:"Adam",age:3,pets:["dog","cow"]}
  
  ]
  

const result = arrObjects.filter((persons)=>persons.age>20);

console.log(result);

//4. За допомогою map пройтися по масиву із завдання вище та додати кожному домашню тварину. Результат вивести у консоль.  

const mappAray = arrObjects.map(person=>({
  ...person,
  pets: [...person.pets, 'lion'] 
}))

console.log(mappAray);


//5.Створити масив із 10 елементів і заповнити його числом 42 за допомогою відповідного методу (завдання знайти його в документації, посилання в описі до лекції). За допомогою splice вставити на 5-ту позицію слово "answer". За допомогою find знайти це слово і вивести його у консоль.  

let arrTwo = new Array(10).fill(42); 


arrTwo.splice(4, 1, "answer"); 


console.log("splice:", arrTwo);


let resultTwo = arrTwo.find(word => word === 'answer');

console.log("Знайдено:", resultTwo);

//6. Створіть об'єкт із кількома ключами на ваш розсуд. І наведіть приклади використання keys, hasOwn, values.

const someObject = {
  name:"Max",
  age:22,
  work:false
}

console.log(Object.keys(someObject));

console.log(Object.hasOwn(someObject,'name'));

console.log(Object.hasOwn(someObject,'car'));

console.log(Object.values(someObject));