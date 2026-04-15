import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { Info, Trash2, Pen } from "lucide-react";
type MenuProps = {
  messageId: string;
  handleDelete: () => void;
  handleEdit: () => void;
};
export default function Menu({
  messageId,
  handleDelete,
  handleEdit,
}: MenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Info className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => handleDelete()}
        >
          <Trash2 className="w-4 h-4" />
          Xóa
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEdit()}>
          <Pen className="w-4 h-4" />
          Chỉnh sửa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
