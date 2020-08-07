// const credentials = require("../credentials");
const mongoose = require("mongoose");


// // remote db connection settings. For security, connectionString should be in a separate file not committed to git
const connectionString = "mongodb+srv://dbuser:password2323@cluster0.nx7so.gcp.mongodb.net/sccprojects?retryWrites=true&w=majority";




mongoose.connect(connectionString, { dbName: 'sccprojects', useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});



const mySchema = mongoose.Schema({
  
 title: { type: String, required: true },
 artist: String,
 year: String,
 materials: String,
 

}); 

module.exports = mongoose.model('arts', mySchema);
