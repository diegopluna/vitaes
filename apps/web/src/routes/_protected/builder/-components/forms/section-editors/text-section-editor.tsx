import { withForm } from '@/components/form/form-context'
import { initialValue } from '@/utils/initial-value'

export const TextSectionEditor = withForm({
  defaultValues: initialValue,
  props: {
    index: 0,
  },
  render: function Render({ form, index }) {
    return (
      <form.AppField
        name={`sections[${index}].content`}
        children={(field) => <field.FormTextarea rows={6} />}
      />
    )
  },
})
