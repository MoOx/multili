const multili = require("../index.js")

it("trim spaces on first and last lines", () => {
  expect(multili(`
This is a
  multi-lines
    string
    `
  ))
  .toEqual(`
This is a
  multi-lines
    string
`
  )
})

it("remove global common indentation", () => {
  expect(multili(`
  This is a
  multi-lines
    string
    `
  ))
  .toEqual(`
This is a
multi-lines
  string
`
  )
})

it("remove common indentation based on the sortest indented line", () => {
  expect(multili(`
    This is a
  multi-lines
    string
    `
  ))
  .toEqual(`
  This is a
multi-lines
  string
`
  )
})

it("don't remove empty lines except the first and the last", () => {
  expect(multili(`
        This is a

    multi-lines
      string
  `))
  .toEqual(`
    This is a

multi-lines
  string
`
  )
})

it("accept and return an array", () => {
  expect(multili([
    "        This is a",
    "          milti-line",
    "            string",
  ]))
  .toEqual([
    "This is a",
    "  milti-line",
    "    string",
  ])
})

it("zero '0' should be preserved", () => {
  expect(multili(`the next line starts with 0:
0123`))
  .toEqual(`the next line starts with 0:
0123`)
})
