import AppDataSource from "../config/db.config";
import { Conversation, ConversationMessageFrom, ConversationToolCall, ConversationType } from "../entities/conversation.entity";
import { Project } from "../entities/project.entity";

const conversationRepo = AppDataSource.getRepository(Conversation);

export const conversationService = async(
    project: Project,
    conversationType: ConversationType,
    messageFrom: ConversationMessageFrom,
    contents: string,
    toolCall?: ConversationToolCall,
    toolMetadata?: any,
    hidden?: boolean
) => {
    const conversation = conversationRepo.create({
        type: conversationType,
        messageFrom,
        contents,
        projectId: project.id,
        project
    });

    if(toolCall && toolMetadata && hidden){
        conversation.toolCall = toolCall;
        conversation.toolMetadata = toolMetadata;
        conversation.hidden = hidden;
    }
    await conversationRepo.save(conversation);
    return conversation;
}