var mongoose = require('mongoose')
const ArticleSchema = new mongoose.Schema({
 Pname: { type: String, required: true },
 description :{type: String, required: true},
 quantity : {type: Number, required: true},
 price : {type: Number, required: true}
 
})
var Article = mongoose.model('Article', ArticleSchema)
module.exports = Article