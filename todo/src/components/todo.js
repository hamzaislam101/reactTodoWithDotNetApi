import React from 'react';



class Todo extends React.Component{



    constructor(props){
        super(props);
        this.state = {todo:props.todo,showTextBox:false,title:props.todo.title};
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.todo !== prevState.todo) {
          return ({ todo: nextProps.todo }) // <- this is setState equivalent
        }
        return null
      }

    checkChanged = (event)=>{
        const todo = Object.assign({},this.state.todo);
        todo.isCompleted = !this.state.todo.isCompleted;
        this.props.updateTodo(todo);
    }

    deleteTodo = (e)=>{
        this.props.deleteTodo(this.state.todo.id);
    }

    updateStatus = (e)=>{
        const todo = Object.assign({},this.state.todo);
        todo.statusId = e.target.value*1;
        this.props.updateTodo(todo);
    }

    toggleTitleDisplay = (e)=>{
        this.setState({showTextBox:true});
        //this.titleInput.focus();
    }

    updateTitleKeyDown = (e)=>{
        if(e.key === "Enter"){
            this.updateTitle();
        }
    }

    updateTitleBlur = (e)=>{
        this.setState({showTextBox:false});
        this.updateTitle();
    }

    updateTitle = ()=>{
        this.setState({showTextBox:false});
        const todo = Object.assign({},this.state.todo);
        todo.title = this.state.title;
        this.props.updateTodo(todo);
    }


    render(){

        if(this.state.todo){
            return(
                <li className="row">
                    <div className="column">
                    </div>
                    <div className="column">
                        {this.state.showTextBox ? 
                        <form className="ui form">
                            <div className="field">
                                <input autoFocus 
                                    ref={(input)=>{this.titleInput = input}} 
                                    onBlur={this.updateTitleBlur} 
                                    value={this.state.title} 
                                    onChange={e=>this.setState({title:e.target.value})} 
                                    onKeyDown={this.updateTitleKeyDown} />
                            </div>
                        </form> :  
                        <div onClick={this.toggleTitleDisplay}>{this.state.title}</div>}
                        <hr/>
                    </div>
                    <div className="column">
                        <input onChange={this.checkChanged} type="checkbox" value={this.state.todo.isCompleted?"on":"off"} checked={this.state.todo.isCompleted?"checked":""}  />
                    </div>

                    <div className="column">
                        <select style={{height:"40px"}} className="ui menu" onChange={this.updateStatus} value={this.state.todo.statusId}>
                            <option className="item" value={0} >Open</option>
                            <option className="item" value={1} >Assigned</option>
                            <option className="item" value={2} >OnGoing</option>
                            <option className="item" value={3} >Completed</option>
                        </select>
                    </div>

                    <div className="column">
                        <button className="ui red button" onClick={this.deleteTodo} >Delete</button>
                    </div>
                </li>
                
            )
        }
        return<div></div>

    }

}


export default Todo;