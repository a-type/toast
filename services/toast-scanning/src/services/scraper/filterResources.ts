import { Request, ResourceType } from 'puppeteer';
import isTrackingDomain from 'is-tracking-domain';
import extractDomain from 'extract-domain';

const BLOCKED_RESOURCES: ResourceType[] = [
  'font',
  'image',
  'media',
  'stylesheet',
];

const isExternalTracker = (pageUrl: string, request: Request) => {
  const pageDomain = extractDomain(pageUrl);
  const domain = extractDomain(request.url());

  return pageDomain !== domain && isTrackingDomain(domain);
};

export default (pageUrl: string, request: Request): boolean =>
  BLOCKED_RESOURCES.includes(request.resourceType()) ||
  isExternalTracker(pageUrl, request);
