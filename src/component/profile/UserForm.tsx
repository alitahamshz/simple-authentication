'use client'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import CustomButton from '../common/CustomButton'

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'نام معتبر نیست' }),
  lastName: z.string().min(2, { message: 'نام خانوادگی معتبر نیست' }),
  mobile: z
    .string()
    .regex(/^09\d{9}$/, { message: 'شماره موبایل باید با 09 شروع شده و 11 رقم باشد' }),
  accountNumber: z
    .string()
    .regex(/^\d{13,16}$/, { message: 'شماره حساب باید بین 13 تا 16 رقم باشد' }),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, { message: 'شماره کارت باید 16 رقم باشد' }),
})

type FormData = z.infer<typeof formSchema>

export default function UserForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      mobile: '',
      accountNumber: '',
      cardNumber: '',
    },
  })

  const onSubmit = (data: FormData) => {
    console.log('اطلاعات فرم:', data)
  }

  return (
    <Card className="mt-10  py-14 px-2 shadow-none border-none">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input placeholder="مثلاً علی" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input placeholder="مثلاً رضایی" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره موبایل</FormLabel>
                  <FormControl>
                    <Input placeholder="09123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره حساب</FormLabel>
                  <FormControl>
                    <Input placeholder="مثلاً 6037991234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره کارت</FormLabel>
                  <FormControl>
                    <Input placeholder="مثلاً 6274123456789012" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           <CustomButton
             isLoading={form.formState.isSubmitting}
             defaultText="ثبت اطلاعات"
             loadingText="در حال ثبت..."
             type="submit"
           />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
