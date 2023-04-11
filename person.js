const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/shop')
    .then(() => {
        console.log('connection open!!!');
    })
    .catch(err => {
        console.log('Oh no error');
        console.log(err);
    });

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})
personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`;
});
personSchema.pre('save', async function () {
    this.first = 'YO';
    this.last = 'MAMA';
    console.log('About To Save!!!');
});
personSchema.post('save', async function () {
    console.log('Just Saved!!!');
});
const Person = mongoose.model('Person', personSchema);

const Tanvir = new Person({ first: 'Mehedy', last: 'Tanvir' });
Tanvir.save();
