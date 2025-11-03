import { createFormHook } from '@tanstack/react-form'
import { FormInput } from './form-input'
import { createFormHookContexts } from '@tanstack/react-form'
import { FormSelect } from './form-select'

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

const { useAppForm, withForm } = createFormHook({
  formComponents: {},
  fieldComponents: {
    FormInput,
    FormSelect,
  },
  fieldContext,
  formContext,
})

export { useAppForm, withForm }
