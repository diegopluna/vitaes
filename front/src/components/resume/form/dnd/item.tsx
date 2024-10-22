import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview";
import { invariant } from "@tanstack/react-router";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { DropIndicator } from "./drop-indicator";
import { createPortal } from "react-dom";
import { DraggableState, ItemData } from "./drag";

const stateStyles: {
  [Key in DraggableState["type"]]?: HTMLAttributes<HTMLDivElement>["className"];
} = {
  "is-dragging": "opacity-40",
};

const idleState: DraggableState = { type: "idle" };

interface ListItemProps<T extends { id: string }> {
  item: T;
  getItemData: (item: T) => ItemData<T extends { id: string } ? T : never>;
  isItemData: (data: Record<string | symbol, unknown>) => data is ItemData<T>;
  EditModal: (
    { defaultValues }: { defaultValues?: Omit<T, "id"> },
  ) => JSX.Element;
}

export function ListItem<T extends { id: string }>(
  { item, getItemData, isItemData, EditModal }: ListItemProps<T>,
) {
  const ref = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLDivElement | null>(null);
  const [draggableState, setDraggableState] = useState<DraggableState>(
    idleState,
  );

  useEffect(() => {
    const element = ref.current;
    const dragHandle = dragHandleRef.current;
    invariant(element);
    invariant(dragHandle);

    return combine(
      draggable({
        element,
        dragHandle,
        getInitialData() {
          return getItemData(item);
        },
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: "16px",
              y: "8px",
            }),
            render({ container }) {
              setDraggableState({ type: "preview", container });
            },
          });
        },
        onDragStart() {
          setDraggableState({ type: "is-dragging" });
        },
        onDrop() {
          setDraggableState(idleState);
        },
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          if (source.element === element) {
            return false;
          }

          return isItemData(source.data);
        },
        getData({ input }) {
          const data = getItemData(item);
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          });
        },
        getIsSticky() {
          return true;
        },
        onDragEnter({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          setDraggableState({ type: "is-dragging-over", closestEdge });
        },
        onDrag({ self }) {
          const closestEdge = extractClosestEdge(self.data);

          setDraggableState((current) => {
            if (
              current.type === "is-dragging-over" &&
              current.closestEdge === closestEdge
            ) {
              return current;
            }
            return { type: "is-dragging-over", closestEdge };
          });
        },
        onDragLeave() {
          setDraggableState(idleState);
        },
        onDrop() {
          setDraggableState(idleState);
        },
      }),
    );
  }, [item]);

  const { id, ...defaultValues } = item;

  return (
    <>
      <div className="relative">
        <Card
          data-item-id={item.id}
          ref={ref}
          className={`${stateStyles[draggableState.type] ?? ""}`}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div ref={dragHandleRef} className="mr-2 hover:cursor-move ">
              <GripVertical />
            </div>
            <span className="flex-grow mr-2">{item.id}</span>
            <div className="flex space-x-2">
              {
                /* <TooltipWrapper tooltip="Edit">
                <Button size={"icon"} variant={"outline"}>
                  <Pencil className="size-4" />
                </Button>
              </TooltipWrapper> */
              }
              <EditModal defaultValues={defaultValues} />
              <TooltipWrapper tooltip="Delete">
                <Button size={"icon"} variant={"outline"}>
                  <Trash2 className="size-4" />
                </Button>
              </TooltipWrapper>
            </div>
          </CardContent>
        </Card>
        {draggableState.type === "is-dragging-over" &&
            draggableState.closestEdge
          ? <DropIndicator edge={draggableState.closestEdge} gap={"8px"} />
          : null}
      </div>
      {draggableState.type === "preview"
        ? createPortal(<DragPreview<T> item={item} />, draggableState.container)
        : null}
    </>
  );
}

function DragPreview<T extends { id: string }>({ item }: { item: T }) {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="mr-2 cursor-move">
          <GripVertical />
        </div>
        <span className="flex-grow mr-2">{item.id}</span>
        <div className="flex space-x-2">
          <TooltipWrapper tooltip="Edit">
            <Button size={"icon"} variant={"outline"}>
              <Pencil className="size-4" />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper tooltip="Delete">
            <Button size={"icon"} variant={"outline"}>
              <Trash2 className="size-4" />
            </Button>
          </TooltipWrapper>
        </div>
      </CardContent>
    </Card>
  );
}
