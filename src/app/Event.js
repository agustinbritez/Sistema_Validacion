export async function getAllEventsOneArea(_area_id, _from = 0, _to = -1, miContrato) {
    //si el area_id es 0 entonces trae todos los eventos relacionados a todos las areas del que esta llamando a la funcion
    //si tiene un id > 0 entonces trae solo los eventos de un area. 
    let cantEvents = await miContrato.methods.getLengthEventsOfArea((_area_id)).call((err, result) => {
        result
    });

    //event[0] = eventNull all atributes is in 0
    console.log('cant Event: ' + cantEvents);
    if (_from == 0 && _to == -1) {
        _to = cantEvents;
    }

    let _to_fin = _from + _to;
    _to_fin = (_to_fin > (cantEvents)) ? cantEvents : _to_fin;

    const events = [];
    var _event = {};
    var _event_id = 0;

    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];

    for (let i = _from; i < _to_fin; i++) {

        _event_id = await miContrato.methods.getEventOfArea(_area_id, i).call((err, result) => {
            result;
        });

        if (parseInt(_event_id) != 0) {

            _event = await miContrato.methods.getEvent(_event_id).call((err, result) => {
                // console.log(result);
                return result;
            });
            if (_event.state_id > 0) {
                var cant = await miContrato.methods.getCantDocumentEvent(_event_id).call((err, result) => {
                    result;
                });

                _event.value = _event.id;
                _event.cantDocument = cant;
                events.push(_event);
            }
        }

    }
    // console.log('events:' + events.length);

    return events;
}
///get all event of owner
export async function getAllEvents(miContrato) {
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];

    let cantAreas = await miContrato.methods.getLengthAreaOfOwner(account).call((err, result) => {
        result
    });



    const events = [];
    var _event = {};
    var _event_id = 0;



    for (let index = 0; index < cantAreas; index++) {
        var _area_id = await miContrato.methods.getAreaOfOwner(account, index).call((err, result) => {
            result
        });
        let cantEvents = await miContrato.methods.getLengthEventsOfArea(_area_id).call((err, result) => {
            result
        });

        for (let i = 0; i < cantEvents; i++) {

            _event_id = await miContrato.methods.getEventOfArea(_area_id, i).call((err, result) => {
                result;
            });


            if (parseInt(_event_id) > 0) {

                _event = await miContrato.methods.getEvent(_event_id).call((err, result) => {
                    // console.log(result);
                    return result;
                });

                if (_event.state_id > 0) {
                    var cant = await miContrato.methods.getCantDocumentEvent(_event_id).call((err, result) => {
                        result;
                    });

                    _event.value = _event.id;
                    _event.cantDocument = cant;
                    events.push(_event);
                }
            }

        }
    }

    // console.log('events:' + events.length);

    return events;
}

export async function addEvent(_area_id, _name, _description, startDate, endDate, miContrato) {

    // const _startDate = new Date(startDate,'yyy/m/d H:m:s');
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];
    console.log(startDate);

    const _id_event = await miContrato.methods
        .addEventFull(_area_id,
            _name,
            _description,
            startDate,
            endDate
        )
        .send({
                from: account,
            },
            function (error, transactionHash) {}
        );
}
export async function editEvent(_event_id, _name, _description, startDate, endDate, area_id, state_id, miContrato) {

    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];
    let countDocuments = await miContrato.methods.getDocumentsOfEvent(_event_id).call((err, result) => {
        // console.log(result);
        return result;
    });
    
    if(countDocuments == 0){
        const _id_event = await miContrato.methods
        .editEventFull(
            _event_id,
            _name,
            _description,
            startDate,
            endDate,
            area_id,
            state_id
        )
        .send({
                from: account,
            },
            function (error, transactionHash) {}
        );
        return true;
    }else{
        return false;
    }

    
}

export async function getLengthEventsOfArea(_area_id, miContrato) {
    let _event;
    // si es 0 el area tiene que traer todas los eventos
    if (_area_id) {
        _event = await miContrato.methods.getLengthEventsOfArea(_area_id).call((err, result) => {
            result;
        });

    } else {
        _event = await miContrato.methods.getLengthEvents().call((err, result) => {
            result;
        });
    }
    return _event;
}
export async function getEvent(_event_id, miContrato) {
    let _event;
    try {
        return await miContrato.methods.getEvent(_event_id).call((err, result) => {
            result;
        });
    } catch (ex) {
        return false;
    }
    return _event;
}
export async function getEventOfArea(_from, _to, miContrato) {
    let _event;
    try {
        return await miContrato.methods.getEvent(_event_id).call((err, result) => {
            result;
        });
    } catch (ex) {
        return false;
    }
    return _event;
}