import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cart: { type: Object, default: {}, ref: 'Food' }
    },
    { minimize: false }
);

const UserModel = mongoose.model.user || mongoose.model('user', userSchema);

export default UserModel;
