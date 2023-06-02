export interface Variant {
    id: string | number, 
    name: string 
}

export interface IToolbarActions {
    id?: string | undefined,
    action?: () => void,
    resource?: string,
    selected?: string[] | number[] 
}
  