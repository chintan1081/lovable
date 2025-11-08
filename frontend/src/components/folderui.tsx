import { useState } from "react";
import { FiFile, FiFolder, FiChevronDown, FiChevronRight } from "react-icons/fi";

const FolderUI = ({ fileStructure, setFilePath, HandleCodeFile }: any) => {
    const buildTree = (files: any) => {
        if (!Array.isArray(files)) {
            console.warn("⚠️ buildTree expected an array but got:", files);
            return {};
        }

        const tree = {};
        files.forEach(({ Key }: any) => {
            const parts = Key.split("/").splice(1);
            parts.reduce((acc: any, part: any, idx: number) => {
                if (!acc[part]) {
                    acc[part] = {
                        type: idx === parts.length - 1 ? "file" : "folder",
                        path: idx === parts.length - 1 && Key,
                        children: {},
                    };
                }
                return acc[part].children;
            }, tree);
        });
        return tree;
    };

    console.log(fileStructure, '.......................fileStructure');

    const fileTree = buildTree(fileStructure);

    return (
        <div className="font-mono text-sm">
            <RecursiveFolder tree={fileTree} setFilePath={setFilePath} HandleCodeFile={HandleCodeFile} />
        </div>
    );
};

export default FolderUI;

const RecursiveFolder = ({ tree, setFilePath, HandleCodeFile }: any) => {
    const entries = Object.entries(tree);

    const sortedEntries = entries.sort((a: any, b: any) => {
        const aType = a[1].type;
        const bType = b[1].type;
        if (aType === bType) return 0;
        return aType === "folder" ? -1 : 1;
    });
    return (
        <ul className="pl-4">
            {sortedEntries.map(([name, node]) => (
                <FolderNode key={name} name={name} node={node} setFilePath={setFilePath} HandleCodeFile={HandleCodeFile} />
            ))}
        </ul>
    );
};

const FolderNode = ({ name, node, setFilePath, HandleCodeFile }: any) => {
    const [open, setOpen] = useState(false); // whether folder is open or closed

    if (node.type === "folder") {
        return (
            <li className="py-1">
                {/* Folder header */}
                <div
                    className="flex items-center gap-2 cursor-pointer text-white hover:bg-zinc-800/90 p-1.5 rounded"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <FiChevronDown /> : <FiChevronRight />}
                    <FiFolder />
                    <span>{name}</span>
                </div>

                {open && <RecursiveFolder tree={node.children} setFilePath={setFilePath} HandleCodeFile={HandleCodeFile} />}
            </li>
        );
    }

    return (
        <li onClick={() => {
            setFilePath(node.path);
            HandleCodeFile(node.path);
        }}
            className="py-1 flex items-center gap-2 text-white pl-6 hover:bg-zinc-800/90 p-1.5 rounded cursor-pointer">
            <FiFile />
            {name}
        </li>
    );
};
