'use client'

import { Project } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResumeStore } from '@/providers/resume-store-provider'
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
  const { resume, setProjects } = useResumeStore((state) => state)

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
        EditModal={ProjectSheet}
        itemType="project"
        onDelete={(id) => {
          setProjects(projects.filter((p) => p.id !== id))
        }}
      />
    </div>
  )
}
