import { getAccessToken } from '@base44/sdk';

const isNode = typeof window === 'undefined';

const isClearAccessTokenRequested = () =>
	!isNode && new URLSearchParams(window.location.search).get("clear_access_token") === 'true';

const clearStoredAccessToken = () => {
	window.localStorage.removeItem('base44_access_token');
	window.localStorage.removeItem('token');
}

// Valores públicos de respaldo para compilaciones fuera de Base44 (GitHub Pages):
// el identificador de la app viaja igual en el bundle y el backend vive en la plataforma.
const FALLBACK_APP_ID = '6af2987104e367fb21cb490c';
const FALLBACK_APP_BASE_URL = 'https://base44.app';

/** Base44 sirve la app y su API en el mismo origen; un build estático debe llamar al backend por su URL absoluta. */
export const isBase44Hosted = Boolean(import.meta.env.VITE_BASE44_APP_BASE_URL);

const getAppParams = () => {
	if (isClearAccessTokenRequested()) {
		clearStoredAccessToken();
	}
	return {
		appId: import.meta.env.VITE_BASE44_APP_ID || FALLBACK_APP_ID,
		token: getAccessToken(),
		functionsVersion: (!isNode && new URLSearchParams(window.location.search).get("functions_version")?.trim()) || import.meta.env.VITE_BASE44_FUNCTIONS_VERSION,
		appBaseUrl: import.meta.env.VITE_BASE44_APP_BASE_URL || FALLBACK_APP_BASE_URL,
	}
}


export const appParams = {
	...getAppParams(),
	isBase44Hosted,
}