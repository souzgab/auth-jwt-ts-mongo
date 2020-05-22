import mongoose from 'mongoose';
export interface IUser extends mongoose.Document {
    name: string;
    login: string;
    password: string;
    email: string;
}
