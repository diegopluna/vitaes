import { withForm } from '@/components/form/form-context'
import { initialValue } from '@/utils/initial-value'
import { useSortable } from '@dnd-kit/sortable'
import type { Section } from '@vitaes/types/resume'
import { CSS } from '@dnd-kit/utilities'
import { Card } from '@/components/ui/card'
import { ChevronDown, ChevronUp, GripVertical, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TextSectionEditor } from './section-editors/text-section-editor'
import { TimelineSectionEditor } from './section-editors/timeline-section-editor'

export const SectionItem = withForm({
  defaultValues: initialValue,
  props: {
    section: {} as Section,
    index: 0,
  },
  render: function Render({ form, section, index }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: section.id,
    })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    }

    const handleToggle = () => {
      setIsExpanded(!isExpanded)
    }

    const handleDelete = () => {
      form.setFieldValue(
        'sections',
        form.getFieldValue('sections').filter((s) => s.id !== section.id),
      )
    }

    return (
      <Card ref={setNodeRef} style={style} className="overflow-hidden">
        <div className="flex items-center gap-2 p-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="size-4 text-muted-foreground" />
          </div>
          <form.AppField
            name={`sections[${index}].title`}
            children={(field) => (
              <field.FormInput className="flex-1 h-8 font-medium bg-background" />
            )}
          />
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground px-2 py-1 bg-background rounded">
              {section.type}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggle}
              className="h-8 w-8 p-0"
            >
              {isExpanded ? (
                <ChevronUp className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="h-8 w-8 p-0 text-destructive"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
        {isExpanded && (
          <div className="p-4 space-y-3">
            {section.type === 'text' && (
              <TextSectionEditor form={form} index={index} />
            )}
            {section.type === 'timeline' && (
              <TimelineSectionEditor form={form} index={index} />
            )}
          </div>
        )}
      </Card>
    )
  },
})
