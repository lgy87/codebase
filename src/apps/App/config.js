import storage from "~/utils/storage"

export const NAME = "NAME"
export const THEME = "THEME"
export const SIDEBAR = "SIDEBAR"

export default async function useConfigs() {
	const [name, theme, sidebar] = await Promise.all([
		storage.getItem(NAME),
		storage.getItem(THEME),
		storage.getItem(SIDEBAR),
	])

	return {
		name,
		theme,
		sidebar,
	}
}
