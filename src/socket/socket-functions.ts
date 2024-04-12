import { SOCKET_STRING } from "./socket-string";
import socket from "./socket";

export type ChatHistoryOfficeFields = {
    practiceOfficeChatConversationId: any;
    orgUserId: any;
    lastSeen: string;
    practiceOfficeLastSeenMessageId: any;
};
export const chatPatientHistory = (history: ChatHistoryOfficeFields) => {
    socket.emit(SOCKET_STRING.PRACTICE_OFFICE_CHAT_HISTORY, history);
};
export const messageDelete = (
    id: string,
    currentUserId: string,
    orgUserIds: string[],
    practiceOfficeChatConversationId: string
) => {
    socket.emit(SOCKET_STRING.PRACTICE_OFFICE_MESSAGE_DELETE, {
        id,
        currentUserId,
        orgUserIds,
        practiceOfficeChatConversationId
    });
};
export const messageUpdate = (
    id: string,
    currentUserId: string,
    orgUserIds: string[],
    practiceOfficeChatConversationId: string,
    message: string
) => {
    socket.emit(SOCKET_STRING.PRACTICE_OFFICE_MESSAGE_UPDATE, {
        id,
        currentUserId,
        orgUserIds,
        practiceOfficeChatConversationId,
        message,
    });
};