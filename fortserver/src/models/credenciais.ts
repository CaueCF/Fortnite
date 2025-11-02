import IUser from "./user";

export class ICredenciais {
    id?: number;
    userId: number;
    senha: string;
    user: IUser;
}
export default ICredenciais;