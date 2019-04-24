// let host = 'http://localhost:10228';

function initIndex() {
    let tbody = document.createElement('tbody');

    fetch(host+'/erc20/totalSupply',
        {
            /*headers: {
                'Content-Type': 'application/json',
            },*/
            method: 'GET'
        })
        .then((res1) => {
            console.log('res1.token', res1.json()
                .then((res2)=>{
                    console.log('res2',res2);

                    let list = res2;
                    for (let j = 0; j < list.length; j++) {
                        let tr = document.createElement('tr');
                        let address = document.createElement('td');
                        let balance = document.createElement('td');
                        let btn = document.createElement('td');
                        address.innerText = list[j].address;
                        tr.appendChild(address);
                        /*tr.onclick = function () {
                            saveAddress(list[j].address);
                        }*/

                        balance.innerText = list[j].balance;
                        tr.appendChild(balance);


                        let button = document.createElement('button');
                        let i = document.createElement('i');

                        i.className = 'material-icons right';
                        i.innerText = 'settings_ethernet';
                        button.className = 'btn waves-effect waves-light green';
                        button.type = 'submit';
                        button.name = 'action';
                        button.onclick = function() {
                            goToBuy(list[j].address, list[j].balance);
                        };
                        button.innerText = 'Buy';
                        button.appendChild(i);

                        btn.appendChild(button);
                        tr.appendChild(btn);

                        tbody.appendChild(tr);
                    }
                    document.getElementById('table').appendChild(tbody);

                }));

        });

    console.log(tbody)
}

/*function saveAddress(address){
    location.href = 'main.html';
    localStorage.setItem('selectedAddress',address);
}*/
function initMain(address){

    let tbody = document.createElement('tbody');

    //fetch(host+'/erc20/balanceOf?address='+address,
    fetch(host+'/erc20/totalSupply',
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
        .then((res1) => {
            console.log('res1.token', res1.json()
                .then((res2)=>{
                    console.log('res2',res2);

                    let list = res2;
                    for (let j = 0; j < list.length; j++) {
                        let tr = document.createElement('tr');
                        let address = document.createElement('td');
                        let balance = document.createElement('td');
                        address.innerText = list[j].address;
                        tr.appendChild(address);

                        balance.innerText = list[j].balance;
                        tr.appendChild(balance);

                        tr.onclick = function () {
                            document.getElementById('addressH').innerText = list[j].address;
                            document.getElementById('balanceH').innerText = list[j].balance;
                            localStorage.setItem('selectedAddrForMain',list[j].address);
                            localStorage.setItem('selectedBlncForMain',list[j].balance);
                        }
                        tbody.appendChild(tr);
                    }
                    document.getElementById('mainTable').appendChild(tbody);
                }));

        });
}
