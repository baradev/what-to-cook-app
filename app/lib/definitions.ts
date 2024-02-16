// Here, we manually define the types that will be returned from the database. 

export type Meal {
  id?: string // Make id optional
  name: string
  day: string
  isFavourite: boolean
}
