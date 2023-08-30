import mongoose, { Document, Schema  } from 'mongoose';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

const saltRounds = 10;
const gensalt = bcrypt.genSalt(saltRounds);

export interface UserInterface extends Document {
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  compareUserPassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<UserInterface>(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 5,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 5,
    },
    birthDate: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  const hashPassword = await bcrypt.hash(this.password, await gensalt);
  this.password = hashPassword;
  this.confirmPassword = hashPassword;
});

UserSchema.methods.compareUserPassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

const User = mongoose.model('Users', UserSchema);

export default User;
