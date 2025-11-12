import { Get } from "@/utils/axios";
import { useEffect } from "react"

const PreviewWebsite = ({ sandboxUrl, projectId, setSandboxUrl }: any) => {
  useEffect(() => {
    if(sandboxUrl) return;
    Get(`/api/v0/project/preview/${projectId}`)
    .then((response) => {
      if(response.data.success){
        setSandboxUrl(response.data.data.sandboxUrl)
      }
    })
  }, [sandboxUrl])

  return (
    <div className='flex-1 rounded-xl mr-4 my-4'>
       {sandboxUrl ? (
      <iframe className='rounded' width="100%" height="100%" src={`${sandboxUrl}`}></iframe>
       ) : (
          <div className="w-full h-full flex gap-2 justify-center items-center">
            <span className="w-4 h-4 border-2 rounded-full border-zinc-600 border-t-blue-600 animate-spin"></span>
            Preview loading
          </div>
       )
       }
    </div>
  )
}

export default PreviewWebsite
