import { withForm } from '@/components/form/form-context'
import { AwesomeColorSchema } from '@vitaes/types/colors'
import { kendallRoyNew } from '@vitaes/types/example-data/en'

export const ThemeForm = withForm({
  defaultValues: kendallRoyNew,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField
          name="config.themeColor"
          children={(field) => (
            <field.FormSelect
              label="Theme Color"
              options={Object.values(AwesomeColorSchema.enum).map((color) => ({
                label: color
                  .replace('awesome-', '')
                  .replace(/-/g, ' ')
                  .toUpperCase(),
                value: color,
              }))}
            />
          )}
        />
        <form.AppField
          name="config.headerAlign"
          children={(field) => (
            <field.FormSelect
              label="Header Align"
              options={['left', 'center', 'right'].map((align) => ({
                label: align.toUpperCase(),
                value: align,
              }))}
            />
          )}
        />
        <form.AppField
          name="config.pageSize"
          children={(field) => (
            <field.FormSelect
              label="Page Size"
              options={[
                { label: 'A4', value: 'A4' },
                { label: 'LETTER', value: 'LETTER' },
              ]}
            />
          )}
        />
      </>
    )
  },
})
