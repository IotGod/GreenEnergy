let host = 'http://localhost:8080';
let tmpAddress;
function goToReg(){
    location.href = 'lcab.html';
}

function goToBuy(address,amount){
    localStorage.setItem('tmpAddress', address);
    localStorage.setItem('tmpAmount', "Current balance : "+amount);
    location.href = 'buy.html';
}

function goToMain() {
    location.href = 'main.html';
}

function goToSend() {
    location.href = 'send.html';
}

function goToBurn() {
    location.href = 'burn.html';
}

function SignUp(name, pid, login, password) {
    localStorage.setItem('name', name.value);
    localStorage.setItem('pid', pid.value);
    localStorage.setItem('login', login.value);
    localStorage.setItem('password', password.value);

    let lcab = document.getElementsByClassName("SignUp");
    lcab.forEach(function(element) {
        element.innerText = name.value;
    });
    location.href = 'index.html';
}
