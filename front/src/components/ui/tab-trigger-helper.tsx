import { TabsTrigger } from "./tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { TooltipWrapper } from "./tooltip-wrapper";

interface TabTriggerHelperProps {
  icon: React.ReactNode;
  id: string;
  tooltip: string;
}

const TabsTriggerHelper = ({
  icon,
  id,
  tooltip,
}: TabTriggerHelperProps) => {
  return (
    <TabsTrigger value={id}>
      <TooltipWrapper tooltip={tooltip}>
        {icon}
      </TooltipWrapper>
    </TabsTrigger>
  );
};

export { TabsTriggerHelper };
