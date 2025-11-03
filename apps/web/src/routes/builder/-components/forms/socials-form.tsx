import { withForm } from '@/components/form/form-context'
import { Button } from '@/components/ui/button'
import { initialValue } from '@/utils/initial-value'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { PlusIcon } from 'lucide-react'
import { SocialsItem } from './socials-item'
import { FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field'

export const SocialsForm = withForm({
  defaultValues: initialValue,
  render: function Render({ form }) {
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      }),
    )

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event

      if (over && active.id !== over.id) {
        const oldIndex = form
          .getFieldValue('personalInfo.socials')
          .findIndex((profile) => profile.id === active.id)
        const newIndex = form
          .getFieldValue('personalInfo.socials')
          .findIndex((profile) => profile.id === over.id)

        const newSocials = arrayMove(
          form.getFieldValue('personalInfo.socials'),
          oldIndex,
          newIndex,
        )
        form.setFieldValue('personalInfo.socials', newSocials)
      }
    }

    return (
      <form.AppField name="personalInfo.socials" mode="array">
        {(field) => {
          return (
            <FieldSet className="gap-3">
              <div className="flex items-center justify-between">
                <FieldLegend className="mb-0" variant="label">
                  Social Profiles
                </FieldLegend>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    field.pushValue({
                      id: Date.now().toString(),
                      platform: 'email',
                      value: '',
                    })
                  }
                >
                  <PlusIcon className="size-4" />
                  Add Profile
                </Button>
              </div>
              <FieldGroup>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={field.state.value}
                    strategy={verticalListSortingStrategy}
                  >
                    {field.state.value.map((profile, index) => (
                      <SocialsItem
                        form={form}
                        profile={profile}
                        index={index}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </FieldGroup>
            </FieldSet>
          )
        }}
      </form.AppField>
    )
  },
})
