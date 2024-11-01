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
import { Label } from '@/components/ui/label'
import { client } from '@/lib/client'

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

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button onClick={signInWithEmail} type="submit" className="w-full">
            Login
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
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
