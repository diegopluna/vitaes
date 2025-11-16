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
          <form.AppField
            name="personalInfo.firstName"
            children={(field) => (
              <field.FormInput label={m['editor.personalForm.firstName']()} />
            )}
          />
          <form.AppField
            name="personalInfo.lastName"
            children={(field) => (
              <field.FormInput label={m['editor.personalForm.lastName']()} />
            )}
          />
        </div>
        <form.AppField
          name="personalInfo.position"
          children={(field) => (
            <field.FormInput label={m['editor.personalForm.position']()} />
          )}
        />
        <form.AppField
          name="personalInfo.address"
          children={(field) => (
            <field.FormInput label={m['editor.personalForm.address']()} />
          )}
        />
        <form.AppField
          name="personalInfo.quote"
          children={(field) => (
            <field.FormInput label={m['editor.personalForm.quote']()} />
          )}
        />
        <SocialsForm form={form} />
      </>
    )
  },
})
