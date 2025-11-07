import { useLocation, useNavigate, useParams } from "react-router-dom"
import { FiCode, FiEye } from "react-icons/fi";
import ProjectSidebar from "./ProjectSidebar";
import FileStructure from "./FileStructure";
import { useWebSocket } from "./custom_hooks/useWebSocket";



const Project = () => {
  const { id: projectId } = useParams();

  if(!projectId) return;
  const { stream } = useWebSocket(projectId);

  return (
    <div className="grid grid-cols-[450px_1fr] w-full h-screen">
      <ProjectSidebar stream={stream} projectId={projectId} />
      <div className="flex flex-col w-full">
        <div className="flex">
          <div className="flex mt-2 p-1 px-2 items-center border rounded-2xl">
            <span className="p-1 px-2 cursor-pointer bg-blue-600/30 text-blue-600  hover:text-white rounded"><FiEye /></span>
            <span className="p-1 px-2 cursor-pointer text-zinc-500 hover:text-white rounded"><FiCode /></span>
          </div>
        </div>
        <FileStructure />
      </div>
    </div>
  )
}

export default Project
