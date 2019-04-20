let host = 'http://localhost:8080';

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