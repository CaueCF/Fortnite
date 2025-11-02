import IUser from "./user";

export class ICredenciais {
    id?: number;
    username: string;
    senha: string;
    user: IUser;
}
export default ICredenciais;