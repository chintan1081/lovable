import { FiEdit, FiSidebar } from "react-icons/fi";

const Sidebar = ({ miniSidebar, setMiniSidebar }: { miniSidebar: boolean, setMiniSidebar: Function }) => {
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
                        <div className='flex mt-4 text-sm font-semibold gap-2 hover:bg-zinc-700/50 p-3 items-center m-2 cursor-pointer rounded'>
                            <div className='text-lg'><FiEdit /></div>
                            New project
                        </div>
                        <div className='px-4 text-xs text-zinc-300'>
                            Chats
                        </div>
                        <div className="h-[calc(100rem-70rem)]
                                        overflow-y-auto
                                        [scrollbar-color:#3f3f46_#18181b]
                                        [scrollbar-width:thin]
                                        [&::-webkit-scrollbar]:w-2
                                      [&::-webkit-scrollbar-track]:bg-zinc-900
                                      [&::-webkit-scrollbar-thumb]:bg-zinc-700
                                      [&::-webkit-scrollbar-thumb:hover]:bg-zinc-600">
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
