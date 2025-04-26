import axiosInstance from "../axiosInstance";
const AICHATBOT = "/api/ai-chatbot";
const ChatRecommendation = async (topic: { topic: string }) => {
  try {
    const response = await axiosInstance.post(`${AICHATBOT}`, topic);
    const result = response?.data;
    const status = response?.status;

    return {
      data: result,
      status: status,
    };
  } catch (error: any) {
    console.log(error);
    return {
        error : error
    }
  }
};

export const chatServices = {
  ChatRecommendation,
};
