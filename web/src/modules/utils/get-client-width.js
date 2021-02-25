import isClient from './is-client';

export default function getClientWidth() {
  if (!isClient) return 0;
  return window.innerWidth || 0;
}
