'use client'

import { Skill } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResumeStore } from '@/providers/resume-store-provider'
import { SkillSheet } from './sheets/skill-sheet'

const skillKey = Symbol('skill')

function getSkillData(skill: Skill): ItemData<Skill> {
  return {
    [skillKey]: true,
    itemId: skill.id,
  }
}

function isSkillData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Skill> {
  return data[skillKey] === true
}

const SkillDragList = DragList<Skill>

export const SkillsForm = () => {
  const { resume, setSkills } = useResumeStore((state) => state)

  const skills = resume.skills

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {skills.length === 0 && <p className="text-center">No skills added</p>}
      <SkillDragList
        items={skills}
        getItemData={getSkillData}
        isItemData={isSkillData}
        setItems={setSkills}
        itemType="skill"
        onDelete={(id) => {
          setSkills(skills.filter((s) => s.id !== id))
        }}
        EditModal={SkillSheet}
      />
    </div>
  )
}
