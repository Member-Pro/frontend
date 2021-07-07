export function objectToQueryString(obj: any): string {
  if (!obj) {
    return '';
  }

  const params = new URLSearchParams(obj);
  return params.toString();
}
