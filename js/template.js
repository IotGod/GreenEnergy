// let host = 'http://localhost:10228';
// let host = 'http://65875137.ngrok.io';
// let host = 'http://127.0.0.1';
let host = 'https://secure-falls-66692.herokuapp.com';

async function buy() {
    document.getElementsByClassName("overlay")[0].style.display = 'block';

    try {
        let seed = localStorage.getItem('pid');
        let from = localStorage.getItem('tmpAddress');
        let tx_hash = await requestCertificates(seed, hostAddr, from, balance);
        let to = await getAddrBySeed(seed);
        
        var resp = await fetch(host + '/erc20/transferFrom', {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            method: 'POST',
                            body: JSON.stringify({
                                from: from,
                                to: to,
                                tokens: 5
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
    let address = localStorage.getItem('selectedAddrForMain');
    let balance = localStorage.getItem('selectedBlncForMain');
    // let seed = localStorage.getItem('pid');

    // let tx_hash = await burnCertificates(seed, addr, address, balance);
    let from = await getAddrBySeed(seed);

    // // var data = await getAccountInfo(seed);

    // // console.log(data);

    // var resp = await fetch(host + '/erc20/transferFrom', {
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     method: 'POST',
    //                     body: {
    //                         from: from,
    //                         to: STOVE,
    //                         tokens: 1
    //                     }
    //                 })
    //                 .then(res => {
    //                     console.log('finish');
    //                 });
    // alert(pid);
}