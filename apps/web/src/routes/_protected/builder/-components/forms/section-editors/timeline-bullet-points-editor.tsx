import { withForm } from '@/components/form/form-context'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { m } from '@/paraglide/messages'
import { kendallRoyNew } from '@vitaes/types/example-data/en'
import { Plus, Trash2 } from 'lucide-react'

export const TimelineBulletPointsEditor = withForm({
  defaultValues: kendallRoyNew,
  props: {
    sectionIndex: 0,
    entryIndex: 0,
  },
  render: function Render({ form, sectionIndex, entryIndex }) {
    return (
      <form.AppField
        name={`sections[${sectionIndex}].entries[${entryIndex}].items`}
      >
        {(field) => {
          return (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">
                  {m[
                    'editor.sectionsForm.sectionEditors.timeline.bulletPoints'
                  ]()}
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="size-7 p-0"
                  onClick={() => field.pushValue('')}
                >
                  <Plus className="size-3" />
                </Button>
              </div>
              {field.state.value?.map((_item, idx) => (
                <div key={idx} className="flex gap-2">
                  <form.AppField
                    name={`sections[${sectionIndex}].entries[${entryIndex}].items[${idx}]`}
                  >
                    {(field) => <field.FormInput />}
                  </form.AppField>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-7 p-0 text-destructive"
                    onClick={() => field.removeValue(idx)}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              ))}
            </div>
          )
        }}
      </form.AppField>
    )
  },
})
