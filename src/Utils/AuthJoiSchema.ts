import Joi from "joi"

interface UserJoi {
  firstName: string,
  lastName: string,
  birthDate: string,
  city: string,
  country: string,
  email: string,
  password: string,
  confirmPassword: string
}

export const UserJoiSchema = Joi.object <UserJoi> ({
  firstName: Joi.string().min(5).required(),
  lastName: Joi.string().min(5).required(),
  birthDate: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required()
}).options({ abortEarly: false })