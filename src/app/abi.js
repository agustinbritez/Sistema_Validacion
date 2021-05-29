export const CONST_ABI = [{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [{
				"internalType": "string[]",
				"name": "hashid",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "_event_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_state_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_reasonState",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_expiration",
				"type": "uint256"
			}
		],
		"name": "addAllDocumentsEvent",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "address",
				"name": "_ownerArea",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "addArea",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "string",
				"name": "_idHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_event_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_state_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_reasonState",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_expiration",
				"type": "uint256"
			}
		],
		"name": "addDocumentEvent",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "uint256",
				"name": "_area_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_startDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_endDate",
				"type": "string"
			}
		],
		"name": "addEventFull",
		"outputs": [{
			"internalType": "uint256",
			"name": "id",
			"type": "uint256"
		}],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "mean",
				"type": "string"
			}
		],
		"name": "addState",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "uint256",
				"name": "_id_area",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "changeOwnerArea",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "string",
				"name": "_idHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_state_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_reasonState",
				"type": "string"
			}
		],
		"name": "changeStateDocument",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "string",
			"name": "_idHash",
			"type": "string"
		}],
		"name": "checkDocument",
		"outputs": [{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "string[]",
			"name": "idHashes",
			"type": "string[]"
		}],
		"name": "checkDocuments",
		"outputs": [{
			"internalType": "bool[]",
			"name": "",
			"type": "bool[]"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "string[]",
				"name": "hashid",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "_event_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_state_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_reasonState",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_expiration",
				"type": "uint256"
			}
		],
		"name": "editAllDocumentsEvent",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "uint256",
				"name": "_id_area",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_id_state",
				"type": "uint256"
			}
		],
		"name": "editArea",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "uint256",
				"name": "_event_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_startDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_endDate",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "area_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "state_id",
				"type": "uint256"
			}
		],
		"name": "editEventFull",
		"outputs": [{
			"internalType": "uint256",
			"name": "id",
			"type": "uint256"
		}],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "address",
			"name": "newOwner",
			"type": "address"
		}],
		"name": "editOwnerOrg",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "mean",
				"type": "string"
			}
		],
		"name": "editState",
		"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "uint256",
			"name": "_id_area",
			"type": "uint256"
		}],
		"name": "getAllEventsOfArea",
		"outputs": [{
			"internalType": "uint256[]",
			"name": "",
			"type": "uint256[]"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "uint256",
			"name": "_id",
			"type": "uint256"
		}],
		"name": "getArea",
		"outputs": [{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "state_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cantEvents",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_area_index",
				"type": "uint256"
			}
		],
		"name": "getAreaOfOwner",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "uint256",
			"name": "_id",
			"type": "uint256"
		}],
		"name": "getCantDocumentEvent",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "string",
			"name": "_idHash",
			"type": "string"
		}],
		"name": "getDocument",
		"outputs": [{
				"internalType": "string",
				"name": "idHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "state_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "event_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "reasonState",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "expiration",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "newDocument",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "uint256",
			"name": "_id_event",
			"type": "uint256"
		}],
		"name": "getDocumentsOfEvent",
		"outputs": [{
			"internalType": "string[]",
			"name": "",
			"type": "string[]"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "uint256",
			"name": "_id",
			"type": "uint256"
		}],
		"name": "getEvent",
		"outputs": [{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "state_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "area_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "startEvent",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "endEvent",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "uint256",
				"name": "_id_area",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_id_event_index",
				"type": "uint256"
			}
		],
		"name": "getEventOfArea",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "address",
			"name": "_id",
			"type": "address"
		}],
		"name": "getLengthAreaOfOwner",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLengthAreas",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLengthEvents",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "uint256",
			"name": "_id_area",
			"type": "uint256"
		}],
		"name": "getLengthEventsOfArea",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLengthStates",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOrganitation",
		"outputs": [{
			"internalType": "string",
			"name": "",
			"type": "string"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwnerOrg",
		"outputs": [{
			"internalType": "address",
			"name": "",
			"type": "address"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "uint256",
			"name": "_id",
			"type": "uint256"
		}],
		"name": "getState",
		"outputs": [{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "mean",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "string",
				"name": "_idHash_old",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_idHash_new",
				"type": "string"
			}
		],
		"name": "newVersionDocument",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ownerArea",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "string",
			"name": "org",
			"type": "string"
		}],
		"name": "setOrganitation",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]