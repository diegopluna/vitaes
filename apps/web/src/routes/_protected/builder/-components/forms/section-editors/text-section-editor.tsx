import { withForm } from '@/components/form/form-context'
import { m } from '@/paraglide/messages'
import { kendallRoyNew } from '@vitaes/types/example-data/en'

export const TextSectionEditor = withForm({
  defaultValues: kendallRoyNew,
  props: {
    index: 0,
  },
  render: function Render({ form, index }) {
    return (
      <form.AppField name={`sections[${index}].content`}>
        {(field) => (
          <field.FormTextarea
            rows={6}
            label={m['editor.sectionsForm.sectionEditors.text.content']()}
          />
        )}
      </form.AppField>
    )
  },
})
