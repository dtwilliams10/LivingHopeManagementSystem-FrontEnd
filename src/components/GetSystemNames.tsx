import axios from 'axios';

const endpoint: string = 'SystemName'
const url: string = process.env.REACT_APP_API + endpoint;

export default function getSystemNames() {
var systemName = [];
    axios.get(url).then(function(response) {
        systemName = response.data;
    })
    .catch(function(error){
        console.log(error);
    });
   
    return systemName;
}