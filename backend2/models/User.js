const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { AppError } = require('../src/errors');


const UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true},
    role: { type: String, required: true },
    passwordHash: { type: String },
}, { collection: 'users' });

UserSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password , this.passwordHash);
};

UserSchema.methods.setPassword = async function(password) {
    this.passwordHash = await bcrypt.hash(password, 10);
}

UserSchema.methods.toJSON = function() {
    var obj = this.toObject()
    obj.hasPassword = obj.passwordHash !== null && obj.passwordHash !== undefined && obj.passwordHash !== ''
    delete obj.passwordHash
    delete obj.__v
    obj.id = obj._id
    delete obj._id
    return obj
}

UserSchema.methods.canView = function(article) {

    if(article.public) return true;
    return this.role !== 'registered';
}



UserSchema.statics.registerUser = async function(email, password, firstName, lastName) {

    // Check if the user already exists and has a password
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.passwordHash !== null) {
        throw new AppError('User already exists', 409, 'user-exists');
    }

    if (existingUser) {
        await existingUser.setPassword(password);
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        await existingUser.save();
        return existingUser;
    }
    else {
        const newUser = new User({ username: email, email: email, role: 'registered', firstName, lastName });
        await newUser.setPassword(password);
        await newUser.save();
        return newUser;
    }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;