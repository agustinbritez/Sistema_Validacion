export async function getStatesAll(miContrato) {

    //se puede usar asi o
    let cantStates = await miContrato.methods.getLengthStates()
        .call((err, result) => result);
    let arrayState = [];
    let state = {};
    for (let i = 0; i < cantStates; i++) {
        state = await miContrato.methods.getState(i)
            .call((err, result) => result);
        state.value = state.id;
        arrayState.push(state);
    }

    return arrayState;
}
export async function getState(_id,miContrato) {

    return await miContrato.methods.getState(_id)
        .call((err, result) => result);
    
}
export async function addState(name,mean,miContrato) {
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];
    return await miContrato.methods.addState(name,mean)
    .send({
        from: account
    }, function (error, transactionHash) {
        
    });
}
export async function editState(id,name,mean,miContrato) {
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];
    return await miContrato.methods.editState(id,name,mean)
    .send({
        from: account
    }, function (error, transactionHash) {
        
    });
}

