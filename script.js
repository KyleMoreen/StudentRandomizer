//the program works as long as you don't click on the same class more than once. 
//right now each click adds a new event listener without deleting the previous one
//possible solution includes creating empty arrays for student lists and manipulating those rather than calling from the JSON every time.

//get elements from DOM to manipulate later
const classList = document.getElementById('class-list');
const studentList = document.getElementById('student-list');
const randomizeButton = document.getElementById('randomize');
const randomStudent = document.getElementById('random-student');

//create array that will contain a nested array for every class
const studentsPicked = [];

//fetch JSON with student lists
fetch('students.json')
.then(res => res.json())
.then(data => {

    //for loop creating a button for every class
    for (let i = 0; i < data.classes.length; i++) {
        const button = document.createElement('button');
        button.setAttribute('class', data.classes[i].className);
        button.setAttribute('id', data.classes[i].className);
        button.innerText = data.classes[i].className;
        classList.append(button);

        //create array for each class and nest it inside studentsPicked
        const picked = [];
        studentsPicked.push(picked);

        //add event listener for each class button
        button.addEventListener('click', () => {

            //reset randomized student field to empty
            randomStudent.innerText = '';

            //display student list with comma separation
            studentList.innerText = data.classes[i].students.join(', ')
            if (randomizeButton.disabled === true) {
                randomizeButton.disabled = false;
            }

            //add event listener for randomizer button
            randomizeButton.addEventListener('click', function pickStudent() {

                //check if all students have been picked and reset array if necessary
                if (studentsPicked[i].length === data.classes[i].students.length) {
                    studentsPicked[i] = [];
                }

                //initialize variables for later manipulation
                let randomNum;
                let student;
                let duplicate;

                //select a random student that hasn't alredy been picked
                do {
                    duplicate = false;
                    randomNum = Math.floor(Math.random() * data.classes[i].students.length);
                    student = data.classes[i].students[randomNum];

                    for (let pick of studentsPicked[i]) {
                        if (pick === student) {
                            duplicate = true;
                        }
                    }
                }
                while (duplicate);

                //add random student to array of students picked
                studentsPicked[i].push(student);

                //add random student name to DOM
                let studentsLeft = data.classes[i].students.length - studentsPicked[i].length;
                randomStudent.innerText = student + '\n' + `${studentsLeft} students left.`;
            });
        });
    };

});