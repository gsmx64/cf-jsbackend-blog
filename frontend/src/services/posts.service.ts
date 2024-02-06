import api from "../utils/useApi";
import authHeader from "./auth-header";
import IPost from "../interfaces/post.interface";


const create = (data: IPost) => {
    return api.post<IPost>(`posts/create`, { data: data, headers: authHeader() });
};

const update = (id: any, data: IPost) => {
    return api.put<any>(`posts/edit/${id}`, { data: data, headers: authHeader() });
};

const remove = (id: any) => {
    return api.delete<any>(`posts/delete/${id}`, { headers: authHeader() });
};

const get = (id: any) => {
    return api.get<IPost>(`posts/view/${id}`);
};

const getAll = () => {
    return api.get<Array<IPost>>(`posts/list`);
};

const findByTitle = (title: string) => {
    return api.get<Array<IPost>>(`posts/search?sortBy=id%3ADESC&search=${title}&searchBy=title&select=title`, { headers: authHeader() });
};

const search = (query: any) => {
    return api.get<Array<IPost>>(`posts/search${query}`, { headers: authHeader() });
};

const filter = (query: any) => {
    return api.get<Array<IPost>>(`posts/filter${query}`, { headers: authHeader() });
};

const PostsService = {
    create,
    update,
    remove,
    get,
    getAll,
    findByTitle,
    search,
    filter
};
  
export default PostsService;