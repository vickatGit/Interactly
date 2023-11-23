export class ApiError extends Error{
    public code:number
    public errors:any

    constructor(code:number,errors:any,msg:string){
        super(msg);
        this.code=code
        this.errors=errors
    }
}
