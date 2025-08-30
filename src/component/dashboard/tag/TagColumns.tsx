import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Delete } from "lucide-react";

import { Button } from "@/components/ui/button";


export interface Tag {
  id: number;
  name: string;
  slug:string;
  created_at: string;
  updated_at: string;
}

export const tagColumns: ColumnDef<Tag>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="text-right">
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        عنوان تگ
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
        </div>
    ),
  },
   {
    accessorKey:"slug",
    header:"اسلاگ",
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
      const tag = row.original;

      return (

        <div className="flex gap-1">
          <Button variant='outline' onClick={() => table.options.meta?.onEdit?.(tag)}>
            <Edit className="mr-2 h-4 w-4" />
            ویرایش
          </Button>
          <Button
            variant='outline'
            onClick={() => table.options.meta?.onDelete?.(tag.id)}
          >
            <Delete className="mr-2 h-4 w-4 text-primary" />
            حذف
          </Button></div>
      );
    },
  }
];
