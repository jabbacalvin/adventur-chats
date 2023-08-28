import sendRequest from './send-request';
const BASE_URL = '/api/chat';

export function getAllChatMessages() {
  return sendRequest(BASE_URL);
}

export function createChatMessage(chatMessage) {
  return sendRequest(BASE_URL, 'POST', chatMessage);
}

