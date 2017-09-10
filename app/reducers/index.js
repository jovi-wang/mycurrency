const INITIAL_STATE = {
    error:'',
    loading:false
};

export default reducer = (state =INITIAL_STATE, action)=>{
    switch (action.type) {
        case 'PICK_FIRST_COUNTRY':
            return {...state, ...INITIAL_STATE, ['country1']: action.payload};
        case 'PICK_SECOND_COUNTRY':
            return {...state, ...INITIAL_STATE,  ["country2"]: action.payload};
        case 'EXCHANGE_COUNTRY':
            return {...state, ...INITIAL_STATE, ['country1'] : state.country2, ['country2'] : state.country1};
        case 'FETCH_RATE':
            return {...state, ...INITIAL_STATE, ['rate']: action.payload};
        case 'LOADING':
            return {...state, ...INITIAL_STATE, loading:true};
        case 'ERROR':
            return {...state, ...INITIAL_STATE, error: action.payload};
        default:
            return state;
    }
};

