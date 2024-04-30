import * as Yup from 'yup'

export const loginSchema = Yup.object({
  body: Yup.object({
    email: Yup.string()
      .label('email')
      .email('Enter a valid email!')
      .trim()
      .max(128)
      .required(),
    password: Yup.string().label('password').trim().min(6).max(128).required(),
  }),
})
