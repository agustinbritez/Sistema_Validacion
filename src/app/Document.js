export async function addDocuments(arrayHash, _event_id, _state_id, _reasonState, _expiration = 0, miContrato) {
    if (_expiration && (typeof (_expiration) == "string")) {
        _expiration = new Date(_expiration);
        _expiration= _expiration.getTime();
    } else {
        _expiration = 0;
    }

    // const _startDate = new Date(startDate,'yyy/m/d H:m:s');
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];
    console.log(arrayHash);
    console.log('array');

    await miContrato.methods
        .addAllDocumentsEvent(
            arrayHash,
            _event_id,
            _state_id,
            _reasonState,
            _expiration
        )
        .send({
                from: account,
            },
            function (error, transactionHash) {
                console.log(error);
            }
        );
    return true;
}
export async function editDocuments(arrayHash, _event_id, _state_id, _reasonState, _expiration = 0, miContrato) {
    if (_expiration && (typeof (_expiration) == "string")) {
        console.log(_expiration,'expiration')
        _expiration = new Date(_expiration);
        _expiration= _expiration.getTime();

    } else {
        _expiration = 0;
    }
    // const _startDate = new Date(startDate,'yyy/m/d H:m:s');
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];

    console.log(arrayHash);
    console.log('array');

    await miContrato.methods
        .editAllDocumentsEvent(
            arrayHash,
            _event_id,
            _state_id,
            _reasonState,
            _expiration
        )
        .send({
                from: account,
            },
            function (error, transactionHash) {
                console.log(transactionHash);
            }
        );
    return true;
}
export async function deleteDocument(_hashId, miContrato) {

    // const _startDate = new Date(startDate,'yyy/m/d H:m:s');
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];

    await miContrato.methods
        .changeStateDocument(
            _hashId,
            0,
            'DELETE'
        )
        .send({
                from: account,
            },
            function (error, transactionHash) {
                console.log(transactionHash);
            }
        );
    return true;
}

export async function checkDocuments(arrayHash, arrayDocument, miContrato) {

    //array de boolean en la misma posicion devuelve si existe o no
    let arrayChecks = await miContrato.methods.checkDocuments(arrayHash)
        .call((err, result) => result);
    for (let i = 0; i < arrayHash.length; i++) {
        arrayDocument[i].exist = arrayChecks[i];
    }

    return arrayDocument;
}
export async function checkADocument(hash, miContrato) {

    //array de boolean en la misma posicion devuelve si existe o no
    let t = await miContrato.methods.checkDocument(hash)
        .call((err, result) => {
            console.log(err);
            return result
        });

    return t;
}
export async function newVersionDocument(hash_old, hash_new, miContrato) {

    //array de boolean en la misma posicion devuelve si existe o no
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];
    await miContrato.methods
        .newVersionDocument(
            hash_old, hash_new
        )
        .send({
                from: account,
            },
            function (error, transactionHash) {
                console.log(error);
            }
        );
}
export async function search(filter, miContrato) {
    let idDocuments = [];
    let documents = [];
    let document = {};
    let idEvents = [];
    let idEvents2 = [];

    if (filter.area_id > 0) {
        if (filter.event_id == 0) {

            idEvents2 = await miContrato.methods.getAllEventsOfArea(filter.area_id)
                .call((err, result) => {
                    return result;
                });
            //idEvents = idEvents2.slice();

            idEvents2.forEach(async idEvent => {
                var enter = {
                    startEvent: true,
                    endEvent: true
                };
                var _event = await miContrato.methods.getEvent(idEvent).call((err, result) => {
                    console.log(result);
                    return result;
                });
                if (filter.startEvent.trim() != "") {
                    if (_event.startEvent < filter.startEvent) {
                        enter.startEvent = false;
                    }
                }
                if (filter.endEvent.trim() != "") {
                    if (_event.endEvent > filter.endEvent) {
                        enter.endEvent = false;
                    }
                }

                // if (enter.endEvent && enter.startEvent) {
                //     idEvents.push(idEvent)
                // }
                idEvents.push(_event.id);

            });
        } else {
            idEvents.push(filter.event_id);
        }

        idEvents.forEach(async idEvent => {

            idDocuments = await miContrato.methods.getDocumentsOfEvent(idEvent)
                .call((err, result) => result);

            idDocuments.forEach(element => {

                document = miContrato.methods.getDocument(element)
                    .call((err, result) => {
                        let enter = false;

                        if (filter.state_id >= 0) {
                            enter = false;
                            if (result.state_id == filter.state_id) {
                                enter = true;
                            }
                        }

                        if (filter.reasonState.trim() != "") {
                            enter = false;
                            if (result.reasonState.includes(filter.reasonState)) {
                                enter = true;
                            }
                        }
                        documents.push(element);
                    });
            });
        });
        console.log("prueba de busqueda", documents);

        return {
            documentsExists: documents
        };
    }
    //array de boolean en la misma posicion devuelve si existe o no

    return {
        documentsExists: documents
    };
}

export async function getCantDocumentEvent(event_id, miContrato) {

    //array de boolean en la misma posicion devuelve si existe o no
    return await miContrato.methods.getCantDocumentEvent(event_id)
        .call((err, result) => result);

}

export async function getDocuments(hashes, uploadedFiles, miContrato) {
    let documentsExists = [];
    let documentsNoExists = [];
    let document = {};
    for (let i = 0; i < hashes.length; i++) {
        document = await miContrato.methods.getDocument(hashes[i])
            .call((err, result) => result);
        document.fileName = uploadedFiles[i].fileName;
        if (document.idHash.length > 0) {
            document.exists = true;
            if(parseInt(document.expiration) > 0){
                document.expiration= new Date(parseInt(document.expiration));
                // document.expiration= document.expiration.toLocaleDateString() ;
            }else{
                document.expiration='';  
            }
            document.state = await miContrato.methods.getState(document.state_id)
                .call((err, result) => result);
            document.event = await miContrato.methods.getEvent(document.event_id)
                .call((err, result) => result);
            document.area = await miContrato.methods.getArea(document.event.area_id)
                .call((err, result) => result);
            documentsExists.push(document);
        } else {
            document.idHash = hashes[i];
            document.exists = false;
            documentsNoExists.push(document);
        }

    }
    return {
        documentsExists: documentsExists,
        documentsNoExists: documentsNoExists
    };

}

//quede aca
export async function getAllDocumentsEvent(_event_id, _from, _to, miContrato) {
    //se puede usar asi o
    let cantDocumentOfEvent = 0;
    let idDocuments = [];
    if (_event_id > 0) {
        idDocuments = await miContrato.methods.getDocumentsOfEvent(_event_id)
            .call((err, result) => result);
        cantDocumentOfEvent = idDocuments.length;

    } else {
        // tarda mucho saber cuantos documentos existen prque el array documento es un mapping
        return [];
    }


    if (cantDocumentOfEvent == 0) {
        return [];
    }


    let _to_fin = _from + _to;

    _to_fin = (_to_fin > (cantDocumentOfEvent)) ? cantDocumentOfEvent : _to_fin;

    let documents = [];
    let document = {};


    for (let index = _from; index < _to_fin; index++) {


        if (idDocuments[index].length > 0) {
            if (idDocuments[index] !== "") {
                document = await miContrato.methods.getDocument(idDocuments[index])
                    .call((err, result) => result);
                document.state = await miContrato.methods.getState(document.state_id)
                    .call((err, result) => result);

                documents.push(document);
            }



        }

    }
    return documents;

}