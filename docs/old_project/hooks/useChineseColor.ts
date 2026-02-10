import ChineseColor from "~/constant/chinese-color";

export default function useChineseColor() {
  const colorLength = ChineseColor.length
  function getRandomChineseColor() {
    let randomNum = Math.floor(Math.random() * colorLength)
    const randomGroup = ChineseColor[randomNum]
    randomNum = Math.floor(Math.random() * randomGroup.length)
    return randomGroup[randomNum]
  }

  return {
    getRandomChineseColor
  }
}
