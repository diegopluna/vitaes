import { CVProps } from "./cv-types"

export type userCV = {
    id: string
    userId: string
    name: string
    data: CVProps
    createdAt: Date
    updatedAt: Date
}