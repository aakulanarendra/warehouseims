const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function asyncValidate(values /*, dispatch */) {
    await sleep(1000);
    if (['1234'].includes(values.barcode)) {
        throw { email: 'Barcode already Exists' };
    }
});