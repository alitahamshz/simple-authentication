import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Delete } from "lucide-react";

import { Button } from "@/components/ui/button";


export interface Category {
  id: number;
  parent_id: number | null;
  name: string;
  created_at: string;
  updated_at: string;
}

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          نام دسته
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "parent_id",
    header: "آیدی والد",
    cell: ({ row }) => {
      const parentId = row.getValue("parent_id");
      return <div>{parentId !== null && parentId !== undefined ? String(parentId) : "-"}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "تاریخ ایجاد",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return <div>{date.toLocaleDateString("fa-IR")}</div>;
    },
  },
  {

    id: "actions",
    cell: ({ row, table }) => {
      const category = row.original;

      return (

        <div className="flex gap-1">
          <Button variant='outline' onClick={() => table.options.meta?.onEdit?.(category)}>
            <Edit className="mr-2 h-4 w-4" />
            ویرایش
          </Button>
          <Button
            variant='outline'
            onClick={() => table.options.meta?.onDelete?.(category.id)}
          >
            <Delete className="mr-2 h-4 w-4 text-primary" />
            حذف
          </Button></div>
      );
    },
  }
];
