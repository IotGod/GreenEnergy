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