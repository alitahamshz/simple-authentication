/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { categoryColumns } from '@/component/dashboard/category/CategoryColumns'
import { DataTable } from '@/component/data-table/data-table'
import React, { useState } from 'react'
import { useGetCategoryApi, useDeleteCategoryApi } from "@/services/admin";
import { Card } from '@/components/ui/card';
import { SkeletonTable } from '@/component/common/SkeletonTable';
import { DesktopDrawer } from '@/component/common/DesktopDrawer';
import CategoryForm from '@/component/dashboard/category/CategoryForm';
import { ConfirmDialog } from '@/component/common/ConfirmDialog';

export default function CategoryManagementPage() {
  const [deletedId, setDeletedId] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const { mutate: deleteCategory, isPending } = useDeleteCategoryApi(deletedId);
  const { data: categoryData, isLoading, refetch } = useGetCategoryApi();
  const setEditClose: any = () => {
    setEditOpen(false)
  }
  const handleDelete = () => {
    deleteCategory({}, {
      onSuccess: () => {
        refetch();
        setDeleteOpen(false)
      },
    })
  }
  if (isLoading) return <SkeletonTable />;
  return (
    <div className='text-right'>
      <Card className='p-2 text-right'>

        <DataTable
          columns={categoryColumns}
          data={categoryData?.data ?? []}
          meta={{
            onEdit: (category: any) => {
              setSelectedCategory(category);
              setEditOpen(true);
            },
            onDelete: (id: number) => {
              setDeleteOpen(true)
              setDeletedId(id)
            },
          }}
        />
      </Card>
      <DesktopDrawer
        title="ایجاد دسته‌بندی"
        description="فرم زیر را پر کنید"
        open={editOpen}
        onOpenChange={setEditClose}
      >
        <CategoryForm openStatus={setEditOpen} initialData={selectedCategory} />
      </DesktopDrawer>
      <ConfirmDialog
        open={deleteOpen}
        title="حذف آیتم"
        description="آیا از حذف این مورد اطمینان دارید؟"
        confirmText="حذف"
        cancelText="انصراف"
        loading={isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />

    </div>
  )
}
