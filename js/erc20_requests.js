// import { composeAPI } from '@iota/core';
// import IOTA from './iota.lib.js';
// import Crypto from './iota.crypto.min.js';
// const IOTA = require('./iota.lib.js')

const PROVIDER = 'https://nodes.devnet.thetangle.org:443';

const depth = 3;
const minWeightMagnitude = 9;
const defaultSupply = 1;
const STOVE = "BURNT";
const startIndex = 0;

// const iota = composeAPI({
//     provider: PROVIDER
// })

const iota = new IOTA({ provider : PROVIDER});

function transferFrom(seed, to, message) {
    const transfers = [{
        address: to,
        value: defaultSupply,
        tag: '', // optional tag of `0-27` trytes
        message: iota.utils.toTrytes(message)
    }]

    console.log(message);

    // Prepare a bundle and signs it.
    // var trytes = await iota.api.prepareTransfers(seed, transfers);
    // var bundle = await iota.api.sendTrytes(trytes, depth, minWeightMagnitude);
    // var hash_promise = new Promise((resolve, reject) => {

    // })

    return new Promise((resolve, reject) => {
        try {
            iota.api.sendTransfer(seed, depth, minWeightMagnitude, transfers, {}, (err, bundle) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(bundle);
                    resolve(bundle[0].hash);
                }
            });
        } catch(err) {
            reject(err);
        }
    });
}

async function requestCertificates(seed, host, from, tokens) {
    var meta = {
        type : 'request',
        from : from,
        value : tokens 
    }

    return transferFrom(seed, host, JSON.stringify(meta));
}

async function burnCertificates(seed, host, from, tokens) {
    var meta = {
        type : 'burn',
        value : tokens 
    }

    return transferFrom(seed, host, JSON.stringify(meta));
}

var seed = 'EIE9VSLMIZTAPLFIALSIVMSDRMNSQWVRGGKY9VRLRWUMUWHLWFTCJEBBSUEFVXKJLYRRCELU9VHSMLURF';
var addr = 'SMNEYPUEATGADPKXTXGQXPEWUGQBMZNEMIPUOQB9ZFVFGZBLBCDHLZPQOLZPRIAPXXRNZBZNQLO9XYUP9RIGKXRSPX';

// // tranferFrom(seed, addr, 1)
// burnCertificates(seed, addr, addr, 10)
//     .then(hash => {
//         console.log(hash);
//     });

// export default requestCertificates;