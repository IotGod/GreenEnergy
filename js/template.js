// let host = 'http://localhost:10228';
// let host = 'http://65875137.ngrok.io';
// let host = 'http://127.0.0.1';
let host = 'https://secure-falls-66692.herokuapp.com';

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}

async function buy() {
    var tokens = document.getElementById("amount").value;

    if(!tokens.match(/^-{0,1}\d+$/)) {
        alert("Invalid number");
        return;    
    }

    document.getElementsByClassName("overlay")[0].style.display = 'block';

    try {
        let seed = localStorage.getItem('pid');
        let from = localStorage.getItem('tmpAddress');
        let tx_hash = await requestCertificates(seed, hostAddr, from, tokens);
        alert("Tx hash: " + tx_hash);

        let to = await sha256(seed);
        
        var resp = await fetch(host + '/erc20/transferFrom', {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            method: 'POST',
                            body: JSON.stringify({
                                from: from,
                                to: to,
                                tokens: tokens
                            })
                        })
    } catch(err) {
        alert(err.message);    
    }

    
    document.getElementsByClassName("overlay")[0].style.display = 'none';
    location.href = 'index.html';
}

function Send() {
    let address = localStorage.getItem('selectedAddrForMain');
    let balance = localStorage.getItem('selectedBlncForMain');
    let pid = localStorage.getItem('pid');

    
    

    alert(pid);
}

function getAddrBySeed(seed) {
    return new Promise((resolve, reject) => {
        iota.api.getNewAddress(seed, { index : startIndex , security: 2 }, (err, addrs) => {
            if (err) {
                reject(err);
            } else {
                resolve(addrs);
            }
        });
    });
}

function getAccountInfo(seed) {
    return new Promise((resolve, reject) => {
        iota.api.getAccountData(seed, {}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            } 
        })
    });
}


async function burn() {
    var tokens = document.getElementById("amount").value;

    if(!tokens.match(/^-{0,1}\d+$/)) {
        alert("Invalid number");
        return;    
    }

    document.getElementsByClassName("overlay")[0].style.display = 'block';

    // let address = localStorage.getItem('selectedAddrForMain');
    // let balance = localStorage.getItem('selectedBlncForMain');
    let seed = localStorage.getItem('pid');

    let tx_hash = await burnCertificates(seed, hostAddr, '', tokens);
    alert("Tx hash: " + tx_hash);

    let from = await sha256(seed);

    var resp = await fetch(host + '/erc20/transferFrom', {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            from: from,
                            to: STOVE,
                            tokens: tokens
                        })
                    })
                    .then(res => {
                        console.log('finish');
                    });
    
    document.getElementsByClassName("overlay")[0].style.display = 'none';
    location.href = 'index.html';
}