import api, { getApiErrorMessage } from './api'
import { isApiSuccess, parseApiData, buildDataFailure } from './apiRequest'

export function normalizeDriverChatMessage(message = {}, currentUserId = null) {
	return {
		id: message.id || message._id || message.messageId || null,
		text: message.text || '',
		senderId: message.senderId || message.sender?.id || message.sender?._id || null,
		senderRole: message.senderRole || message.sender?.role || null,
		createdAt: message.createdAt || message.updatedAt || new Date().toISOString(),
		updatedAt: message.updatedAt || message.createdAt || new Date().toISOString(),
		sender: message.sender || null,
		isOwn: Boolean(
			currentUserId &&
				(message.senderId === currentUserId ||
					message.sender?.id === currentUserId ||
					message.sender?._id === currentUserId),
		),
	}
}

// Response shape: { success, data: { count, data: [...messages] } }
export async function getDriverChatMessages() {
	try {
		const response = await api.get('/api/driver/chat/messages')
		const data = parseApiData(response)
		const messages = data.data?.data ?? data.data ?? []
		return {
			success: isApiSuccess(data),
			data: Array.isArray(messages) ? messages : [],
			raw: data,
		}
	} catch (error) {
		return {
			success: false,
			message: getApiErrorMessage(error) || 'Failed to fetch driver chat messages.',
			data: [],
			raw: error?.response?.data ?? null,
		}
	}
}

// Response shape: { success, data: { data: { ...message } } }
export async function sendDriverChatMessage(text) {
	try {
		const response = await api.post('/api/driver/chat/messages', { text })
		const data = parseApiData(response)
		return {
			success: isApiSuccess(data),
			data: data.data?.data ?? data.data ?? null,
		}
	} catch (error) {
		return buildDataFailure(error, 'Failed to send driver chat message.')
	}
}
