import { Post } from "@/utils/axios";
import axios from "axios";
import { useState } from "react"
import { FiArrowUp } from "react-icons/fi"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Chat = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState<string>();
  const HandlePrompt = async () => {
    try {
      const response = await Post("/api/v0/project", {
        prompt
      });

      if (response.data.success) {
        const project = response.data.data;
        console.log(project);
        navigate(`/project/${project.id}`, {
          state: {
            prompt
          }
        })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Network or server error");
      }
    }

  }
  return (
    <div className="relative mx-auto flex flex-col items-center my-auto">
      <h1 className="font-medium text-6xl mb-8">What will you
        <span> </span><span className="bg-gradient-to-r from-blue-600">build </span>
        today?</h1>
      <p className="text-xl font-semibold text-zinc-300">Loveable turns concepts into production-ready websites, </p>
      <p className="text-xl font-semibold text-zinc-300">saving time and eliminating technical barriers.</p>
      <div className="flex flex-col w-full items-end border-3 shadow-2xl border-zinc-600 rounded-md mt-8 p-4 min-h-36 gap-2
                      [scrollbar-color:#3f3f46_#18181b]
                      [scrollbar-width:thin]
                      [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-zinc-900
                    [&::-webkit-scrollbar-thumb]:bg-zinc-700
                    [&::-webkit-scrollbar-thumb:hover]:bg-zinc-600
      ">
        <textarea onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              HandlePrompt();
            }
          }}
          className="flex-1 w-full outline-0 min-h-24" id="msg" placeholder="let's build website">
        </textarea>
        <button onClick={HandlePrompt}
          className="flex-none cursor-pointer hover:bg-white/90 duration-200 bg-white px-3 py-3 text-lg rounded-full text-black"
        >
          <FiArrowUp />
        </button>
      </div>
    </div>
  )
}

export default Chat
