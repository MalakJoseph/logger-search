export function isInDateRange(createdAt: string, from: string, to: string) {
  return (
    new Date(createdAt).getTime() > new Date(from).getTime() &&
    new Date(createdAt).getTime() < new Date(to).getTime()
  );
}
