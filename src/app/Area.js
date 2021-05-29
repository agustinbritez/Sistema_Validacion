export async function addArea(_owner, _name, _description, miContrato) {

    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];

    const _id_event = await miContrato.methods
        .addArea(_owner,
            _name,
            _description
        )
        .send({
                from: account,
            },
            function (error, transactionHash) {}
        );
}
export async function changeOwnerArea(_id_area, _owner, miContrato) {

    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];
    try {


        const area_id = await miContrato.methods
            .changeOwnerArea(_owner,
                _id_area
            )
            .send({
                    from: account,
                },
                function (error, transactionHash) {}
            );
    } catch (Ex) {
        return false;
    }
    return true;
}

export async function editArea(_id_area, _name, _description, state_id, miContrato) {

    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];
    try {
        const _id_event = await miContrato.methods
            .editArea(_id_area,
                _name,
                _description,
                state_id
            )
            .send({
                    from: account,
                },
                function (error, transactionHash) {}
            );
    } catch (Ex) {
        return false;
    }
    return true;
}
export async function deleteArea(_id_area, miContrato) {

    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];
    let _id_state = 0;
    const _id_event = await miContrato.methods
        .editStateArea(_id_area,
            _id_state
        )
        .send({
                from: account,
            },
            function (error, transactionHash) {}
        );
}


export async function getAllAreaOfOwner(_from, _to, miContrato) {
    //se puede usar asi o
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });

    const account = accounts[0];

    let cantAreaOfOwner = await miContrato.methods.getLengthAreaOfOwner(account)
        .call((err, result) => result);
    if (_to == -1) {
        _to = cantAreaOfOwner;
    }
    let _to_fin = _from + _to;

    _to_fin = (_to_fin > (cantAreaOfOwner)) ? cantAreaOfOwner : _to_fin;

    let areas = [];
    let area = {};

    for (let index = _from; index < _to_fin; index++) {

        var area_id = await miContrato.methods.getAreaOfOwner(account, index)
            .call((err, result) => result);
        if (area_id > 0) {

            area = await miContrato.methods.getArea(area_id)
                .call((err, result) => result);

            if (area.state_id > 0) {
                let cantEventsOfOwner = await miContrato.methods.getLengthEventsOfArea(area_id)
                    .call((err, result) => result);
                area.cantEvents = cantEventsOfOwner;
                area.state = await miContrato.methods.getState(area.state_id)
                    .call((err, result) => result);
                area.value = area.id;
                areas.push(area);

            }
        }

    }
    return areas;

}

export async function getLengthAreaOfOwner(miContrato) {
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    let account = accounts[0];

    //se puede usar asi o
    let cantAreaOfOwner = await miContrato.methods.getLengthAreaOfOwner(account)
        .call((err, result) => result);
    return cantAreaOfOwner;
}

export async function getArea(_id, miContrato) {
    let area = await miContrato.methods.getArea(_id)
        .call((err, result) => result);
    return area;
}