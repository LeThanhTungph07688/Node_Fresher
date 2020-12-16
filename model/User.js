const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})
// Băm mật khẩu trước khi lưu
UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
);
//So sánh mật khẩu 
UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

module.exports = mongoose.model('User', UserSchema);


