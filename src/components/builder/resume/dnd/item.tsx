import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper'
import { m } from '@/paraglide/messages'
import {
	attachClosestEdge,
	extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import {
	draggable,
	dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { IconTrash } from '@tabler/icons-react'
import { IconPencil } from '@tabler/icons-react'
import { IconGripVertical } from '@tabler/icons-react'
import { invariant } from '@tanstack/react-router'
import {
	type HTMLAttributes,
	type JSX,
	useEffect,
	useRef,
	useState,
} from 'react'
import { createPortal } from 'react-dom'
import { DeleteModal } from '../modal/delete-modal'
import type { DraggableState, ItemData } from './drag'
import { DropIndicator } from './drop-indicator'

const stateStyles: {
	[Key in DraggableState['type']]?: HTMLAttributes<HTMLDivElement>['className']
} = {
	'is-dragging': 'opacity-40',
}

const idleState: DraggableState = { type: 'idle' }

interface ListItemProps<T extends { id: string }> {
	item: T
	getItemData(item: T): ItemData<T extends { id: string } ? T : never>
	isItemData(data: Record<string | symbol, unknown>): data is ItemData<T>
	EditSheet({ defaultValues }: { defaultValues?: T }): JSX.Element
	onDelete(id: string): void
	itemType: string
}

export function ListItem<T extends { id: string }>({
	item,
	getItemData,
	isItemData,
	EditSheet,
	onDelete,
	itemType,
}: ListItemProps<T>) {
	const ref = useRef<HTMLDivElement | null>(null)
	const dragHandleRef = useRef<HTMLDivElement | null>(null)
	const [draggableState, setDraggableState] =
		useState<DraggableState>(idleState)

	useEffect(() => {
		const element = ref.current
		const dragHandle = dragHandleRef.current
		invariant(element)
		invariant(dragHandle)

		return combine(
			draggable({
				element,
				dragHandle,
				getInitialData() {
					return getItemData(item)
				},
				onGenerateDragPreview({ nativeSetDragImage }) {
					setCustomNativeDragPreview({
						nativeSetDragImage,
						getOffset: pointerOutsideOfPreview({
							x: '16px',
							y: '8px',
						}),
						render({ container }) {
							setDraggableState({ type: 'preview', container })
						},
					})
				},
				onDragStart() {
					setDraggableState({ type: 'is-dragging' })
				},
				onDrop() {
					setDraggableState(idleState)
				},
			}),
			dropTargetForElements({
				element,
				canDrop({ source }) {
					if (source.element === element) {
						return false
					}

					return isItemData(source.data)
				},
				getData({ input }) {
					const data = getItemData(item)
					return attachClosestEdge(data, {
						element,
						input,
						allowedEdges: ['top', 'bottom'],
					})
				},
				getIsSticky() {
					return true
				},
				onDragEnter({ self }) {
					const closestEdge = extractClosestEdge(self.data)
					setDraggableState({ type: 'is-dragging-over', closestEdge })
				},
				onDrag({ self }) {
					const closestEdge = extractClosestEdge(self.data)

					setDraggableState((current) => {
						if (
							current.type === 'is-dragging-over' &&
							current.closestEdge === closestEdge
						) {
							return current
						}
						return { type: 'is-dragging-over', closestEdge }
					})
				},
				onDragLeave() {
					setDraggableState(idleState)
				},
				onDrop() {
					setDraggableState(idleState)
				},
			}),
		)
	}, [item, getItemData, isItemData])

	return (
		<>
			<div className="relative w-full">
				<Card
					data-item-id={item.id}
					ref={ref}
					className={`${stateStyles[draggableState.type] ?? ''}`}
				>
					<CardContent className="p-4 flex items-center justify-between">
						<div ref={dragHandleRef} className="mr-2 hover:cursor-move">
							<IconGripVertical />
						</div>
						<span className="flex-grow mr-2">{item.id}</span>
						<div className="flex space-x-2">
							<EditSheet defaultValues={item} />
							<DeleteModal
								type={itemType}
								onDelete={() => onDelete(item.id)}
								id={item.id}
							/>
						</div>
					</CardContent>
				</Card>
				{draggableState.type === 'is-dragging-over' &&
				draggableState.closestEdge ? (
					<DropIndicator edge={draggableState.closestEdge} />
				) : null}
			</div>
			{draggableState.type === 'preview'
				? createPortal(<DragPreview<T> item={item} />, draggableState.container)
				: null}
		</>
	)
}

function DragPreview<T extends { id: string }>({ item }: { item: T }) {
	return (
		<Card className="w-full">
			<CardContent className="p-4 flex items-cetner justify-between">
				<div className="mr-2 cursor-move">
					<IconGripVertical />
				</div>
				<span className="flex-grow mr-2">{item.id}</span>
				<div className="flex space-x-2">
					<TooltipWrapper tooltip={m['item.edit']()}>
						<Button variant="outline" size="icon">
							<IconPencil className="size-4" />
						</Button>
					</TooltipWrapper>
					<TooltipWrapper tooltip={m['item.delete']()}>
						<Button variant="outline" size="icon">
							<IconTrash className="size-4" />
						</Button>
					</TooltipWrapper>
				</div>
			</CardContent>
		</Card>
	)
}
