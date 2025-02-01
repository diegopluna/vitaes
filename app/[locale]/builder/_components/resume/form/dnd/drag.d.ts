import { type Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
export type DraggableState =
  | { type: 'idle' }
  | { type: 'preview'; container: HTMLElement }
  | { type: 'is-dragging' }
  | { type: 'is-dragging-over'; closestEdge: Edge | null }

export type ItemData<T extends { id: string }> = {
  [key: symbol]: true
  itemId: T['id']
}
