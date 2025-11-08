import { PiTreeStructureBold } from "react-icons/pi";
import Editor from "@monaco-editor/react";
import { FiChevronRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Get, Post } from "@/utils/axios";
import FolderUI from "./folderui";

type FileStructureProp = {
    projectId: string
}

const FileStructure = ({ projectId }: FileStructureProp) => {
    const [fileStructure, setFileStructure] = useState([]);
    const [filePath, setFilePath] = useState("");
    const [code, setCode] = useState(``);

    const filepathNav = filePath.split("/").splice(1);

    useEffect(() => {
        if (!projectId) return;
        Get(`/api/v0/project/filestructure/${projectId}`)
            .then((response) => {
                setFileStructure(response.data.data);
            })
    }, [])

    const HandleCodeFile = async (path: string) => {
        const response = await Post(`/api/v0/project/file`, {
            filePath: path
        });
        console.log(response);

        if (response.data.success) {
            console.log(typeof response.data.data);

            setCode(`${typeof response.data.data}`);
        }
    }

    return (
        <div className="flex-1 mr-4 my-4 rounded-xl border border-zinc-800 flex">
            <aside
                className="bg-zinc-800/30 p-2 resize-x overflow-auto border-r border-zinc-800
                                min-w-[250px] max-w-[400px]">
                <div className="text-lg font-semibold mb-4 flex items-center gap-2 p-1 px-4">
                    <PiTreeStructureBold />
                    Files
                </div>
                {fileStructure && Array.isArray(fileStructure) ? (
                    <FolderUI fileStructure={fileStructure} setFilePath={setFilePath} HandleCodeFile={HandleCodeFile} />
                ) : (
                    <p className="flex justify-center items-center gap-2">
                        <span className="w-4 h-4 border-3 border-zinc-100 border-t-blue-700 rounded-full animate-spin"></span>
                        Starting Live Preview
                    </p>
                )}
            </aside>

            <main className="flex-1 flex flex-col h-full">
                <div className="text-sm flex gap-1 items-center text-zinc-400 font-semibold p-2 bg-zinc-900/90 border-b border-zinc-800">
                    {!filePath && <p className="text-lg"><FiChevronRight /></p>}
                    {filepathNav && filepathNav.map((path, index) => {
                        return (
                            <>
                                <p key={index} className="rounded hover:text-white cursor-pointer">{path}</p>
                                {filepathNav.length - 1 !== index && <p key={index} className="text-lg"><FiChevronRight /></p>}
                            </>
                        )
                    })}
                </div>
                {code ? <div className="flex-1">
                    <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        defaultValue={code}
                        theme="vs-dark"
                        options={{
                            readOnly: true,
                        }}

                    />
                </div> :
                    (
                        <div className="flex justify-center gap-2 items-center h-full">
                            <p>Preview loading</p>
                            <span className="w-4 h-4 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin"></span>
                        </div>
                    )
                }
            </main>
        </div>
    )
}

export default FileStructure;
