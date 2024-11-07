'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { client } from '@/lib/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { IconBrandGoogleFilled } from '@tabler/icons-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const signInWithGithub = async () => {
  await client.signIn.social({
    provider: 'github',
  })
}

export const signInWithGoogle = async () => {
  await client.signIn.social({
    provider: 'google',
  })
}

export const signInWithEmail = async () => {
  await client.signIn.email({
    email: 'diegopeter9@gmail.com',
    password: 'password',
  })
}

const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Must be a valid email address' }),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof emailSchema>) {
    console.log(values)
  }

  return (
    <div className="w-[22rem]">
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src="/vitaes.svg"
          alt="Vitaes"
          className="bg-gradient-to-tr border border-secondary from-background via-muted/90 to-background rounded-lg mr-2"
          width={48}
          height={48}
        />
        <h3 className="m-0 font-semibold text-lg text-wrap text-muted-foreground">
          Welcome back
        </h3>
        <Button
          onClick={signInWithGoogle}
          variant="secondary"
          className="w-full"
        >
          <IconBrandGoogleFilled className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
        <Button
          onClick={signInWithGithub}
          variant="secondary"
          className="w-full"
        >
          <GitHubLogoIcon className="mr-2 h-4 w-4" />
          Continue with Github
        </Button>
      </div>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col align-center justify-start gap-4"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign In</Button>
        </form>
      </Form>
    </div>
  )
}
