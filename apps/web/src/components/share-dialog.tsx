import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Check } from 'lucide-react'
import { m } from '@/paraglide/messages'
import { useState } from 'react'
import { toast } from 'sonner'

interface ShareDialogProps {
  open: boolean
  slug: string
  onOpenChange: (open: boolean) => void
}

export function ShareDialog({
  open,
  slug,
  onOpenChange,
}: Readonly<ShareDialogProps>) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `${globalThis.location.origin}/view/${slug}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success(m['shareDialog.copied']())
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        await navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        toast.success(m['shareDialog.copied']())
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      } catch {
        toast.error('Failed to copy link')
      }
      textArea.remove()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{m['shareDialog.title']()}</DialogTitle>
          <DialogDescription>
            {m['shareDialog.description']()}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex gap-2">
            <Input
              readOnly
              value={shareUrl}
              className="flex-1 font-mono text-sm"
              onClick={(e) => {
                e.currentTarget.select()
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
              className="shrink-0"
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {m['shareDialog.close']()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
