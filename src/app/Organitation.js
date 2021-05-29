export async function setOrganitation(_name, _from, miContrato) {
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
     _from = accounts[0];

    await miContrato.methods.setOrganitation(_name).send({
            from: _from
        }, function (error, transactionHash) {

        })
        .on('receipt', function (receipt) {
            // receipt example
            console.log('receipt: ' + receipt);
        });
    return await getOrganitation();
}

export function getOrganitation(miContrato) {
    //se puede usar asi o
    return miContrato.methods.getOrganitation()
        .call()
        .then(function (result) {
            return result;
        })
        .catch(function (error) {
            console.log(error);
            return '';
        });

}
export function getOwnerOrg(miContrato) {
    //se puede usar asi o
    
    return miContrato.methods.getOwnerOrg()
        .call((err,result)=>result);

}
export async function setOwner(new_owner,miContrato) {
    //se puede usar asi o
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];

    return miContrato.methods.editOwnerOrg(new_owner)
    .send({
        from: account
    }, function (error, transactionHash) {
        
    });

}