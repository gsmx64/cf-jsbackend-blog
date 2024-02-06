import api from "../utils/useApi";
import authHeader from "./auth-header";
import IComment from "../interfaces/comment.interface";


const create = (data: IComment) => {
    return api.post<IComment>(`comments/create`, { data: data, headers: authHeader() });
};

const update = (id: any, data: IComment) => {
    return api.put<any>(`comments/edit/${id}`, { data: data, headers: authHeader() });
};

const remove = (id: any) => {
    return api.delete<any>(`comments/delete/${id}`, { headers: authHeader() });
};

const get = (id: any) => {
    return api.get<IComment>(`comments/view/${id}`);
};

const getAll = () => {
    return api.get<Array<IComment>>(`comments/list`);
};

const search = (query: any) => {
    return api.get<Array<IComment>>(`comments/search${query}`, { headers: authHeader() });
};

const filter = (query: any) => {
    return api.get<Array<IComment>>(`comments/filter${query}`, { headers: authHeader() });
};

const CommentsService = {
    create,
    update,
    remove,
    get,
    getAll,
    search,
    filter
};
  
export default CommentsService;