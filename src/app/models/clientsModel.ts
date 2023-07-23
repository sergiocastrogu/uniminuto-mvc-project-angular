import { ClientType } from "./clientsTypeModel"

export interface Client {
    id: number
    firstName: string
    lastName: string
    birthDate: Date
    active: boolean
    typeId: number
    clientType?: ClientType
  }