import { withForm } from '@/components/form/form-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { kendallRoyNew } from '@vitaes/types/example-data/en'
import { Plus, Trash2 } from 'lucide-react'
import { TimelineBulletPointsEditor } from './timeline-bullet-points-editor'
import { m } from '@/paraglide/messages'

export const TimelineSectionEditor = withForm({
  defaultValues: kendallRoyNew,
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
                      {m['editor.sectionsForm.sectionEditors.timeline.entry']({
                        index: entryIdx + 1,
                      })}
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
                    >
                      {(field) => (
                        <field.FormInput
                          label={m[
                            'editor.sectionsForm.sectionEditors.timeline.position'
                          ]()}
                        />
                      )}
                    </form.AppField>
                    {/* TODO: Add date range editor */}
                    <form.AppField
                      name={`sections[${index}].entries[${entryIdx}].date`}
                    >
                      {(field) => (
                        <field.FormInput
                          label={m[
                            'editor.sectionsForm.sectionEditors.timeline.date'
                          ]()}
                        />
                      )}
                    </form.AppField>
                  </div>
                  <form.AppField
                    name={`sections[${index}].entries[${entryIdx}].title`}
                  >
                    {(field) => (
                      <field.FormInput
                        label={m[
                          'editor.sectionsForm.sectionEditors.timeline.title'
                        ]()}
                      />
                    )}
                  </form.AppField>
                  <form.AppField
                    name={`sections[${index}].entries[${entryIdx}].location`}
                  >
                    {(field) => (
                      <field.FormInput
                        label={m[
                          'editor.sectionsForm.sectionEditors.timeline.location'
                        ]()}
                      />
                    )}
                  </form.AppField>
                  <form.AppField
                    name={`sections[${index}].entries[${entryIdx}].description`}
                  >
                    {(field) => (
                      <field.FormTextarea
                        rows={2}
                        label={m[
                          'editor.sectionsForm.sectionEditors.timeline.description'
                        ]()}
                      />
                    )}
                  </form.AppField>
                  <TimelineBulletPointsEditor
                    form={form}
                    sectionIndex={index}
                    entryIndex={entryIdx}
                  />
                </Card>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() =>
                  form.pushFieldValue(`sections[${index}].entries`, {
                    id: Date.now().toString(),
                    position: '',
                    date: '',
                    title: '',
                    location: '',
                    description: '',
                    items: [],
                  })
                }
              >
                <Plus className="size-4 mr-2" />
                {m['editor.sectionsForm.sectionEditors.timeline.addEntry']()}
              </Button>
            </div>
          )
        }}
      </form.AppField>
    )
  },
})
