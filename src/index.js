"use strict"

const whiteSpaceRE = /^\s+/
const fakeInfiniteString = { length: Infinity }

module.exports = (s) => {
  const lines = s.split("\n")
  let whiteSpace = fakeInfiniteString
  lines.forEach((line) => {
    const matches = line.match(whiteSpaceRE)
    if (
      line.length &&
      line.replace(/\s+/, "") !== ""
    ) {
      if (
        matches &&
        matches.length < line.length &&
        matches[0].length < whiteSpace.length
      ) {
        whiteSpace = matches[0]
      }
      else if (whiteSpace === fakeInfiniteString) {
        whiteSpace = 0
      }
    }
  })

  if (lines.length) {
    const firstLine = lines[0].replace(/\s+/, "")
    if (firstLine === "") {
      lines[0] = firstLine
    }
    const lastLine = lines[lines.length - 1].replace(/\s+/, "")
    if (lastLine === "") {
      lines[lines.length - 1] = lastLine
    }
  }

  let result = s
  if (whiteSpace !== fakeInfiniteString) {
    result = lines.map((line) => line.replace(whiteSpace, "")).join("\n")
  }

  return result
}
