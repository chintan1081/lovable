import { FiEdit, FiSidebar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ miniSidebar, setMiniSidebar }: { miniSidebar: boolean, setMiniSidebar: Function }) => {
    const navigate = useNavigate();
    return (
        <div className="border border-r-zinc-800">
            {
                !miniSidebar ?
                    <div>
                        <div className='flex justify-between items-center p-4'>
                            <div className='bg-gradient-to-r from-violet-800 to-blue-600 py-1 px-2 rounded'>
                                ml
                            </div>
                            <div
                                onClick={() => setMiniSidebar(!miniSidebar)}
                                className='text-white text-xl p-2 cursor-pointer bg-transparent hover:bg-zinc-700/50 hover:ring-1 ring-zinc-700 rounded-md'>
                                <FiSidebar />
                            </div>
                        </div>
                        <div onClick={() => navigate("/")} 
                             className='flex mt-4 text-sm font-semibold gap-2 hover:bg-zinc-700/50 p-3 items-center m-2 cursor-pointer rounded'>
                            <div className='text-lg'><FiEdit /></div>
                            New project
                        </div>
                        <div className='px-4 text-xs text-zinc-300'>
                            Chats
                        </div>
                        <div className=" ">
                            <div className='hover:bg-zinc-700/50 p-3 text-sm font-semibold items-center m-1 mx-2 cursor-pointer rounded
                        '>
                                dsfsdfds
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className='flex justify-center flex-col gap-4 items-center p-4'>
                            <div className='bg-gradient-to-r from-violet-800 to-blue-600 py-1 px-2 rounded'>
                                ml
                            </div>
                            <div
                                onClick={() => setMiniSidebar(!miniSidebar)}
                                className='cursor-pointer hover:bg-zinc-700/50 p-2 hover:ring-1 rounded ring-gray-600'>
                                <FiSidebar />
                            </div>
                            <div className='cursor-pointer hover:bg-zinc-700/50 p-2 hover:ring-1 rounded ring-gray-600'>
                                <FiEdit />
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Sidebar
