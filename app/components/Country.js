
import React, { Component } from 'react';
import  {
    StyleSheet,
    Text,
    View,
    Button,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import * as actions from '../actions';
import money from 'money';
const COUNTRIES=["AF","AL","DZ","AS","AD","AO","AI","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BA","BW","BV","BR","IO","VG","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","CX","CC","CO","KM","CK","CR","HR","CU","CW","CY","CZ","CD","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","CI","JM","JP","JE","JO","KZ","KE","KI","XK","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","MK","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","NC","NZ","NI","NE","NG","NU","NF","KP","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","CG","RO","RU","RW","RE","BL","KN","LC","MF","PM","VC","WS","SM","SA","SN","RS","SC","SL","SG","SX","SK","SI","SB","SO","ZA","GS","KR","ES","LK","SD","SR","SJ","SZ","SE","SY","ST","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UM","VI","UZ","VU","VA","VE","VN","WF","EH","YE","ZM","ZW","AX"];



class Country extends Component {

    componentWillMount(){
        this.props.getLatestRate();
    }

    changeFlag1(value){

        this.props.pickFlag1(value);
    }
    changeFlag2(value){
        this.props.pickFlag2(value);
    }
    exchangeCountry(){
       this.props.exchangeFlag();

    }
    renderResult() {
        const {country1, country2, rate} = this.props;
        if (rate) {
            money.base=rate.base;
            money.rates=rate.rates;
            let result='';
            try{
                result = money.convert(1, {from: country1.currency, to: country2.currency});
                return (
                    <View>
                        <Text  style={styles.instructions}>
                            {`1  ${country1.currency} = ${result}  ${country2.currency}`}
                        </Text>
                        <Button onPress={this.exchangeCountry.bind(this)}
                                title="<==>"
                        />
                    </View>
                );
            }catch (error){
                console.log(error);
                return(
                    <Text style={styles.errorTextStyle}>
                        Sorry, no currency data
                    </Text>
                );
            }
        }else{

            return (
                <View >
                    <ActivityIndicator size={'large'} />
                </View>
            );
        }

    }
    render() {
        const {error, country1, country2} = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    press on the flag to choose a country
                </Text>
                <Text style={styles.welcome}>
                    {`FROM  ${country1.name}`}
                </Text>
                <View>
                    <CountryPicker
                        countryList={COUNTRIES}
                        onChange={(value)=> this.changeFlag1(value)}
                        cca2={country1.cca2}
                        translation='eng'
                    />

                    <Text style={styles.welcome}>
                        {`TO  ${country2.name}`}
                    </Text>

                    <CountryPicker
                        countryList={COUNTRIES}
                        onChange={(value)=> this.changeFlag2(value)}
                        cca2={country2.cca2}
                        translation='eng'
                    />

                </View>

                {this.renderResult()}

                <Text style={styles.errorTextStyle}>
                    {error}
                </Text>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        fontSize: 18,
        textAlign: 'center',
        color: '#888',
        marginBottom: 5,
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
});

const mapStateToProps = (state) => {

    const rate = refactorRate(state.rate);

    return{
        country1:state.country1 ? state.country1 : {cca2:'AU', currency:'AUD', name: 'Australia'},
        country2:state.country2 ? state.country2 : {cca2:'AU', currency:'AUD', name: 'Australia'},
        rate,
        error:state.error,
        loading:state.loading
    };

};

//convert state.rate information, make it align with money.js lib
const refactorRate = (rate)=>{
    let obj = undefined;
    if(rate){
        const base = rate.source;
        const quote = rate.quotes;
        //use string.replace to remove prefix(default USD) in quotes
        const result = JSON.stringify(quote);
        const regex = new RegExp(base,'g');
        const rates = JSON.parse(result.replace(regex,''));
        obj = {base, rates};
    }
    return obj;
};

export default connect(mapStateToProps, actions)(Country);
