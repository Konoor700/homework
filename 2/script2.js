console.log("1. Функції вищого порядку та замикання")

function addParamsToRequest(params) {
    let count = 0; 

    return (data) => {
        count++; 
        
        return {
            ...params, 
            data: data,
            count: count 
        };
    };
}


const token = { 'access-token': 'qwerty' };
const sendData = addParamsToRequest(token);

console.log(sendData({ name: 'Ivan' })); 


console.log(sendData({ orderId: 55 })); 

console.log("------------------------------------------------")

console.log("2. Контексти і this")

const obj = {
    getData:function(){
        console.log(`Person name is: ${this.name} and age ${this.age}`)
    }
}

obj.getData.call( { name: "Ivan", age: 25 } );

const boundGetData = obj.getData.bind({ name: "Oleg", age: 30 })


boundGetData();

console.log("------------------------------------------------")

console.log("3. Рекурсія")

const root = {
  name: 'name',
  type: 'folder',
  children: [
    {
      name: 'folder 1',
      type: 'folder',
      children: [
        {
          name: 'folder 2',
          type: 'folder',
          children: [
            {
              name: 'file 3',
              type: 'file',
              size: 30
              
            }]
          
        }
        ]
      
    },

{

name: 'file 1',

type: 'file',

size: 10

},

{

name: 'file 2',

type: 'file',

size: 20

}

]

};

function FindFile (node){
  
  let files = [];
  
  for (const child of node.children) {
    
    if(child.type === 'folder'){
      files.push(...FindFile(child))
      
    }else{
      files.push(child.name);
    }
    
    
  
}

 return files;
  
  
}

console.log(FindFile(root));


console.log("------------------------------------------------")

console.log("Класи")

console.log("--- ES6 Classes Version ---");

 { class Person {
    constructor(name, phone) {
      this.name = name;
      this.phone = phone;
    }

    introduce() {
      return `Привіт, мене звати ${this.name}, мій номер ${this.phone}`;
    }
  }

  class Student extends Person {
    constructor(name, phone, course) {
      super(name, phone);
      this.course = course;
    }

    study() {
      return `Я навчаюся на ${this.course} курсі`;
    }
  }

  class Teacher extends Person {
    constructor(name, phone, subject) {
      super(name, phone);
      this.subject = subject;
    }

    teach() {
      return `Я викладаю ${this.subject}`;
    }
  }

  const student = new Student("Олег", "+3801111111", 3);
  const teacher = new Teacher("Марія Петрівна", "+3802222222", "Фізика");

  console.log(student.introduce());
  console.log(student.study());
  console.log(teacher.introduce());
  console.log(teacher.teach());
}


  console.log("\n--- ES5 Prototypes Version ---");

  function Person(name, phone) {
    this.name = name;
    this.phone = phone;
  }

  Person.prototype.introduce = function () {
    return `Привіт, мене звати ${this.name}, мій номер ${this.phone}`;
  };

  function Student(name, phone, course) {
    Person.call(this, name, phone); 
    this.course = course;
  }

 
  Student.prototype = Object.create(Person.prototype);
  Student.prototype.constructor = Student;

  Student.prototype.study = function () {
    return `Я навчаюся на ${this.course} курсі`;
  };

  function Teacher(name, phone, subject) {
    Person.call(this, name, phone);
    this.subject = subject;
  }

  Teacher.prototype = Object.create(Person.prototype);
  Teacher.prototype.constructor = Teacher;

  Teacher.prototype.teach = function () {
    return `Я викладаю ${this.subject}`;
  };

  const student = new Student("Ігор", "+3803333333", 2);
  const teacher = new Teacher("Олександр Дмитрович", "+3804444444", "Хімія");

  console.log(student.introduce());
  console.log(student.study());
  console.log(teacher.introduce());
  console.log(teacher.teach());

