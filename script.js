//the program works as long as you don't click on the same class more than once. 
//right now each click adds a new event listener without deleting the previous one
//possible solution includes creating empty arrays for student lists and manipulating those rather than calling from the JSON every time.

//get elements from DOM to manipulate later
const classList = document.getElementById('class-list');
const studentList = document.getElementById('student-list');
const randomizeButton = document.getElementById('randomize');
const randomStudent = document.getElementById('random-student');

//create object to contain JSON data
const allClasses = {};

//create array that will contain a nested array for every class
const studentsPicked = [];

//initialize value variable to update as a button state
let val = 0;

//fetch JSON with student lists
fetch('demo.json')
.then(response => response.json())
.then(data => {

    allClasses.classes = data.classes;

    //for loop iterating over each class in JSON file
    for (let i = 0; i < data.classes.length; i++) {

        //import data from JSON into global object
        allClasses.classes[i].className = data.classes[i].className;
        allClasses.classes[i].students = data.classes[i].students;

        //create button for each class
        const button = document.createElement('button');
        button.setAttribute('class', data.classes[i].className);
        button.setAttribute('id', data.classes[i].className);
        button.setAttribute('value', i);
        button.innerText = data.classes[i].className;
        classList.append(button);

        //create array for each class and nest it inside studentsPicked
        const picked = [];
        studentsPicked.push(picked);

        //add event listener for each class button
        button.addEventListener('click', (e) => {
    
            //set val to value of clicked button
            val = e.target.value;

            //reset randomized student field to empty
            randomStudent.innerText = '';
            randomStudent.style.backgroundColor = 'white';

            //display student list with comma separation
            studentList.style.backgroundColor = '#ddd';
            studentList.innerText = data.classes[i].students.join(', ')
            if (randomizeButton.disabled === true) {
                randomizeButton.disabled = false;
            }
        });
    };
});

//add event listener for randomizer button
randomizeButton.addEventListener('click', () => {

    //check if all students have been picked and reset array if necessary
    if (studentsPicked[val].length === allClasses.classes[val].students.length) {
        studentsPicked[val] = [];
    }

    //initialize variables for later manipulation
    let randomNum;
    let student;
    let duplicate;

    //select a random student that hasn't alredy been picked
    do {
        duplicate = false;
        randomNum = Math.floor(Math.random() * allClasses.classes[val].students.length);
        student = allClasses.classes[val].students[randomNum];

        for (let pick of studentsPicked[val]) {
            if (pick === student) {
                duplicate = true;
            }
        }
    }
    while (duplicate);

    //add random student to array of students picked
    studentsPicked[val].push(student);

    //add random student name to DOM
    randomStudent.style.backgroundColor = '#ddd';
    let studentsLeft = allClasses.classes[val].students.length - studentsPicked[val].length;
    randomStudent.innerText = student + '\n' + `${studentsLeft} students left.`;
}); 