import { SOCKET_STRING } from "./socket-string";
import socket from "./socket";
import { ChatPatientRoomData, ChatRoomType } from "@/context/ChatContext";

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

export const getNameAndOtherDetails = (
    personChat: ChatRoomType | ChatPatientRoomData,
    currentUserInternalId: string
) => {
    // console.log(currentUserInternalId)
    const isChatCreatedByUser = personChat?.createdBy === currentUserInternalId;
    const toBeRequested = personChat?.isActive;
    const isConfirmed = personChat?.isConfirmed;
    const isSelf = personChat?.orgUserIds.every(
        (x) => x === currentUserInternalId
    );
    let nameOfUser = "";
    let avatarOfUser = "";
    let status = "";
    let statusColor = "";
    if (toBeRequested) {
        if (!isConfirmed) {
            if (isChatCreatedByUser) {
                status = `[ Pending ]`;
                statusColor = "text-red-500";
            } else {
                status = `[ New ]`;
                statusColor = "text-green-500";
            }
        }
    } else {
        status = "Chat Now";
        statusColor = "text-blue-500 text-xl text-right";
    }
    if (isChatCreatedByUser) {
        nameOfUser = personChat?.requestedToObj?.name;
        avatarOfUser = "";
    } else {
        nameOfUser = personChat?.createdByObj?.name;
        avatarOfUser = "";
    }

    return {
        nameOfUser,
        avatarOfUser,
        toBeRequested,
        isSelf,
        status,
        statusColor,
        isConfirmed,
    };
};