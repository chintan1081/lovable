import AppDataSource from "../config/db.config";
import { Conversation } from "../entities/conversation.entity";

const conversationRepo = AppDataSource.getRepository(Conversation);

export const findPreviousChatMsgService = async (projectId: string) => {
    const conversations = await conversationRepo.find({
        where: {
            projectId
        }
    });

    const history: any[] = []
    conversations.forEach((conversation) => {
        if (conversation.messageFrom === "USER") {
            history.push({
                role: "user",
                content: conversation.contents
            });
        }

        if (conversation.type === "TEXT_MESSAGE") {
            history.push({
                role: "system",
                content: conversation.contents
            });
        }

        if (conversation.messageFrom === "ASSISTANT") {
            history.push({
                role: "assistant",
                tool_calls: [
                    {
                        id: conversation.id,
                        name: conversation.toolCall,
                        arguments: JSON.stringify({
                            location: (conversation.toolMetadata as any).location
                        }),
                        content: conversation.contents
                    }
                ]
            });

            history.push({
                role: "tool",
                tool_call_id: conversation.id,
                content: (conversation.toolMetadata as any).returnContent
            });
        }
    });

    return history;
}