'use client'

import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge'
import { useEffect } from 'react'
import { flushSync } from 'react-dom'
import type { ItemData } from './drag'
import { ListHighlightItem } from './highlight-item'

interface HighlightDragListProps<T extends { id: string; value: string }> {
  items: T[]
  setItems(items: T[]): void
  getItemData(
    items: T,
  ): ItemData<T extends { id: string; value: string } ? T : never>
  isItemData(data: Record<string | symbol, unknown>): data is ItemData<T>
  onChangeText(id: string, value: string): void
  itemType: string
  onDelete(id: string): void
}

export function HighlightDragList<T extends { id: string; value: string }>({
  items,
  setItems,
  getItemData,
  isItemData,
  itemType,
  onDelete,
  onChangeText,
}: HighlightDragListProps<T>) {
  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return isItemData(source.data)
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0]
        if (!target) return

        const sourceData = source.data
        const targetData = target.data

        if (!isItemData(sourceData) || !isItemData(targetData)) return

        const sourceIndex = items.findIndex(
          (item) => item.id === sourceData.itemId,
        )
        const targetIndex = items.findIndex(
          (item) => item.id === targetData.itemId,
        )

        if (sourceIndex < 0 || targetIndex < 0) return

        const closestEdgeOfTarget = extractClosestEdge(targetData)

        flushSync(() => {
          setItems(
            reorderWithEdge({
              list: items,
              startIndex: sourceIndex,
              indexOfTarget: targetIndex,
              closestEdgeOfTarget,
              axis: 'vertical',
            }),
          )
        })
      },
    })
  })

  return (
    <>
      {items.map((item) => (
        <ListHighlightItem<T>
          key={item.id}
          item={item}
          getItemData={getItemData}
          isItemData={isItemData}
          onDelete={onDelete}
          itemType={itemType}
          onChangeText={onChangeText}
        />
      ))}
    </>
  )
}
