/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { X, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ImageUploaderProps = {
  label?: string;
  maxSize?: number; // مگابایت
  onChange: (file: File | null) => void;
  defaultImage?: string;
  aspect?: number; // نسبت تصویر (مثلاً 1 برای مربع، 16/9 برای کاور)
};

// ✅ تابع کراپ
async function getCroppedImg(imageSrc: string, crop: any) {
  const createImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
      img.src = url;
    });

  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise<File | null>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(new File([blob], "cropped.jpg", { type: "image/jpeg" }));
      } else {
        resolve(null);
      }
    }, "image/jpeg");
  });
}

export default function ImageUploader({
  label = "آپلود تصویر",
  maxSize = 2,
  onChange,
  defaultImage,
  aspect = 1,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);

  // کراپ
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  // انتخاب فایل
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > maxSize * 1024 * 1024) {
      alert(`حجم فایل نباید بیشتر از ${maxSize}MB باشد`);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setOriginalFile(selectedFile);
    setTempImage(url);
    setCropDialogOpen(true);
  };

  // تایید کراپ
  const handleCropConfirm = async () => {
    if (!tempImage || !croppedAreaPixels) return;

    const croppedFile = await getCroppedImg(tempImage, croppedAreaPixels);
    if (croppedFile) {
      const croppedUrl = URL.createObjectURL(croppedFile);
      setPreview(croppedUrl);
      onChange(croppedFile);
    }

    setCropDialogOpen(false);
    setTempImage(null);
  };

  // استفاده از تصویر کامل بدون کراپ
  const handleUseFullImage = () => {
    if (originalFile) {
      const fullUrl = URL.createObjectURL(originalFile);
      setPreview(fullUrl);
      onChange(originalFile);
    }
    setCropDialogOpen(false);
    setTempImage(null);
  };

  const handleRemove = () => {
    setPreview(null);
    setOriginalFile(null);
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      {preview ? (
        <div className="relative w-36 h-36 rounded-xl border border-dashed flex items-center justify-center overflow-hidden">
          <img
            src={preview}
            alt="preview"
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              size="icon"
              variant="destructive"
              type="button"
              onClick={handleRemove}
              className="rounded-full h-8 w-8 hover:bg-gray-600 bg-gray-800"
            >
              <X className="w-4 h-4" />
            </Button>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                size="icon"
                variant="secondary"
                type="button"
                className="rounded-full h-8 w-8"
              >
                <Upload className="w-4 h-4" />
              </Button>
            </label>
          </div>
        </div>
      ) : (
        <label className="w-36 h-36 flex flex-col items-center justify-center border border-dashed rounded-xl cursor-pointer hover:bg-muted/20">
          <Upload className="w-6 h-6 mb-2 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">انتخاب تصویر</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}

      {/* دیالوگ کراپ */}
      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>کراپ تصویر</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-80 bg-black">
            {tempImage && (
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>
          <div className="flex justify-between gap-2 mt-4">
            <Button variant="secondary" onClick={handleUseFullImage}>
              استفاده از تصویر کامل
            </Button>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setCropDialogOpen(false)}>
                لغو
              </Button>
              <Button onClick={handleCropConfirm}>
                تایید کراپ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
