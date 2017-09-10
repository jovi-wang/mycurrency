const fx = require("money");
//accounting.js
//not free one https://currencylayer.com/
//free one  http://fixer.io/

const axios=require('axios');
const API_BASE_URL='http://api.fixer.io/latest';

const API_KEY= '2ac0559891a3664d6cec2c270361c278';

const fetchRates = async (values) => {
    try{
        let result = await axios.get(API_BASE_URL, {params:values});
        return result.data;
    }
    catch (err){
        console.log(err);
    }

}

const foo = async ()=>{
    let fixerRate=await fetchRates();
    fx.base = fixerRate.base;
    fx.rates= fixerRate.rates;

    let result = fx.convert(10, {from: "USD", to: "CNY"});
    console.log(result);
}

foo();