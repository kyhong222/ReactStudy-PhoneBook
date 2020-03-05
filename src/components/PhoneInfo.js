import React, {Component} from 'react';

class PhoneInfo extends Component {
    static defaultProps = {
        info: {
            name: '이름',
            phone: '010-0000-0000',
            id: 0
        }
    }
    state = {
        editing: false,
        name: '',
        phone: '',
    }
    handleRemove = () => {
        const {info, onRemove} = this.props;
        onRemove(info.id);
    }
    // edit을 누르면 수정 가능하도록 editing을 true-false 전환해주는 함수
    handleToggleEdit= () => {
        const{editing} = this.state;
        
        this.setState({editing: !editing});
    }
    // change시의 핸들러
    handleChange=(e) => {
        const {name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    // editing값이 바뀔때 처리할 로직
    // 수정되면 input의 값을 부모(원래 객체)에게 전달
    componentDidUpdate(prevProps, prevState)
    {
        const{info, onUpdate} = this.props;
        if(!prevState.editing && this.state.editing)
        {
            // 이전의 상태가 false였고, 지금상태가 true일때
            // 즉 false->true되었을때
            this.setState({
                // info의 값을 수정할 수 있게 state에 넣어줌
                name: info.name,
                phone: info.phone
            })
        }

        if(prevState.editing && !this.state.editing)
        {
            // 이전 상태가 true, 현 상태가 false일때
            // 즉 true -> false인 경우
            // 수정이 완료되었으므로 state를 다시 전달
            onUpdate(info.id, {
                name: this.state.name,
                phone: this.state.phone
            });
        }
    }

    render() 
    {
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };

        const{editing} = this.state;
        if(editing){
            return(
                // 수정상태 ON일때는 input을 쓰도록 render해야함.
                <div style={style}>
                    <div>
                        <input
                            value={this.state.name}
                            name="name"
                            placeholder="Name"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input
                            value={this.state.phone}
                            name="phone"
                            placeholder="Phone Number"
                            onChange={this.handleChange}
                        />                            
                    </div>
                    <button onClick={this.handleToggleEdit}>Confirm</button>
                    <button onClick={this.handleRemove}>Delete</button>
                </div>
            );
            
        }

        // 수정모드가 아닌 일반모드는 이렇게 렌더링
        const {
            name, phone
        } = this.props.info;

        return (
            <div style={style}>
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handleToggleEdit}>Edit</button>
                <button onClick={this.handleRemove}>Delete</button>
            </div>

        );
    }
}

export default PhoneInfo;