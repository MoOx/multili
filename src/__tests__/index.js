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

it("does not remove empty lines except the first and the last", () => {
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
