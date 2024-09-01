const axios = require('axios');
const { json } = require('express');

const getHwaSsa = async () => {
    try {
        axios.get(
          "https://samudra.incois.gov.in/incoismobileappdata/rest/incois/hwassalatestdata"
        )
        .then((response) => {
            // console.log(response.data);
            const hwa = JSON.parse(response.data.HWAJson);
            const ssa = JSON.parse(response.data.SSAJson);
            
            axios.get(
              "https://samudra.incois.gov.in/incoismobileappdata/rest/incois/currentslatestdata"
            )
            .then((response) => {
                // console.log(response.data);
                const waterCurrent = JSON.parse(response.data.CurrentsJson);

                const mp = new Map()
                ssa.forEach(element => {
                    mp[element.OBJECTID] = {
                        ssa: element,
                        waterCurrent: waterCurrent.find(wc => wc.OBJECTID == element.OBJECTID),
                        hwa: hwa.find(h => h.OBJECTID == element.OBJECTID)
                    }
                });
                console.log(mp);

            })
            .catch((error) => {
                console.log(error);
            });
            
            
            // console.log(ssa);
        })
        .catch((error) => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
}

getHwaSsa()