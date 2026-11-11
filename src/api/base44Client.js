import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl, isBase44Hosted } = appParams;

export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  // En Base44 las llamadas /api van al mismo origen; en un build estático (GitHub Pages)
  // deben apuntar al backend de la plataforma.
  serverUrl: isBase44Hosted ? '' : appBaseUrl,
  appBaseUrl
});