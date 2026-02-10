export default function () {
  return (url: string) => {
    return new URL(`../assets/${url}`, import.meta.url).href
  }
}
