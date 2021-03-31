import React from 'react';
import TodoList from './todoList';
import AddTodo from './addTodo';
import TodoService from '../services/todoService';


class App extends React.Component{

    constructor(props){
        super(props);

        this.todoService = new TodoService();

        this.state = {
            todos : []
        };
    }

    componentDidMount(){
        
        this.getAllTodos();

        // s.getTodos().then(data=>{
        //     console.log(data,"data comp");
        //     this.setState({todos:data});
        // })
        // .catch(err=>{
        //     console.log(err,"error aya");
        // }); 
    }

    getAllTodos = ()=>{
        this.todoService.getTodos().then(data=>{
            this.setState({todos:data});
        });
    }

    addNewTodo = (title)=>{
        const todo = {id:0,title:title,isCompleted:false,statusId:0};
        this.todoService.addTodo(todo).then(value=>{
            this.getAllTodos();
        });
    }

    updateTodo = (todo)=>{
        this.todoService.updateTodo(todo).then(value=>{
            this.getAllTodos();
        });
    }

    deleteTodo = (id)=>{
        this.todoService.deleteTodo(id).then(value=>{
            this.getAllTodos();
        });
    }


    addNewTodoLocally = (title)=>{

        const tp = this.state.todos.concat({id:this.state.todos.length>0?this.state.todos[this.state.todos.length-1].id+1:1,title:title,isCompleted:false,statusId:0});
        this.setState(
            {
                todos:tp
            },
            ()=>{}
        );
        
    }

    deleteTodoLocally = (id)=>{
        console.log(this.state.todos);
        const tp = this.state.todos.filter((item) => item.id !== id);
        this.setState({todos:tp});
    }

    updateTodoLocally = (todo)=>{


        //this creates a shallow copy, meaning that objects within this object would still be the original ones
        // const todos = this.state.todos.map(l => Object.assign({}, l));
        // todos[todo.id-1] = todo;
        // this.setState({todos: todos}, () => {});



        //while this creates a deep copy, meaning the whole object is new
        const todos = JSON.parse(JSON.stringify(this.state.todos));
        todos[todo.id-1] = todo;
        this.setState({todos});

        
    }

    updateStatus = (id,statusId)=>{



        const todos = this.state.todos.map(l => Object.assign({}, l));
        todos[id-1].statusId = statusId*1;
        this.setState({todos: todos}, () => {});



        // //creating a shallow copy of list
        // let tod = [...this.state.todos];

        // console.log(this.state.todos,"state todos before update");
        // console.log(tod,"non state todos before update");
        // //getting the desired element
        // let todo =  {...tod[id-1]};

        // //chaning the property
        // todo.statusId = statusId*1;

        // //changing the copied list
        // tod[id-1] = todo;

        // console.log(tod,"non state todos updated");

        // //setting the original to the changed one
        // this.setState({todos:tod});
        // console.log(this.state.todos," state todos updated");
    }


    printTodos = ()=>{
        alert(JSON.stringify(this.state.todos));
    }

    render(){
        if(this.state.todos){
            return(
                <div>
    
                    <div style={{marginTop:"20px"}}>
                        <AddTodo addNewTodo={this.addNewTodo}></AddTodo>
                    </div>
    
                    <TodoList updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} todos={this.state.todos}></TodoList>
    
                    <button className="ui green button" onClick={this.getAllTodos} style={{marginLeft:'10px',width:'200px',height:'200px'}}>Refresh</button>
                </div>
            )
        }
        else{
            return <div></div>
        }
        
    }


}


export default App;
