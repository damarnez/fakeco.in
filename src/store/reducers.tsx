export default (state: any, action: any) => {
  switch (action.type) {
    case "SET_CONTRACTS_DATA": {
      return {
        ...state,
        ...{
          contracts: action.data,
        },
      };
    }
    case "SET_WEB3": {
      return {
        ...state,
        ...{
          web3: action.data,
        },
      };
    }
    case "SET_ADDRESS": {
      return {
        ...state,
        ...{
          address: action.data,
        },
      };
    }
    case "SET_INSTANCE": {
      return {
        ...state,
        ...{
          instances: action.data,
        },
      };
    }
    case "SET_OPEN": {
      return {
        ...state,
        ...{
          open: action.data,
        },
      };
    }
    case "SET_NETWORK": {
      return {
        ...state,
        ...{
          network: action.data.network,
          networkId: action.data.networkId,
          networkError: false,
        },
      };
    }
    case "SET_NETWORK_ERROR": {
      return {
        ...state,
        ...{
          network: "",
          networkId: 0,
          networkError: true,
        },
      };
    }
    default:
      return state;
  }
};
