export interface IDrawerCloseParams {
    refreshItems?: boolean;
}

export interface ICreationDrawerProps {
    open: boolean;
    onClose: (params?: IDrawerCloseParams) => void;
}
