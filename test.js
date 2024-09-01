const b = require('./beaches.json')

b.forEach((beach, index) => {
    if(beach.OBJECTID === undefined) {
        console.log(index, beach);
    } 
})