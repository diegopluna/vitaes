import { withForm } from '@/components/form/form-context'
import { initialValue } from '@/utils/initial-value'
import { SocialsForm } from './socials-form'

export const PersonalForm = withForm({
  defaultValues: initialValue,
  render: function Render({ form }) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4">
          <form.AppField
            name="personalInfo.firstName"
            children={(field) => <field.FormInput label="First Name" />}
          />
          <form.AppField
            name="personalInfo.lastName"
            children={(field) => <field.FormInput label="Last Name" />}
          />
        </div>
        <form.AppField
          name="personalInfo.position"
          children={(field) => <field.FormInput label="Position" />}
        />
        <form.AppField
          name="personalInfo.address"
          children={(field) => <field.FormInput label="Address" />}
        />
        <form.AppField
          name="personalInfo.quote"
          children={(field) => <field.FormInput label="Quote" />}
        />
        <SocialsForm form={form} />
      </>
    )
  },
})
