import { withForm } from '@/components/form/form-context'
import { Button } from '@/components/ui/button'
import { kendallRoyNew } from '@vitaes/types/example-data/en'
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
import { m } from '@/paraglide/messages'

export const SectionsForm = withForm({
  defaultValues: kendallRoyNew,
  render: function Render({ form }) {
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      }),
    )
    const generateSection = (type: SectionType | 'grouped-list') => {
      const section: Section = {
        id: Date.now().toString(),
        title: 'New Section',
        type: type === 'grouped-list' ? 'list' : type,
        ...(type === 'text' && { content: '' }),
        ...(type === 'timeline' && { entries: [] }),
        ...(type === 'list' && { structure: { type: 'flat', items: [] } }),
        ...(type === 'grouped-list' && {
          structure: { type: 'grouped', subsections: [] },
        }),
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
            <div className="flex gap-2 px-2 flex-wrap pb-4 border-b">
              <Button
                onClick={() => field.pushValue(generateSection('text'))}
                variant="outline"
                size="sm"
              >
                <Plus className="size-4 mr-2" />
                {m['editor.sectionsForm.text']()}
              </Button>
              <Button
                onClick={() => field.pushValue(generateSection('timeline'))}
                variant="outline"
                size="sm"
              >
                <Plus className="size-4 mr-2" />
                {m['editor.sectionsForm.timeline']()}
              </Button>
              <Button
                onClick={() => field.pushValue(generateSection('list'))}
                variant="outline"
                size="sm"
              >
                <Plus className="size-4 mr-2" />
                {m['editor.sectionsForm.list']()}
              </Button>
              <Button
                onClick={() => field.pushValue(generateSection('grouped-list'))}
                variant="outline"
                size="sm"
              >
                <Plus className="size-4 mr-2" />
                {m['editor.sectionsForm.groupedList']()}
              </Button>
              <Button
                onClick={() => field.pushValue(generateSection('taxonomy'))}
                variant="outline"
                size="sm"
              >
                <Plus className="size-4 mr-2" />
                {m['editor.sectionsForm.taxonomy']()}
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
