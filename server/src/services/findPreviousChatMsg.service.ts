import AppDataSource from "../config/db.config";
import { Conversation } from "../entities/conversation.entity";

const conversationRepo = AppDataSource.getRepository(Conversation);
// type HistoryMessage =
//   | { role: "user", content: string }
//   | { role: "system", content: string }
//   | {
//       role: "assistant",
//       tool_calls: {
//         id: string,
//         name: string,
//         arguments: string,
//       }
//     }
//   | { role: "tool", tool_call_id: string, content: string }

export const findPreviousChatMsgService = async (projectId: string) => {
    const conversations = await conversationRepo.find({
        where: {
            projectId
        }
    });

    const history = conversations.map((conversation) => {
        if (conversation.messageFrom === "USER") {
            return {
                role: "user",
                content: conversation.contents
            }
        }

        if (conversation.type === "TEXT_MESSAGE") {
            return {
                role: "system",
                content: conversation.contents
            }
        }

        if(conversation.messageFrom === "ASSISTANT"){
            return {
                role: "assistant",
                tool_calls: [
                    {
                        id: conversation.id,
                        name: conversation.toolCall,
                        arguments: JSON.stringify({
                            location: (conversation.toolMetadata as any).location}),
                            content: conversation.contents
                    }
                ]
            }
        }

        if(conversation.messageFrom === "ASSISTANT"){
            return {
                role: "tool",
                tool_call_id: conversation.id,
                content: (conversation.toolMetadata as any).returnContent
            }
        }
    });

    return history;
}