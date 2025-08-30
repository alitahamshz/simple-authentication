"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TagForm from "@/component/dashboard/tag/TagForm";
// --- Component ------------------------------------------------------------
export default function Category() {
    return (
        <Card className="w-full mx-auto">
            <div className="max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-xl">ایجاد/ویرایش تگ</CardTitle>
                </CardHeader>
                <CardContent>
                    <TagForm />
                </CardContent>
            </div>

        </Card>
    );
}
