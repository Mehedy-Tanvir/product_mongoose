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
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        instore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL']
    }

});
productSchema.methods.greet = function () {
    console.log('Hello!!! Hi!!! Howdy!!!');
    console.log(`- from ${this.name}`)
}
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}
productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}
productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}
const Product = mongoose.model('Product', productSchema); //methods need to be placed before this
// const bike = new Product({ name: 'Cycling Jersey', price: 28.58, categories: ['Cycling'], size: 'XS' });
// bike.save()
//     .then(data => {
//         console.log("It Worked!!!");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("Oh No Error!!!");
//         console.log(err);
//     })
// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: -10.99 }, { new: true, runValidators: true })
//     .then(data => {
//         console.log("It Worked!!!");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("Oh No Error!!!");
//         console.log(err);
//     })
// const p = new Product({ name: 'Bike Bag', price: 10 });
// p.greet();

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mountain Bike' });
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory('Outdoors');
    console.log(foundProduct);
}
Product.fireSale().then(res => console.log(res))

// findProduct();



