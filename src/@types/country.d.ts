export type Country = {
  name: {
    common: string
    official: string
    nativeName: {
      eng: {
        official: string
        common: string
      }
    }
  }
  cca2: string
  idd: {
    root: string
    suffixes: string[]
  }
  translations: {
    [key: string]: {
      official: string
      common: string
    }
  }
  postalCode: {
    format: string
    regex: string
  }
}

export type State = {
  name: string
  stateCode: string
}