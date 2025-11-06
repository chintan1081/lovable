import { PiTreeStructureBold } from "react-icons/pi";
import Editor from "@monaco-editor/react";
import { FiChevronRight } from "react-icons/fi";

const FileStructure = () => {
    const code = `even programmatic edits
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      }}
    />
  )
}`
    return (
        <div className="flex-1 mr-4 my-4 rounded-xl border border-zinc-800 flex">
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
    )
}

export default FileStructure;
