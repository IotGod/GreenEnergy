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
                .then(async (res2)=>{
                    console.log('res2',res2);

                    let list = res2;
                    let myAddr = await sha256(localStorage.getItem('pid'));
                    for (let j = 0; j < list.length; j++) {
                        if (list[j].address == "BURNT" || list[j].address == myAddr) {
                            break;
                        }
                        let tr = document.createElement('tr');
                        let address = document.createElement('td');
                        let balance = document.createElement('td');
                        let btn = document.createElement('td');
                        address.innerText = list[j].address;
                        if (address.innerText.length > 20) {
                            address.innerText = list[j].address.slice(0, 20) + '...';
                        } else {
                            address.innerText = list[j].address;
                        }
                        tr.appendChild(address);
                        /*tr.onclick = function () {
                            saveAddress(list[j].address);
                        }*/

                        balance.innerText = list[j].balance;
                        tr.appendChild(balance);


                        let button = document.createElement('button');
                        
                        if (!localStorage.getItem('pid')) {
                            button.disabled = true;
                        }

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
async function initMain(address){
    document.getElementsByClassName("overlay")[0].style.display = 'block';

    let tbody = document.createElement('tbody');

    let seed = localStorage.getItem('pid');
    let from = await sha256(seed);
    let info = await getAccountInfo(seed);
    console.log(info);

    let tr = document.createElement('tr');
    let lastAddr = document.createElement('td');
    let iotaBalance = document.createElement('td');

    lastAddr.innerText = info.latestAddress;
    tr.appendChild(lastAddr);

    iotaBalance.innerText = info.balance;
    tr.appendChild(iotaBalance);

    tbody.appendChild(tr);
    document.getElementById('mainTable').appendChild(tbody);

    let res = await fetch(host + '/erc20/balanceOf?' + 'address=' + from, 
                    {
                        method: 'GET',
                    })

    if (res.status != 200) {
        document.getElementById('balanceH').innerText = 0;
    } else {
        var data = await res.json();
        document.getElementById('balanceH').innerText = data.balance;
    }
    
    localStorage.setItem('currentBalance', document.getElementById('balanceH').innerText);

    document.getElementsByClassName("overlay")[0].style.display = 'none';
}
