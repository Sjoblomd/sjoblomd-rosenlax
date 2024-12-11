const registrationContainer = document.querySelector(".registration");
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
if(userInfo === null){
    registrationContainer.style.display = 'block';
}else{
    registrationContainer.style.display = 'none';
    output.textContent = `Welcome ${userInfo.firstname}, your username is ${userInfo.username}`;
}

function registerUser() {
    const firstname = document.getElementById('firstname').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const age = parseInt(document.getElementById('age').value.trim(), 10);

    if (!firstname || !lastname) {
        alert("Firstname and Lastname are required!");
        return;
    }

    if (!age || isNaN(age)) {
        alert("Enter a valid age!");
        return;
    }

    if (age < 18) {
        alert("You must be at least 18 years old to register.");
        return;
    }

    const username = lastname.toLowerCase() + firstname[0].toLowerCase();

    registrationContainer.style.display = 'none';
    
    const output = document.getElementById('output');
    output.textContent = `Welcome ${firstname}, your username is ${username}`;
    
    const userInfo = {
        firstname: firstname,
        lastname: lastname,
        age: age,
        username: username
    };
    localStorage.setItem('userInfo',JSON.stringify(userInfo));
};