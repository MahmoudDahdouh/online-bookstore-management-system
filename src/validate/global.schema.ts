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

export const idBodySchema = Yup.object({
  body: Yup.object({
    id: Yup.number()
      .label('id')
      .positive()
      .typeError('id must be a number.')
      .required(),
  }),
})

export const paginationSchema = Yup.object({
  query: Yup.object({
    page: Yup.number()
      .label('page')
      .integer()
      .positive()
      .default(1)
      .transform((value) => (isNaN(value) ? undefined : value))
      .transform((value) => {
        if (value < 1) return 1
        else return value
      })
      .required(),
    page_size: Yup.number()
      .label('page size')
      .integer()
      .positive()
      .default(20)
      .transform((value) => (isNaN(value) ? undefined : value))
      .transform((value, originalValue) => {
        if (originalValue > 100) return 100
        else if (originalValue < 1) return 20
        else return value
      }),
  }),
})

export const searchAndFilterSchema = Yup.object({
  query: Yup.object({
    search_query: Yup.string()
      .label('search query')
      .nullable()
      .default('')
      .optional(),
    sort: Yup.string().default('created_at').nullable().optional(),
    order_by: Yup.string()
      .default('desc')
      .nullable()
      .optional()
      .transform((value) => {
        if (!['desc', 'asc'].includes(value)) {
          return 'desc'
        }
        return value
      }),
  }),
})
