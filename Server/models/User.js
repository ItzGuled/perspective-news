const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const newsSchema = require('./News')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must enter an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        savedNews: [newsSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('newsCount').get(function() {
    return this.savedNews.length;
});

const User = model('User', userSchema);

module.exports = User;
