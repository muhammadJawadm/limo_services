import api, { getApiErrorMessage } from './api'
import { isApiSuccess, parseApiData, withDataResponse } from './apiRequest'

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

export async function getDriverChatMessages() {
	try {
		const response = await api.get('/api/driver/chat/messages')
		const data = parseApiData(response)
		return {
			success: isApiSuccess(data),
			data: Array.isArray(data.data) ? data.data : [],
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

export async function sendDriverChatMessage(text) {
	return withDataResponse(
		() => api.post('/api/driver/chat/messages', { text }),
		'Failed to send driver chat message.',
		{ includeMessage: false },
	)
}
