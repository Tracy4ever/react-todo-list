import React from 'react';
import ReactDOM from 'react-dom';
import {Checkbox,Input,Button } from 'antd';
import {CloseCircleOutlined} from '@ant-design/icons';
import './index.scss';
class Adder extends React.Component {
    render() {
        return (
            <div
                className="adder"
            >
                <Input placeholder="请输入你需要做的事情..." onChange={(e)=>this.props.onChange(e)}></Input>
                <Button onClick={()=>this.props.onClick()}>新建任务</Button>
            </div>
        )
    }
}
class TodoItem extends React.Component {
    render() {
        return(
            <div
                className={['todo-item',this.props.completed?'completed':''].join(' ')}
            >
                <Checkbox onChange={this.props.onChange}></Checkbox>
                <span className="value">{this.props.value}</span>
                <CloseCircleOutlined onClick={this.props.onDelete}/>
            </div>
        )
    }
}
class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                {`${this.props.dones}已完成/${this.props.all}总数`}
            </div>
        )
    }
}
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [
                { id:+new Date(), name:'打游戏', completed: false },
                { id:+new Date(), name:'打番茄', completed: false },
                { id:+new Date(), name:'做家务', completed: false }
            ],
            needAdd:''
        }
    }
    renderTodoList() {
        const list = this.state.lists.map((item,index) => {
            return (
                <TodoItem
                    value={item.name}
                    onDelete={()=>this.onHandleDelete(index)}
                    key={item.name}
                    onChange={this.onHandleChangeCompleted(index)}
                    completed={item.completed}
                >
                </TodoItem>
            )
        })
        return list;
    }
    render() {
        const all = this.state.lists.length;
        const lists = this.state.lists.slice();
        let donesList = lists.filter(item => item.completed)
        let donesLength = donesList.length;
        return (
            <div 
                className="board"
            >
                <h2>todoList</h2>
                <div className="lists">{this.renderTodoList()}</div>
                <Footer dones={donesLength} all={all}/>
                <Adder value={this.state.needAdd} onClick={()=>this.onHandleAdd()} onChange={this.onHandleChange.call(this)}/>
            </div>
        )
    }
    onHandleDelete(index) {
        let list = this.state.lists.slice();
        list.splice(index,1);
        this.setState({
            lists: list
        })
    }
    onHandleChangeCompleted(index) {
        const self = this;
        return function(e) {
            let lists = self.state.lists.slice();
            lists[index].completed = e.target.checked;
            self.setState({
                lists: lists
            })
        }
    }
    onHandleChange(e) {
        var self = this;
        console.log(this);
        return (e) => {
            console.log(e);
            self.setState({
                needAdd: e.target.value
            })
        }
        
    }
    onHandleAdd() {
        const lists = this.state.lists.slice();
        const id = +new Date();
        if (!this.state.needAdd) return;
        const task = {
            id: id,
            name: this.state.needAdd,
            completed: false
        }
        lists.push(task);
        this.setState({
            lists: lists
        })      
    }
}

ReactDOM.render(
    <Board className="board"/>,
    document.getElementById('root'),
);