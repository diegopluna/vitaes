'use client'

import { useTranslations } from 'next-intl'
import type { Project } from '@/convex/resume/type'
import { useResumeStore } from '@/providers/resume-store-provider'
import type { ItemData } from '../dnd/drag'
import { DragList } from '../dnd/list'
import { ProjectSheet } from '../sheet/project-sheet'

const projectKey = Symbol('project')

function getProjectData(project: Project): ItemData<Project> {
  return {
    [projectKey]: true,
    itemId: project.id,
  }
}

function isProjectData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Project> {
  return data[projectKey] === true
}

const ProjectDragList = DragList<Project>

export function ProjectForm() {
  const t = useTranslations('project-form')
  const { resume, setResumeField } = useResumeStore((s) => s)

  const projects = resume.projects

  const setProjects = (projects: Project[]) => {
    setResumeField('projects', {
      ...resume.projects,
      content: projects,
    })
  }

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {projects.content.length === 0 && (
        <p className="text-center">
          {t('no-projects-added', { label: projects.label })}
        </p>
      )}
      <ProjectDragList
        items={projects.content}
        getItemData={getProjectData}
        isItemData={isProjectData}
        setItems={setProjects}
        EditSheet={ProjectSheet}
        itemType={projects.label}
        onDelete={(id) => {
          setResumeField('projects', {
            ...resume.projects,
            content: projects.content.filter((project) => project.id !== id),
          })
        }}
      />
    </div>
  )
}
