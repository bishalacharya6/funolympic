const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    comment: {
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
 
});

module.exports = mongoose.model('comment' , NotesSchema);
