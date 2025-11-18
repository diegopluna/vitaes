import { withForm } from '@/components/form/form-context'
import { m } from '@/paraglide/messages'
import { useStore } from '@tanstack/react-form'
import { AwesomeColorSchema } from '@vitaes/types/colors'
import { kendallRoyNew } from '@vitaes/types/example-data/en'
import { TemplateSchema } from '@vitaes/types/resume'
import { TemplateCard } from '@/components/template-card'

export const ThemeForm = withForm({
  defaultValues: kendallRoyNew,
  render: function Render({ form }) {
    const pageNumberLeft = useStore(
      form.store,
      (state) => state.values.config.footerLeft.showPageNumber,
    )
    const pageNumberCenter = useStore(
      form.store,
      (state) => state.values.config.footerCenter.showPageNumber,
    )
    const pageNumberRight = useStore(
      form.store,
      (state) => state.values.config.footerRight.showPageNumber,
    )
    return (
      <>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Template</h3>
          <div className="grid grid-cols-2 gap-4">
            {TemplateSchema.options.map((template) => (
              <form.AppField key={template} name="config.template">
                {(field) => (
                  <TemplateCard
                    name={template}
                    selected={field.state.value === template}
                    onClick={() => field.handleChange(template)}
                  />
                )}
              </form.AppField>
            ))}
          </div>
        </div>

        <form.AppField name="config.themeColor">
          {(field) => (
            <field.FormSelect
              label={m['editor.themeForm.themeColor']()}
              options={Object.values(AwesomeColorSchema.enum).map((color) => ({
                label: color
                  .replace('awesome-', '')
                  .replaceAll(/-/g, ' ')
                  .toUpperCase(),
                value: color,
              }))}
            />
          )}
        </form.AppField>
        <form.AppField name="config.headerAlign">
          {(field) => (
            <field.FormSelect
              label={m['editor.themeForm.headerAlign']()}
              options={['left', 'center', 'right'].map((align) => ({
                label: align.toUpperCase(),
                value: align,
              }))}
            />
          )}
        </form.AppField>
        <form.AppField name="config.pageSize">
          {(field) => (
            <field.FormSelect
              label={m['editor.themeForm.pageSize']()}
              options={[
                { label: 'A4', value: 'A4' },
                { label: 'LETTER', value: 'LETTER' },
              ]}
            />
          )}
        </form.AppField>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">
              {m['editor.themeForm.footerLeft']()}
            </h3>
            <form.AppField name="config.footerLeft.text">
              {(field) => (
                <field.FormInput
                  label={m['editor.themeForm.footerText']()}
                  placeholder={m['editor.themeForm.footerTextPlaceholder']()}
                  disabled={pageNumberLeft}
                />
              )}
            </form.AppField>
            <form.AppField name="config.footerLeft.showPageNumber">
              {(field) => (
                <field.FormCheckbox
                  label={m['editor.themeForm.showPageNumber']()}
                />
              )}
            </form.AppField>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">
              {m['editor.themeForm.footerCenter']()}
            </h3>
            <form.AppField name="config.footerCenter.text">
              {(field) => (
                <field.FormInput
                  label={m['editor.themeForm.footerText']()}
                  placeholder={m['editor.themeForm.footerTextPlaceholder']()}
                  disabled={pageNumberCenter}
                />
              )}
            </form.AppField>
            <form.AppField name="config.footerCenter.showPageNumber">
              {(field) => (
                <field.FormCheckbox
                  label={m['editor.themeForm.showPageNumber']()}
                />
              )}
            </form.AppField>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">
              {m['editor.themeForm.footerRight']()}
            </h3>
            <form.AppField name="config.footerRight.text">
              {(field) => (
                <field.FormInput
                  label={m['editor.themeForm.footerText']()}
                  placeholder={m['editor.themeForm.footerTextPlaceholder']()}
                  disabled={pageNumberRight}
                />
              )}
            </form.AppField>
            <form.AppField name="config.footerRight.showPageNumber">
              {(field) => (
                <field.FormCheckbox
                  label={m['editor.themeForm.showPageNumber']()}
                />
              )}
            </form.AppField>
          </div>
        </div>
      </>
    )
  },
})
