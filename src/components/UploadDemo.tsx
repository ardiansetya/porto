import { UploadButton } from '@/lib/uploadthing'

export function UploadDemo() {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Upload Demo</h2>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log('Files: ', res)
          alert('Upload Completed')
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`)
        }}
        input={{ projectId: 'test-project-id' }}
      />
    </div>
  )
}
