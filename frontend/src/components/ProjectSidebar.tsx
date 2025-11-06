import { Get, Post } from '@/utils/axios';
import { useEffect, useRef, useState } from 'react'
import { FiArrowUp } from 'react-icons/fi';
import { LuLightbulb } from 'react-icons/lu';
import { useNavigate, Link } from 'react-router-dom';

type conversation = {
    messageFrom: String,
    contents: String
}

type ProjectSidebarProps = {
    prompt: String,
    projectId: String
}

const ProjectSidebar = ({ prompt, projectId }: ProjectSidebarProps) => {
    const navigate = useNavigate();
    const postedRef = useRef(false);

    const [conversations, setConversations] = useState<conversation[]>([]);
    const [ currentPrompt, setCurrentPrompt ] = useState("");

    useEffect(() => {
        if (!prompt || postedRef.current) return;

        postedRef.current = true;

        setConversations(prev => ([
            ...prev,
            { messageFrom: "USER", contents: prompt }
        ]));

        Post(`/api/v0/project/conversation/${projectId}`, { prompt })
            .then((response) => {
                console.log(response);
                navigate(location.pathname, { replace: true, state: {} });
            });
    }, [prompt]);

    useEffect(() => {
        Get(`/api/v0/project/conversation/${projectId}`)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.data);
                    setConversations(response.data.data);
                }
            })
    }, []);

    const HandleConversation = () => {
        setConversations(prev => ([
            ...prev,
            { messageFrom: "USER", contents: currentPrompt }
        ]));
        setCurrentPrompt("");
        Post(`/api/v0/project/conversation/${projectId}`, { prompt: currentPrompt })
            .then((response) => {
                console.log(response);
        });
    }
    return (
        <div className="py-2 px-4 flex flex-col justify-between">
            <div>
                <div className="flex items-center">
                    <Link to="/" className="p-1 cursor-pointer hover:bg-zinc-700/50 rounded">
                        Projects
                    </Link>
                    <p className="p-2 text-xl text-zinc-600 font-semibold">/</p>
                    <p className="p-1 w-48 cursor-pointer hover:bg-zinc-700/50 rounded truncate">{projectId}</p>
                </div>
                <div
                    className="
                      mt-4 p-2 gap-2
                      w-full flex flex-col
                      h-[calc(100rem-66rem)]
                      overflow-y-auto
                      [scrollbar-color:#3f3f46_#18181b]
                      [scrollbar-width:thin]
                      [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-zinc-900
                    [&::-webkit-scrollbar-thumb]:bg-zinc-700
                    [&::-webkit-scrollbar-thumb:hover]:bg-zinc-600
                      "
                >
                    {conversations.map((conversation, index) => (
                        <div key={index} className="my-2">
                            {conversation.messageFrom === "USER" && (
                                <p className="w-72 self-end p-4 mb-3 break-words rounded-2xl bg-zinc-700/50">
                                    {conversation.contents}
                                </p>
                            )}

                            {conversation.messageFrom === "ASSISTANT" && (
                                <div className="p-4 bg-zinc-800/40 rounded-2xl">
                                    <p className="text-sm mb-2 text-zinc-400 flex gap-2 items-center">
                                        <LuLightbulb />
                                        Thoughts
                                    </p>
                                    <p className="break-words whitespace-pre-line">
                                        {conversation.contents}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
            <div className="mb-4 w-full flex flex-col items-end rounded-xl border-2 border-gray-600">
                <textarea 
                    value={currentPrompt}
                    onChange={(event) => setCurrentPrompt(event.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter' && !e.shiftKey){
                            HandleConversation();
                        }
                    }}
                    className="flex-1 w-full m-2 min-h-24 rounded-xl px-6 outline-0
                               overflow-y-auto
                               [scrollbar-color:#3f3f46_#18181b]
                               [scrollbar-width:thin]
                               [&::-webkit-scrollbar]:w-2
                             [&::-webkit-scrollbar-track]:bg-zinc-900
                             [&::-webkit-scrollbar-thumb]:bg-zinc-700
                             [&::-webkit-scrollbar-thumb:hover]:bg-zinc-600"
                    placeholder="Let's build" >
                </textarea>
                <button onClick={HandleConversation} className="flex-none cursor-pointer  rounded-full bg-white hover:bg-white/90 p-2 m-2 mx-4 text-black">
                    <FiArrowUp />
                </button>
            </div>
        </div>
    )
}

export default ProjectSidebar;
