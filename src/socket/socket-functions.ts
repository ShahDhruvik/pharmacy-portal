import { EnumValues } from "@/types/common";
import { PracticePatientChatUserTypeEnum } from "@/utils/constants";
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