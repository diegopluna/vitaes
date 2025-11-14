import { withForm } from '@/components/form/form-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
                  <div className="flex items-center justify-between">
                    <form.AppField
                      name={`sections[${index}].categories[${categoryIdx}].type`}
                      children={(field) => <field.FormInput />}
                    />
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
                    name={`sections[${index}].categories[${categoryIdx}].items`}
                    children={(field) => (
                      <field.FormTextarea
                        rows={2}
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
                  />
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
                Add Category
              </Button>
            </div>
          )
        }}
      </form.AppField>
    )
  },
})
