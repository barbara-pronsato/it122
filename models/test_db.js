
const Art = require('./arts');

Art.find({}, (err, result) => {
    //output error if one occured
    if (err) {
        console.log(err);
    
} else {
    //otherwise output the aray of documents
    console.log(result);
}
return

});