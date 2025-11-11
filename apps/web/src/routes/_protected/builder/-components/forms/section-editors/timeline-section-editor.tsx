import { withForm } from '@/components/form/form-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { initialValue } from '@/utils/initial-value'
import { Trash2 } from 'lucide-react'
import { TimelineBulletPointsEditor } from './timeline-bullet-points-editor'

export const TimelineSectionEditor = withForm({
  defaultValues: initialValue,
  props: {
    index: 0,
  },
  render: function Render({ form, index }) {
    const handleDeleteEntry = (entryId: string) => {
      form.setFieldValue(
        `sections[${index}].entries`,
        form
          .getFieldValue(`sections[${index}].entries`)
          .filter((entry) => entry.id !== entryId),
      )
    }

    return (
      <form.AppField name={`sections[${index}].entries`}>
        {(field) => {
          return (
            <div className="space-y-3">
              {field.state.value.map((entry, entryIdx) => (
                <Card key={entry.id} className="p-3 space-y-3 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Entry {entryIdx + 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-7 p-0 text-destructive"
                      onClick={() => handleDeleteEntry(entry.id)}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <form.AppField
                      name={`sections[${index}].entries[${entryIdx}].position`}
                      children={(field) => <field.FormInput label="Position" />}
                    />
                    <form.AppField
                      name={`sections[${index}].entries[${entryIdx}].date`}
                      children={(field) => <field.FormInput label="Date" />}
                    />
                  </div>
                  <form.AppField
                    name={`sections[${index}].entries[${entryIdx}].title`}
                    children={(field) => <field.FormInput label="Title" />}
                  />
                  <form.AppField
                    name={`sections[${index}].entries[${entryIdx}].location`}
                    children={(field) => <field.FormInput label="Location" />}
                  />
                  <form.AppField
                    name={`sections[${index}].entries[${entryIdx}].description`}
                    children={(field) => (
                      <field.FormTextarea rows={2} label="Description" />
                    )}
                  />
                  <TimelineBulletPointsEditor
                    form={form}
                    sectionIndex={index}
                    entryIndex={entryIdx}
                  />
                </Card>
              ))}
            </div>
          )
        }}
      </form.AppField>
    )
  },
})
