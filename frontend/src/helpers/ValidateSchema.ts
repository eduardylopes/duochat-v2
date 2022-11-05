import { setIn } from 'final-form'

const ValidateSchema = (schema: any) => async (values: any) => {
  const theSchema = typeof schema === 'function' ? schema() : schema

  try {
    await theSchema.validate(values, { abortEarly: false })
  } catch (e: any) {
    return e.inner.reduce((errors: any, error: any) => {
      return setIn(errors, error.path, error.message)
    }, {})
  }
  return true
}

export default ValidateSchema
