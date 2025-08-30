"use client"

import { useEffect, useRef, useState } from "react"
import {
    MapContainer,
    TileLayer,
    useMapEvents,
    useMap,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
import { CustomButton } from "@/component/common/CustomButton"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useCreateAddressApi, useUpdateAddressApi } from "@/services/user"
const addressSchema = z.object({
    detail: z.string().min(3, "توضیح آدرس خیلی کوتاهه"),
})
type addressType = { id: number, address: string, lat: number, long: number, detail: string }

type AddressFormValues = z.infer<typeof addressSchema>

// const markerIcon = new L.Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// })

function FixedCenterMarker() {
    //   const map = useMap()
    //   const center = map.getCenter()

    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -100%)",
                zIndex: 999,
                pointerEvents: "none",
            }}
        >
            <Image
                src="/img/icons/marker.svg"
                alt="marker"
                style={{ width: 30, height: 41 }}
                width={30}
                height={41}
            />
        </div>
    )
}

export default function AddressForm({ refetch, setOpen, editData }: { refetch?: () => void, setOpen?: (open: boolean) => void, editData?: addressType | null }) {
    console.log({ editData })
    const form = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: { detail: editData?.detail },
    })
    const { mutate: createAddress,isPending: createPending } = useCreateAddressApi();
    const { mutate: updateAddress, isPending: updatePending } = useUpdateAddressApi(editData?.id);
    const [mapReady, setMapReady] = useState(false)
    const [center, setCenter] = useState<[number, number] | null>()
    const [address, setAddress] = useState("")
    const mapRef = useRef<L.Map | null>(null)

    // دریافت موقعیت کاربر
    useEffect(() => {
        if (editData) {
            setCenter([editData?.lat, editData?.long])
            setMapReady(true)
        } else {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const latlng: [number, number] = [pos.coords.latitude, pos.coords.longitude]
                    setCenter(latlng)
                    setMapReady(true)
                },
                (err) => {
                    console.error("موقعیت قابل دریافت نیست", err)
                    setCenter([29.5918, 52.5836]) // fallback location
                    setMapReady(true)
                }
            )
        }
    }, [editData])


    // گرفتن آدرس وقتی کاربر نقشه رو جابه‌جا کرد و رها کرد
    function MapEventHandler() {
        const map = useMap()
        mapRef.current = map
        const timeoutRef = useRef<NodeJS.Timeout | null>(null)

         useMapEvents({
        move: () => {
            // در حین حرکت، تایمر قبلی رو پاک کن
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        },
        moveend: () => {
            // وقتی کاربر حرکت رو متوقف کرد، یک تایمر ۱.۵ ثانیه‌ای بذار
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = setTimeout(() => {
                const c = map.getCenter()
                const latlng: [number, number] = [c.lat, c.lng]
                setCenter(latlng) // این باعث میشه useEffect مربوط به آدرس اجرا شه
            }, 1500)
        },
    })

        return null
    }

    // reverse geocode آدرس
    useEffect(() => {
        if (!center) return
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${center[0]}&lon=${center[1]}&format=json&accept-language=fa`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.display_name) setAddress(data.display_name)
            })
    }, [center])

    const onSubmit = (data: AddressFormValues) => {
        console.log("📦 ارسال به سرور:", {
            coords: center,
            description: data.detail,
            resolvedAddress: address,
        })
        if (editData) {
            updateAddress({
                address: address,
                lat: center && center[0],
                long: center && center[1],
                detail: data.detail
            }, {
                onSuccess: () => {
                    if (refetch) refetch()
                    if (setOpen) setOpen(false)
                }
            })
        } else {

            createAddress({
                address: address,
                lat: center && center[0],
                long: center && center[1],
                detail: data.detail
            }, {
                onSuccess: () => {
                    if (refetch) refetch()
                    if (setOpen) setOpen(false)
                }
            })
        }
    }

    return (
        <div className="space-y-6 p-2 bg-white rounded-2xl">
            <Separator className="my-4" />
            <h2 className="text-lg font-bold">آدرس جدیدی ثبت کنید</h2>

            {mapReady && center && (
                <div className="relative h-[350px] rounded-xl overflow-hidden">
                    <MapContainer
                        center={center}
                        zoom={16}
                        scrollWheelZoom
                        style={{ height: "100%", width: "100%" }}
                        zoomControl={false}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MapEventHandler />
                    </MapContainer>
                    <FixedCenterMarker />
                </div>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <FormLabel className="text-sm">آدرس روی نقشه</FormLabel>
                        <Input value={address} readOnly />
                    </div>

                    <FormField
                        control={form.control}
                        name="detail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>توضیحات آدرس</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="مثلاً طبقه دوم، واحد ۴" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* <Button className="w-full h-11 text-lg rounded-2xl" type="submit">ثبت آدرس</Button> */}
                    <CustomButton
                        isLoading={editData ? updatePending : createPending  }
                        defaultText={editData ? "ویرایش آدرس" :"ثبت آدرس"}
                        loadingText="در حال ثبت آدرس..."
                        type="submit"
                    />
                </form>
            </Form>
        </div>
    )
}
