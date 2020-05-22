import mongoose, { Document, Schema, Model, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name?: string,
    login: string,
    password: string,
    email?: string,
    validaSenha(password: string): Promise<boolean>
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default:Date.now,
    }
});

UserSchema.pre<IUser>("save", async function (next) {
    try {
        const user = this;
        const hash = await bcrypt.hash(user.password, 10);
        this.password = hash;
        return next();
    } catch (error) {
        return error
    }
})

//Outra forma de criptografar a senha
UserSchema.methods.encryptaSenha = async (password: string): Promise<string> => {
   const salt = await bcrypt.genSalt(10)
   return bcrypt.hash(password, salt)
};

UserSchema.methods.validaSenha = async function(password: string): Promise<boolean>{
    return await bcrypt.compare(password, this.password);
}
const User = model<IUser>("User", UserSchema);
export default User;