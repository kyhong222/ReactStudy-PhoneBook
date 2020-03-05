import React, { Component } from 'react';
import PhoneForm from './PhoneForm';
import PhoneInfoList from './PhoneInfoList';

class App extends Component {
  id = 2
  state = {
    information: [
      {
        id: 0,
        name: 'kim',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: 'hong',
        phone: '010-0000-0001'
      }
    ]
  }
  handleCreate = (data) => {
    const {information } = this.state;
    this.setState({
      information: information.concat({id:this.id++, ...data})
    })

    // console.log(data);
  }
  handleRemove = (id) => {
    const {information} = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }
  handleUpdate = (id, data) =>{
    const {information} = this.state;
    this.setState({
      information: information.map(
        info=>id===info.id
        ?{...info, ...data}
        : info
      )
    })
  }


  render() {
    const { information } = this.state;
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
          <PhoneInfoList 
            data = {this.state.information}
            onRemove={this.handleRemove}
            onUpdate={this.handleUpdate}
          />
        {/* {JSON.stringify(information)} */}
      </div>
    );
  }
}

export default App;