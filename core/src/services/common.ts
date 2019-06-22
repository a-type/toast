import fetch, { RequestInit } from 'node-fetch';

/**
 * https://cloud.google.com/run/docs/authenticating/service-to-service
 */
export const getCloudRunAuthToken = async (serviceUrl: string) => {
  const metadataServerTokenURL =
    'http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience=';

  const response = await fetch(metadataServerTokenURL + serviceUrl, {
    headers: {
      'Metadata-Flavor': 'Google',
    },
  });

  return await response.text();
};

export const invokeCloudRun = async (
  serviceUrl: string,
  path: string,
  config: RequestInit,
) => {
  if (serviceUrl.includes('localhost')) {
    // we don't need auth for local service invocations
    return fetch(serviceUrl + path, config);
  }

  const token = await getCloudRunAuthToken(serviceUrl);
  return fetch(serviceUrl + path, {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};
