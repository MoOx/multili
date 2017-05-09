"use strict"

const whiteSpaceRE = /\s+/
const whiteSpaceBeginRE = /^\s+/
const fakeInfiniteString = { length: Infinity }

module.exports = s => {
  const resultArray = Array.isArray(s)
  const lines = resultArray ? s : s.split("\n")
  let whiteSpace = fakeInfiniteString
  lines.forEach(line => {
    const matches = line.match(whiteSpaceBeginRE)
    if (line.length && line.replace(whiteSpaceRE, "") !== "") {
      if (
        matches &&
        matches.length < line.length &&
        matches[0].length < whiteSpace.length
      ) {
        whiteSpace = matches[0]
      } else if (whiteSpace === fakeInfiniteString) {
        whiteSpace = ""
      }
    }
  })

  if (lines.length) {
    const firstLine = lines[0].replace(whiteSpaceRE, "")
    if (firstLine === "") {
      lines[0] = firstLine
    }
    const lastLine = lines[lines.length - 1].replace(whiteSpaceRE, "")
    if (lastLine === "") {
      lines[lines.length - 1] = lastLine
    }
  }

  let result = s
  if (whiteSpace !== fakeInfiniteString) {
    result = lines.map(line => line.replace(whiteSpace, ""))
    if (!resultArray) {
      result = result.join("\n")
    }
  }

  return result
}
