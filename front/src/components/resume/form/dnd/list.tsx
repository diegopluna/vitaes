import { useEffect } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";

import { ListItem } from "./item";
import { ItemData } from "./drag";
import { flushSync } from "react-dom";

interface DragListProps<T extends { id: string }> {
  items: T[];
  setItems: (items: T[]) => void;
  getItemData: (item: T) => ItemData<T extends { id: string } ? T : never>;
  isItemData: (data: Record<string | symbol, unknown>) => data is ItemData<T>;
  EditModal: (
    { defaultValues }: { defaultValues?: Omit<T, "id"> },
  ) => JSX.Element;
}

export function DragList<T extends { id: string }>(
  { items, getItemData, isItemData, setItems, EditModal }: DragListProps<T>,
) {
  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return isItemData(source.data);
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;

        if (!isItemData(sourceData) || !isItemData(targetData)) {
          return;
        }

        const indexOfSource = items.findIndex((item) =>
          item.id === sourceData.itemId
        );
        const indexOfTarget = items.findIndex((item) =>
          item.id === targetData.itemId
        );

        if (indexOfTarget < 0 || indexOfSource < 0) {
          return;
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        flushSync(() => {
          setItems(
            reorderWithEdge({
              list: items,
              startIndex: indexOfSource,
              indexOfTarget,
              closestEdgeOfTarget,
              axis: "vertical",
            }),
          );
        });
      },
    });
  });

  return (
    <>
      {items.map((item) => (
        <ListItem<T>
          item={item}
          key={item.id}
          getItemData={getItemData}
          isItemData={isItemData}
          EditModal={EditModal}
        />
      ))}
    </>
  );
}
