'use client'

import { Project } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { ProjectSheet } from './sheets/project-sheet'
import { useResumeStore } from '@/providers/resume-store-provider'

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

  const projects = resume.projects

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {projects.length === 0 && <p className="text-center">No project added</p>}
      <ProjectDragList
        items={projects}
        getItemData={getProjectData}
        isItemData={isProjectData}
        setItems={setResumeField.bind(null, 'projects')}
        EditSheet={ProjectSheet}
        itemType="Project"
        onDelete={id => {
          setResumeField(
            'projects',
            projects.filter(w => w.id !== id),
          )
        }}
      />
    </div>
  )
}
