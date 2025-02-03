'use client'

import { Volunteer } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResume } from '@/providers/resume-provider'
import { VolunteerSheet } from './sheets/volunteer-sheet'

const volunteerKey = Symbol('volunteer')

function getVolunteerData(volunteer: Volunteer): ItemData<Volunteer> {
  return {
    [volunteerKey]: true,
    itemId: volunteer.id,
  }
}

function isVolunteerData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Volunteer> {
  return data[volunteerKey] === true
}

const VolunteerDragList = DragList<Volunteer>

export const VolunteerForm = () => {
  const { resume, setVolunteer } = useResume()

  const volunteers = resume.volunteer

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {volunteers.length === 0 && (
        <p className="text-center">No volunteer experience added</p>
      )}
      <VolunteerDragList
        items={volunteers}
        getItemData={getVolunteerData}
        isItemData={isVolunteerData}
        setItems={setVolunteer}
        EditSheet={VolunteerSheet}
        itemType="Volunteer Experience"
        onDelete={(id) => {
          setVolunteer(volunteers.filter((v) => v.id !== id))
        }}
      />
    </div>
  )
}
