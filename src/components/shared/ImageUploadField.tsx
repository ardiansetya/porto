import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageUploadFieldProps {
  value: string
  onChange: (url: string) => void
  projectId?: string
}

export function ImageUploadField({
  value,
  onChange,
  projectId,
}: ImageUploadFieldProps) {
  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(value || null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (files) => {
      const f = files[0]
      if (f) {
        setPreview(URL.createObjectURL(f))
        setFile(f)
      }
    },
  })

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      const uploadedFile = res[0]
      if (uploadedFile?.ufsUrl) {
        onChange(uploadedFile.ufsUrl)
        setFile(null)
        setPreview(uploadedFile.ufsUrl)
        setProgress(0)
      }
    },
    onUploadProgress: setProgress,
    onUploadError: (error) => {
      console.error('Upload error:', error)
      setProgress(0)
    },
  })

  const handleUpload = async () => {
    if (!file) return
    
    // If projectId is provided, use it. Otherwise use a temporary ID
    const uploadProjectId = projectId || 'temp-' + Date.now()
    
    await startUpload([file], { projectId: uploadProjectId })
  }

  return (
    <div className="space-y-3">
      {/* Preview */}
      {preview && (
        <Card className="relative overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="h-48 w-full object-cover"
          />
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="absolute right-2 top-2"
            onClick={() => {
              setPreview(null)
              setFile(null)
              onChange('')
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </Card>
      )}

      {/* Upload Dropzone */}
      {!preview && (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition',
            {
              'bg-muted/50 hover:bg-muted/25': !isDragActive,
              'bg-primary/10 hover:bg-primary/20': isDragActive,
            },
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-sm text-muted-foreground">
              Drop the image here...
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Drag & drop an image here, or click to select
            </p>
          )}
        </div>
      )}

      {/* Upload Button */}
      {file && !value && (
        <Button
          type="button"
          className="w-full"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </Button>
      )}

      {/* Progress Bar */}
      {progress > 0 && progress < 100 && (
        <div className="space-y-1">
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground">
            Uploading… {progress}%
          </p>
        </div>
      )}
    </div>
  )
}
