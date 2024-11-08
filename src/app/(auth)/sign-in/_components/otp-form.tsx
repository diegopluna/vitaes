'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { client } from '@/lib/client'
import { useAuthState } from '@/providers/auth-state-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const otpSchema = z.object({
  otp: z.string().min(1, 'Login code is required'),
})

const signInWithOtp = async (otp: string) => {
  await client.magicLink.verify({
    query: {
      token: otp,
    },
    fetchOptions: {
      onError: async (context) => {
        const { response } = context
        if (response.status === 429) {
          toast.error('Rate limit exceeded. Try again in a few minutes')
          throw new Error('Rate limit exceeded')
        } else {
          toast.error('Invalid login code')
          throw new Error('Invalid login code')
        }
      },
    },
  })
}

export const OtpForm = () => {
  const [loading, setLoading] = useState(false)
  const { email, setEmail, setStep } = useAuthState()

  const router = useRouter()

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  })

  function returnToLogin() {
    setEmail('')
    setStep('email')
  }

  async function onSubmit(values: z.infer<typeof otpSchema>) {
    setLoading(true)
    await signInWithOtp(values.otp)
      .then(() => {
        setLoading(false)
        router.push('/dashboard')
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div className="w-[22rem]">
      <div className="flex flex-col items-start justify-start gap-2">
        <h3 className="m-0 font-semibold text-xl text-wrap text-muted-foreground">
          Welcome back
        </h3>
        <p className="text-muted-foreground">
          We sent a temporary login code to {email}.{` `}
          <Button
            className="text-muted-foreground p-0 "
            type="button"
            size={'sm'}
            variant={'link'}
            onClick={returnToLogin}
          >
            Not you?
          </Button>
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col align-center justify-center gap-4"
        >
          <FormField
            name="otp"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login code</FormLabel>
                <FormControl className="w-full justify-center">
                  <Input placeholder="Enter login code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              'Continue'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
