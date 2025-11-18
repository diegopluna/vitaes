import { withForm } from '@/components/form/form-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { m } from '@/paraglide/messages'
import { kendallRoyNew } from '@vitaes/types/example-data/en'
import { Plus, Trash2 } from 'lucide-react'

export const TaxonomySectionEditor = withForm({
  defaultValues: kendallRoyNew,
  props: {
    index: 0,
  },
  render: function Render({ form, index }) {
    return (
      <form.AppField name={`sections[${index}].categories`}>
        {(field) => {
          return (
            <div className="space-y-3">
              {field.state.value.map((category, categoryIdx) => (
                <Card key={category.id} className="p-3 space-y-2 bg-muted/30">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      {m[
                        'editor.sectionsForm.sectionEditors.taxonomy.category'
                      ]({
                        index: categoryIdx + 1,
                      })}
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-7 p-0 text-destructive"
                      onClick={() => field.removeValue(categoryIdx)}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                  <form.AppField
                    name={`sections[${index}].categories[${categoryIdx}].type`}
                  >
                    {(field) => (
                      <field.FormInput
                        label={m[
                          'editor.sectionsForm.sectionEditors.taxonomy.type'
                        ]()}
                      />
                    )}
                  </form.AppField>
                  <form.AppField
                    name={`sections[${index}].categories[${categoryIdx}].items`}
                  >
                    {(field) => (
                      <field.FormTextarea
                        rows={2}
                        label={m[
                          'editor.sectionsForm.sectionEditors.taxonomy.items'
                        ]()}
                        onChange={(e) =>
                          field.setValue(
                            e.target.value
                              .split(',')
                              .map((item) => item.trim())
                              .filter(Boolean),
                          )
                        }
                      />
                    )}
                  </form.AppField>
                </Card>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() =>
                  field.pushValue({
                    id: Date.now().toString(),
                    type: '',
                    items: [],
                  })
                }
              >
                <Plus className="size-4 mr-2" />
                {m['editor.sectionsForm.sectionEditors.taxonomy.addCategory']()}
              </Button>
            </div>
          )
        }}
      </form.AppField>
    )
  },
})
