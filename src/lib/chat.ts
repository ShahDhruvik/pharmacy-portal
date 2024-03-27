import { LoadingState, ShowToastFunction } from "@/types/common";
import { CHAT } from "@/utils/endPoints";
import axiosInstance from "../../axiosInstance";

export const getOfficeChatConversation = async (
    setLoading: LoadingState["setLoading"],
    toast: ShowToastFunction,
) => {
    try {
        setLoading({ isLoading: true, isIndependentLoader: true, isPage: false })
        const res = await axiosInstance.post(CHAT.listAll);
        if (res) {
            if (res.data?.success) {
                return res.data?.data
            } else {
                return [];
            }
        } else {
            return [];
        }
    } catch (error: any) {
        console.log(error)
        if (error.response.status === 404) {
            toast('error', error.response.data.message)
        } else {
            toast('error', error.response.statusText)
        }
    } finally {
        setLoading({ isLoading: false, isIndependentLoader: false, isPage: false })
    }
};
export const getOneOfficeChatConversation = async (
    setLoading: LoadingState["setLoading"],
    chatConversationId: string,
    currentPage: number,
    toast: ShowToastFunction,
) => {
    try {
        setLoading({ isLoading: true, isIndependentLoader: true, isPage: false })
        const res = await axiosInstance.post(CHAT.getOne + chatConversationId, { currentPage });
        if (res) {
            if (res.data?.success) {
                return res.data?.data
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    } catch (error: any) {
        console.log(error)
        if (error.response.status === 404) {
            toast('error', error.response.data.message)
        } else {
            toast('error', error.response.statusText)
        }
    } finally {
        setLoading({ isLoading: false, isIndependentLoader: false, isPage: false })
    }
};

// export const getOnePatientChat = async (
//     setLoading: LoadingContextType["setLoading"],
//     chatConversationId: string,
//     currentPage: number,
//     loadingProps?: LoadingContextType["loading"]["loadingProps"],
// ) => {
//     const res = await apiRequest(
//         setLoading,
//         "POST",
//         PatientChatEndPoints.getOne + chatConversationId,
//         { currentPage },
//         loadingProps
//     );
//     if (res && res.success) {
//         return res.data;
//     } else {
//         return undefined;
//     }
// };