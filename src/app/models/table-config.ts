export interface TableConfig {
    actions?: {
        edit?: boolean,
        open?: boolean,
        delete?: boolean,
        assignroles?: boolean,
        contractPlanning?:boolean,
        procurementStatus?:boolean,
        dispatchStatus?:boolean
    };
}
