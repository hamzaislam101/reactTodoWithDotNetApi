import React from 'react';
import Todo from './todo';


class TodoList extends React.Component{

    constructor(props){
        super(props);
        this.state = {tList : props.todos};
    }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.todos !== this.state.tList){
    //         this.setState({ tList: nextProps.todos });  
    //     }
        
    // }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.todos !== prevState.tList) {
          return ({ tList: nextProps.todos }) // <- this is setState equivalent
        }
        return null
      }

    deleteTodo = (id)=>{
        this.props.deleteTodo(id);
    }

    updateStatus = (id,statusId)=>{
        this.props.updateStatus(id,statusId);
    }

    updateTodo = (todo)=>{
        this.props.updateTodo(todo);
    }

    render(){
        
        const tList = this.state.tList.map((todo)=>{
            return <Todo key={todo.id} todo={todo} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} ></Todo> 
        });
            

        return(
            <ul className="ui eight column grid" style={{listStyleType: "none",marginTop:"50px"}}>
                {tList}
            </ul>
            
        )
    }

}


export default TodoList;