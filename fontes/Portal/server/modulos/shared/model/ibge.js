module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

    var Model = new Schema({
        uf: {type: String, required: true},
        ibge: {type: String, required: true},
        nome: {type: String, required: true}
    });

    return mongoose.model("Ibge", Model);
};



