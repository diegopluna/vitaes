import { withForm } from '@/components/form/form-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'
import { kendallRoyNew } from '@vitaes/types/example-data/en'

export const ListSectionEditor = withForm({
  defaultValues: kendallRoyNew,
  props: {
    index: 0,
  },
  render: function Render({ form, index }) {
    if (form.getFieldValue(`sections[${index}].structure.type`) !== 'flat') {
      return (
        <form.AppField name={`sections[${index}].structure.subsections`}>
          {(field) => {
            return (
              <div className="space-y-3">
                {field.state.value.map((sub, subIdx) => (
                  <Card key={sub.id} className="p-3 space-y-2 bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1">
                        <form.AppField
                          name={`sections[${index}].structure.subsections[${subIdx}].title`}
                          children={(field) => <field.FormInput />}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="size-7 p-0 text-destructive"
                        onClick={() => field.removeValue(subIdx)}
                      >
                        <Trash2 className="size-3" />
                      </Button>
                    </div>
                    <form.AppField
                      name={`sections[${index}].structure.subsections[${subIdx}].items`}
                    >
                      {(field) => {
                        return (
                          <div className="space-y-2 pl-6">
                            {field.state.value.map((item, itemIdx) => (
                              <Card
                                key={item.id}
                                className="p-3 space-y-2 bg-muted/30"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium text-muted-foreground">
                                    Item {itemIdx + 1}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="size-7 p-0 text-destructive"
                                    onClick={() => field.removeValue(itemIdx)}
                                  >
                                    <Trash2 className="size-3" />
                                  </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <form.AppField
                                    name={`sections[${index}].structure.subsections[${subIdx}].items[${itemIdx}].position`}
                                    children={(field) => <field.FormInput />}
                                  />
                                  <form.AppField
                                    name={`sections[${index}].structure.subsections[${subIdx}].items[${itemIdx}].date`}
                                    children={(field) => <field.FormInput />}
                                  />
                                </div>
                                <form.AppField
                                  name={`sections[${index}].structure.subsections[${subIdx}].items[${itemIdx}].title`}
                                  children={(field) => <field.FormInput />}
                                />
                                <form.AppField
                                  name={`sections[${index}].structure.subsections[${subIdx}].items[${itemIdx}].location`}
                                  children={(field) => <field.FormInput />}
                                />
                              </Card>
                            ))}
                          </div>
                        )
                      }}
                    </form.AppField>
                  </Card>
                ))}
              </div>
            )
          }}
        </form.AppField>
      )
    }

    return (
      <form.AppField name={`sections[${index}].structure.items`}>
        {(field) => {
          return (
            <div className="space-y-3">
              {field.state.value.map((item, itemIdx) => (
                <Card key={item.id} className="p-3 space-y-2 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Item {itemIdx + 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-7 p-0 text-destructive"
                      onClick={() => field.removeValue(itemIdx)}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <form.AppField
                      name={`sections[${index}].structure.items[${itemIdx}].position`}
                      children={(field) => <field.FormInput />}
                    />
                    <form.AppField
                      name={`sections[${index}].structure.items[${itemIdx}].date`}
                      children={(field) => <field.FormInput />}
                    />
                  </div>
                  <form.AppField
                    name={`sections[${index}].structure.items[${itemIdx}].title`}
                    children={(field) => <field.FormInput />}
                  />
                  <form.AppField
                    name={`sections[${index}].structure.items[${itemIdx}].location`}
                    children={(field) => <field.FormInput />}
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
                    position: '',
                    date: '',
                    title: '',
                    location: '',
                  })
                }
              >
                <Plus className="size-4 mr-2" />
                Add Item
              </Button>
            </div>
          )
        }}
      </form.AppField>
    )
  },
})
