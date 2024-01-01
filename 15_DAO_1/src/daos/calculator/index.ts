import  { Calculator} from "../../models";

export interface CalcualtorDao{
    create(calculator:Calculator):Promise<Calculator>;
    read(id:string):Promise<Calculator| undefined>;
    upsert(id:string, calculator:Calculator):Promise<Calculator>;
    delete(id:string):Promise<void>;
    list():Promise<Calculator[]>;
}