export function setItem(key, value, ttl) {
	const now = new Date()
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	window.localStorage.setItem(key, JSON.stringify(item))
}
export function getItem(key) {
	const itemStr = window.localStorage.getItem(key)
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	if (now.getTime() > item.expiry) {
		window.localStorage.removeItem(key)
		return null
	}
	return item.value
}