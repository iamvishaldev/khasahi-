export function formatMessageTime(isoDate: string): string {
  return new Date(isoDate).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}
