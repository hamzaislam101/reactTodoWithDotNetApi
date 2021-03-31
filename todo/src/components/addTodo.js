import React from 'react';

class AddTodo extends React.Component{


    constructor(props){
        super(props);
        this.state = {title:''};
    }

    addNewTodo = (e)=>{
        const title = this.state.title;
        this.setState({title:''});
        this.props.addNewTodo(title);
        
    }

    checkEnterKey = (e)=>{
        if(e.key === "Enter"){
            this.addNewTodo(undefined);
        }
    }

    render() {
        return (
            <div className="ui five column grid">
                <div className="column"></div>
                <div className="column"></div>
                <div className="column">
                    <div className="ui action input">
                        <input type="text" onKeyDown={this.checkEnterKey} value={this.state.title} onChange={e=>this.setState({title:e.target.value})} />
                        <button className="ui button" onClick={this.addNewTodo}>Add</button>
                    </div>
                </div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
            
        );
    }


}


export default AddTodo;