/* eslint-disable @typescript-eslint/no-unused-vars */

import CategoryForm from "@/component/dashboard/category/CategoryForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Category(){

  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle>
           {/* {initialData ? "ویرایش دسته‌بندی" : "ایجاد دسته‌بندی"} */}
        </CardTitle>
      </CardHeader>
      <CardContent>
      <CategoryForm/>
      </CardContent>
    </Card>
  );
}
