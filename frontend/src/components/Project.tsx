import { Link, useLocation } from "react-router-dom"
import { LuLightbulb } from "react-icons/lu";
import { FiArrowUp, FiChevronRight, FiCode, FiEye } from "react-icons/fi";
import { PiTreeStructureBold } from "react-icons/pi";
import Editor from "@monaco-editor/react";


const Project = () => {
  const location = useLocation();
  const prompt = location.state.prompt;
  
  const code = `even programmatic edits
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      }}
    />
  )
}`
  return (
    <div className="grid grid-cols-[450px_1fr] w-full h-screen">
      <div className="py-2 px-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center">
            <Link to="/" className="p-1 cursor-pointer hover:bg-zinc-700/50 rounded">
              Projects
            </Link>
            <p className="p-2 text-xl text-zinc-600 font-semibold">/</p>
            <p className="p-1 cursor-pointer hover:bg-zinc-700/50 rounded">project-2</p>
          </div>
          <div className="mt-4 p-2 gap-2
                          w-full flex flex-col
                          h-[calc(100rem-66rem)]
                          overflow-y-auto
                          [scrollbar-color:#3f3f46_#18181b]
                          [scrollbar-width:thin]
                          [&::-webkit-scrollbar]:w-2
                          [&::-webkit-scrollbar-track]:bg-zinc-900
                          [&::-webkit-scrollbar-thumb]:bg-zinc-700
                          [&::-webkit-scrollbar-thumb:hover]:bg-zinc-600
                ">
            <p className="w-72 self-end p-2 mb-3 break-words rounded-2xl bg-zinc-700/50">dfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdf</p>
            <div className="p-2">
              <p className="text-sm mb-3 text-zinc-400 flex gap-2 items-center"><LuLightbulb /> Thoughts</p>
              <p className="break-words">dfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdfdfsdfsdf</p>
            </div>
          </div>
        </div>
        <div className="mb-4 w-full flex flex-col items-end rounded-xl border-2 border-gray-600">
          <textarea className="flex-1 w-full m-2 min-h-24 rounded-xl px-6 outline-0
                               overflow-y-auto
                               [scrollbar-color:#3f3f46_#18181b]
                               [scrollbar-width:thin]
                               [&::-webkit-scrollbar]:w-2
                             [&::-webkit-scrollbar-track]:bg-zinc-900
                             [&::-webkit-scrollbar-thumb]:bg-zinc-700
                             [&::-webkit-scrollbar-thumb:hover]:bg-zinc-600"
            placeholder="Let's build" >
          </textarea>
          <button className="flex-none cursor-pointer  rounded-full bg-white hover:bg-white/90 p-2 m-2 mx-4 text-black">
            <FiArrowUp />
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex">
          <div className="flex mt-2 p-1 px-2 items-center border rounded-2xl">
            <span className="p-1 px-2 cursor-pointer bg-blue-600/30 text-blue-600  hover:text-white rounded"><FiEye /></span>
            <span className="p-1 px-2 cursor-pointer text-zinc-500 hover:text-white rounded"><FiCode /></span>
          </div>
        </div>
        <div className="flex-1 mr-4 my-4 rounded-xl border border-zinc-800
                            flex">
          <aside
            className="bg-zinc-800/30 p-2 resize-x overflow-auto border-r border-zinc-800
                                   min-w-[250px] max-w-[400px]">
            <div className="text-lg font-semibold mb-4 flex items-center gap-2 p-1 px-4">
              <PiTreeStructureBold />
              Files
            </div>
            <div className="flex flex-col">
              <div className="flex items-end cursor-pointer hover:bg-zinc-800/90 gap-1 p-1.5 rounded">
                <p className="text-lg"><FiChevronRight /></p>
                public
              </div>
              <div className="flex items-end cursor-pointer hover:bg-zinc-800/90 gap-1 p-1.5 rounded">
                <p className="text-lg"><FiChevronRight /></p>
                public
              </div>
            </div>
          </aside>

          <main className="flex-1 flex flex-col h-full">
            <div className="text-sm flex gap-1 items-center text-zinc-400 font-semibold p-2 bg-zinc-900/90 border-b border-zinc-800">
              <p className="rounded hover:text-white cursor-pointer">src</p>
              <p className="text-lg"><FiChevronRight /></p>
              <p className="rounded hover:text-white cursor-pointer">index.ts</p>
            </div>
            <div className="flex-1">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                defaultValue={code}
                theme="vs-dark"
                options={{
                  readOnly: true,
                }}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Project
