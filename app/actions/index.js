import axios from 'axios';
// const API_BASE_URL='http://api.fixer.io/latest';
const API_BASE_URL = 'http://apilayer.net/api';
const API_KEY= '*******';


export const pickFlag1 = (value)=>{
    return {
        type: 'PICK_FIRST_COUNTRY',
        payload: value
    };
};
export const getLatestRate = () => {
    return async (dispatch) => {
        //clear error msg, and display loading spinner
        dispatch({ type: 'LOADING' });
        try{
            const response = await axios.get(`${API_BASE_URL}/live`, {params:{access_key:API_KEY}});
            dispatch({ type: 'FETCH_RATE', payload: response.data });
        }
        catch(error) {
            dispatch({ type: 'ERROR', payload: 'unable to fetch latest currency rate' });
            console.log(error);
        }
    };
};
export const pickFlag2 = (value) =>{
    return {
        type :'PICK_SECOND_COUNTRY',
        payload: value
    };
};

export const exchangeFlag = () =>{
    return {
        type :'EXCHANGE_COUNTRY'
    };
};
