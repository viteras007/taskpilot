// columns.tsx
import { Status } from "@/app/model/taskStatus.model";
import { deleteTask } from "@/app/service/task.service";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";

export type Task = {
  id: string;
  description: string;
  status: Status;
  created_at: Date;
  updated_at: Date | null;
};

interface ColumnsProps {
  handleDelete: (taskId: string) => Promise<void>;
  handleUpdateStatus: (taskId: string, status: Status) => Promise<void>;
}

export const columns = ({
  handleDelete,
  handleUpdateStatus,
}: ColumnsProps): ColumnDef<Task>[] => [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const task = row.original;

      const handleChangeStatus = (newStatus: Status) => {
        handleUpdateStatus(task.id, newStatus);
      };
      return (
        <Select defaultValue={task.status} onValueChange={handleChangeStatus}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Status.OPEN}>Open</SelectItem>
            <SelectItem value={Status.CLOSE}>Close</SelectItem>
            <SelectItem value={Status.DONE}>Done</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return format(date, "yyyy-MM-dd");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;

      const onClickDelete = () => {
        handleDelete(task.id);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(task.id)}
            >
              Copy task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Pencil className="h-4 w-4 mr-4" />
              <Link href={`/task/edit/${task.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={onClickDelete}
            >
              <Trash className="h-4 w-4 mr-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
