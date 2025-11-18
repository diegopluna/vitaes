import { withForm } from '@/components/form/form-context'
import { kendallRoyNew } from '@vitaes/types/example-data/en'
import { SocialsForm } from './socials-form'
import { m } from '@/paraglide/messages'

export const PersonalForm = withForm({
  defaultValues: kendallRoyNew,
  render: function Render({ form }) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4">
          <form.AppField name="personalInfo.firstName">
            {(field) => (
              <field.FormInput label={m['editor.personalForm.firstName']()} />
            )}
          </form.AppField>
          <form.AppField name="personalInfo.lastName">
            {(field) => (
              <field.FormInput label={m['editor.personalForm.lastName']()} />
            )}
          </form.AppField>
        </div>
        <form.AppField name="personalInfo.position">
          {(field) => (
            <field.FormInput label={m['editor.personalForm.position']()} />
          )}
        </form.AppField>
        <form.AppField name="personalInfo.address">
          {(field) => (
            <field.FormInput label={m['editor.personalForm.address']()} />
          )}
        </form.AppField>
        <form.AppField name="personalInfo.quote">
          {(field) => (
            <field.FormInput label={m['editor.personalForm.quote']()} />
          )}
        </form.AppField>
        <SocialsForm form={form} />
      </>
    )
  },
})
