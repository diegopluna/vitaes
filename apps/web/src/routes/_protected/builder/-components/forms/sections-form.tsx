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
import type { Section, SectionType } from '@vitaes/types/resume'
import { Plus } from 'lucide-react'
import { SectionItem } from './section-item'

export const SectionsForm = withForm({
  defaultValues: initialValue,
  render: function Render({ form }) {
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      }),
    )
    const generateSection = (type: SectionType) => {
      const section: Section = {
        id: Date.now().toString(),
        title: 'New Section',
        type,
        ...(type === 'text' && { content: '' }),
        ...(type === 'timeline' && { entries: [] }),
        ...(type === 'list' && { structure: { type: 'flat', items: [] } }),
        ...(type === 'taxonomy' && { categories: [] }),
      } as Section
      return section
    }

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event
      if (over && active.id !== over.id) {
        const oldIndex = form
          .getFieldValue('sections')
          .findIndex((section) => section.id === active.id)
        const newIndex = form
          .getFieldValue('sections')
          .findIndex((section) => section.id === over.id)
        form.setFieldValue(
          'sections',
          arrayMove(form.getFieldValue('sections'), oldIndex, newIndex),
        )
      }
    }

    return (
      <form.AppField name="sections" mode="array">
        {(field) => (
          <div className="space-y-4">
            <div className="flex justify-around flex-wrap pb-4 border-b">
              <Button
                onClick={() => field.pushValue(generateSection('text'))}
                variant="outline"
                size="sm"
              >
                <Plus className="size-4 mr-2" />
                Text
              </Button>
              <Button
                onClick={() => field.pushValue(generateSection('timeline'))}
                variant="outline"
                size="sm"
              >
                <Plus className="size-4 mr-2" />
                Timeline
              </Button>
              <Button
                onClick={() => field.pushValue(generateSection('list'))}
                variant="outline"
                size="sm"
              >
                <Plus className="size-4 mr-2" />
                List
              </Button>
              <Button
                onClick={() => field.pushValue(generateSection('taxonomy'))}
                variant="outline"
                size="sm"
              >
                <Plus className="size-4 mr-2" />
                Taxonomy
              </Button>
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={field.state.value}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3 px-3">
                  {field.state.value.map((section, idx) => (
                    <SectionItem
                      key={section.id}
                      form={form}
                      section={section}
                      index={idx}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}
      </form.AppField>
    )
  },
})
