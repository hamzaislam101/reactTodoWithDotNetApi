import axios from 'axios'


export default class TodoService{


    constructor(){
        this._todoService = axios.create({
            baseURL:'https://localhost:44382/api'
        });
    }

    async getTodos(){
        const resp = await this._todoService.get('/Todos');
        return resp.data;
    }

    async addTodo(todo){
        todo.id = 0;
        const resp = await this._todoService.post('/Todos',todo);
        return resp.data;
    }

    async updateTodo(todo){
        const resp = await this._todoService.put('/Todos/'+todo.id,todo);
        return resp.data;
    }

    async deleteTodo(id){
        const resp = await this._todoService.delete('/Todos/'+id);
        return resp.data;
    }

}