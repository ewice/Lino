const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
  };

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        minlength: 5,
        maxlength: 30
    },
    firstname: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Bitte nutze eine gültige Email-Adresse'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Bitte nutze eine gültige Email-Adresse']
    },
    password: String,
    token: String,
    profilImageUrl: String,
    birthyear: Number,
    friends: [{type: mongoose.ObjectId, ref: 'user'}],
    activeProjects: [{pid: {type: mongoose.ObjectId, ref: "projectDetail"}, startTime: Date}],
    finishedProjects: [{pid: {type: mongoose.ObjectId, ref: "projectDetail"}, endTime: Date}],
    favProjects: [{type: mongoose.ObjectId, ref: "projectDetail"}],
    invitations: [{type: mongoose.ObjectId, ref: 'invitation'}]
    
});

module.exports = mongoose.model('user', userSchema);

