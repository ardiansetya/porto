import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

export function ImageUpload({ projectId }: { projectId: string }) {
  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (files) => {
      const f = files[0]
      console.log(files)
      setPreview(URL.createObjectURL(f))
      setFile(f)
    },
  })

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      const uploadedFile = res[0]
      if (!uploadedFile.ufsUrl) return

      setFile(null)
      setPreview(uploadedFile.ufsUrl)
      setProgress(0)
    },
    onUploadProgress: setProgress,
  })

  return (
    <div className="space-y-3">
      {/* Preview */}
      {file?.type.startsWith('image/') && (
        <Card className="relative overflow-hidden">
          <img
            src={preview ?? ''}
            alt="Preview"
            className="h-48 w-full object-cover"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-2 top-2"
            onClick={() => {
              setPreview(null)
              setFile(null)
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </Card>
      )}

      {/* Upload Dropzone */}
      {!preview && (
        <>
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
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        </>
      )}

      {file && (
        <Button
          className="w-full"
          onClick={() => {
            startUpload([file], {projectId})
          }}
          disabled={isUploading}
        >
          Upload
        </Button>
      )}

      {/* Progress Bar */}
      {progress > 0 && (
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
