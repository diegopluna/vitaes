'use client'

import { Project } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResume } from '@/providers/resume-provider'
import { ProjectSheet } from './sheets/project-sheet'

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

export const ProjectsForm = () => {
  const { resume, setProjects } = useResume()

  const projects = resume.projects

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {projects.length === 0 && (
        <p className="text-center">No projects added</p>
      )}
      <ProjectDragList
        items={projects}
        getItemData={getProjectData}
        isItemData={isProjectData}
        setItems={setProjects}
        EditSheet={ProjectSheet}
        itemType="Project"
        onDelete={(id) => {
          setProjects(projects.filter((w) => w.id !== id))
        }}
      />
    </div>
  )
}
