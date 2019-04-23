// let host = 'http://localhost:10228';
// let host = 'http://65875137.ngrok.io';
// let host = 'http://127.0.0.1';
let host = 'https://secure-falls-66692.herokuapp.com';

function buy() {
    alert("buy");
}

function Send() {
    let address = localStorage.getItem('selectedAddrForMain');
    let balance = localStorage.getItem('selectedBlncForMain');
    let pid = localStorage.getItem('pid');
    alert(pid);
}

function burn() {
    let address = localStorage.getItem('selectedAddrForMain');
    let balance = localStorage.getItem('selectedBlncForMain');
    let pid = localStorage.getItem('pid');
    alert(pid);
}