import * as Yup from 'yup'

export const idParamSchema = Yup.object({
  params: Yup.object({
    id: Yup.number()
      .label('id')
      .positive()
      .typeError('id must be a number.')
      .required(),
  }),
})
