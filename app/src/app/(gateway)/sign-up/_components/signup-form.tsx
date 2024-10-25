'use client'
import Link from 'next/link'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { IconBrandGoogleFilled } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { client } from '@/lib/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

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

export const signUp = async (values: z.infer<typeof formSchema>) => {
  const { data, error } = await client.signUp.email({
    email: values.email,
    password: values.password,
    name: values.name,
    image: values.image,
    callbackURL: 'http://localhost:3000/sign-in',
  })

  if (error) {
    console.log(error)
  }

  if (data) {
    console.log(data)
  }
}

const formSchema = z.object({
  image: z.string().url().optional(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, 'Minimum 8 characters')
    .max(32, 'Maximum 32 characters'),
})

export function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: '',
      name: '',
      email: '',
      password: '',
    },
  })

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Create a new account to get started using Vitaes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(signUp)} className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={form.watch('image') ? form.watch('image') : undefined}
                    alt="Profile picture"
                  />
                  <AvatarFallback>
                    {form.watch('name') ? form.watch('name')[0] : 'Avatar'}
                  </AvatarFallback>
                </Avatar>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/avatar.jpg"
                          required={false}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="johndoe@example.com"
                        autoComplete=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <div className="flex items-center">
                        Password
                        <Link
                          href="#"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your password must be between 8 and 32 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              onClick={signInWithGoogle}
              variant="outline"
              className="w-full"
            >
              <IconBrandGoogleFilled className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              onClick={signInWithGithub}
              variant="outline"
              className="w-full"
            >
              <GitHubLogoIcon className="mr-2 h-4 w-4" />
              Github
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/sign-in" className="underline">
              Login
            </Link>
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}
