/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { tagColumns } from '@/component/dashboard/tag/TagColumns'
import { DataTable } from '@/component/data-table/data-table'
import React, { useState } from 'react'
import { useDeleteTagApi, useGetTagsApi } from "@/services/admin";
import { Card, CardTitle } from '@/components/ui/card';
import { SkeletonTable } from '@/component/common/SkeletonTable';
import { DesktopDrawer } from '@/component/common/DesktopDrawer';
import { ConfirmDialog } from '@/component/common/ConfirmDialog';
import  TagForm from "@/component/dashboard/tag/TagForm"
export default function CategoryManagementPage() {
  const [deletedId, setDeletedId] = useState<any>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState<any>(null);
    const {mutate : deleteTag,isPending} = useDeleteTagApi(deletedId);
    const {data: tagData,isLoading,refetch} = useGetTagsApi();
    const setEditClose: any = () => {
      setEditOpen(false)
    }
    const handleDelete = () => {
      deleteTag({}, {
        onSuccess: () => {
          refetch();
          setDeleteOpen(false)
        },
      })
    }
  if(isLoading) return <SkeletonTable />;
  return (
    <div className='text-right'>
        <Card className='p-4 shadow-none border-none'>
         <CardTitle>مدیریت تگ ها</CardTitle>
        <DataTable
          columns={tagColumns}
          data={tagData?.data?.data ?? []}
                   meta={{
            onEdit: (tag: any) => {
              setSelectedTag(tag);
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
                  <TagForm refetch={refetch} openStatus={setEditOpen} initialData={selectedTag} />
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
