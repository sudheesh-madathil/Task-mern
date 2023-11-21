const mongoose = require ("mongoose")

const Schema = new mongoose.Schema({
 task:{
    type:String,
    required:true,
 }
});

module.exports = mongoose.model('userdata',Schema)
