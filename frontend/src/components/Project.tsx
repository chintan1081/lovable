import { useParams } from "react-router-dom"
import { FiCode, FiEye } from "react-icons/fi";
import ProjectSidebar from "./ProjectSidebar";
import FileStructure from "./FileStructure";
import { useWebSocket } from "./custom_hooks/useWebSocket";
import PreviewWebsite from "./PreviewWebsite";
import { useEffect, useState } from "react";
import axios from "axios";

const Project = () => {
  const { id: projectId } = useParams();
  if (!projectId) return;

  const { stream, sandboxUrl, setSandboxUrl } = useWebSocket(projectId);
  const [isPreview, setIsPreview] = useState(false);
  useEffect(() => {
    if(!sandboxUrl) return;
    setIsPreview(true);
    setInterval(async() => {
        await axios.get(sandboxUrl);
    }, 1000 * 60 * 4.5)
  },[sandboxUrl])

  return (
    <div className="grid grid-cols-[450px_1fr] w-full h-screen">
      <ProjectSidebar stream={stream} projectId={projectId} />
      <div className="flex flex-col w-full">
        <div className="flex">
          <div className="flex mt-2 p-1 px-2 items-center border rounded-2xl">
            <span onClick={() => setIsPreview(false)}
              className={`p-1 px-2 cursor-pointer rounded ${!isPreview ? 'bg-blue-600/30 text-blue-600 ' : 'hover:text-white text-zinc-500'}`}>
              <FiCode />
            </span>
            <span onClick={() => setIsPreview(true)}
              className={`p-1 px-2 cursor-pointer rounded  ${isPreview ? 'bg-blue-600/30 text-blue-600 ' : 'hover:text-white text-zinc-500'}`}>
              <FiEye />
            </span>
          </div>
        </div>
        {
          !isPreview ?
            <FileStructure projectId={projectId} />
            :
            <PreviewWebsite projectId={projectId} sandboxUrl={sandboxUrl} setSandboxUrl={setSandboxUrl} />
        }
      </div>
    </div>
  )
}

export default Project
