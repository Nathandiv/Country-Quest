export interface CountryInterface {
    name: Name
    tld: string[]
    cca2: string
    ccn3: string
    cca3: string
    cioc: string
    independent: boolean
    status: string
    unMember: boolean
    currencies: any[]
    idd: Idd
    capital: string[]
    altSpellings: string[]
    region: string
    subregion: string
    languages: any[]
    translations: Translations
    latlng: number[]
    landlocked: boolean
    borders: string[]
    area: number
    demonyms: any
    flag: string
    maps: Maps
    population: number
    fifa: string
    car: Car
    timezones: string[]
    continents: string[]
    flags: Flags
    coatOfArms: CoatOfArms
    startOfWeek: string
    capitalInfo: CapitalInfo
    postalCode: PostalCode
  }
  
  export interface Name {
    common: string
    official: string
    nativeName: any
  }
  

  
  export interface Idd {
    root: string
    suffixes: string[]
  }
  
  
  export interface Translations {
    ara: Translation
    bre: Translation
    ces: Translation
    cym: Translation
    deu: Translation
    est: Translation
    fin: Translation
    fra: Translation
    hrv: Translation
    hun: Translation
    ita: Translation
    jpn: Translation
    kor: Translation
    nld: Translation
    per: Translation
    pol: Translation
    por: Translation
    rus: Translation
    slk: Translation
    spa: Translation
    srp: Translation
    swe: Translation
    tur: Translation
    urd: Translation
    zho: Translation
  }

  export interface Translation {
    official: string
    common: string
  }
  
  export interface Maps {
    googleMaps: string
    openStreetMaps: string
  }
  
  export interface Car {
    signs: string[]
    side: string
  }
  
  export interface Flags {
    png: string
    svg: string
    alt: string
  }
  
  export interface CoatOfArms {
    png: string
    svg: string
  }
  
  export interface CapitalInfo {
    latlng: number[]
  }
  
  export interface PostalCode {
    format: string
    regex: string
  }