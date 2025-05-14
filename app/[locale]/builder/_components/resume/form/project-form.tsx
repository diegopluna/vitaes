'use client'

import { Project } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { ProjectSheet } from './sheets/project-sheet'
import { useResumeStore } from '@/providers/resume-store-provider'
import { useTranslations } from 'next-intl'

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

export const ProjectForm = () => {
  const { resume, setResumeField } = useResumeStore(s => s)
  const t = useTranslations('ProjectForm')

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
          {t('noneAdded', { label: projects.label })}
        </p>
      )}
      <ProjectDragList
        items={projects.content}
        getItemData={getProjectData}
        isItemData={isProjectData}
        setItems={setProjects}
        EditSheet={ProjectSheet}
        itemType="Project"
        onDelete={id => {
          setResumeField('projects', {
            ...resume.projects,
            content: projects.content.filter(project => project.id !== id),
          })
        }}
      />
    </div>
  )
}
