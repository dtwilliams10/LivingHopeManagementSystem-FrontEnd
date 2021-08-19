import axios from "axios";

const url = process.env.REACT_APP_API + `SystemName`;

export function getSystemNames() {
    var systemNames = []
    axios.get(url).then(response => {
        systemNames.push(response.data);
    }).catch(error => {
        console.error(error);
    });

    console.log(systemNames);

    return systemNames;
}