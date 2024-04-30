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

export const registerSchema = Yup.object({
  body: Yup.object({
    username: Yup.string()
      .label('username')
      .trim()
      .min(3)
      .max(64)
      .matches(
        /^[a-zA-Z][a-zA-Z0-9_]*$/,
        "Username can only contain letters, numbers, and underscores.\nUsername can't starts with _ or number."
      )
      .required(),
    email: Yup.string()
      .label('email')
      .email('Enter a valid email!')
      .trim()
      .max(128)
      .required(),
    password: Yup.string().label('password').trim().min(6).max(128).required(),
  }),
})
