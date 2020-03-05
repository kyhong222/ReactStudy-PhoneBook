import React, {Component} from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component
{
    static defaultProps = 
    {
        list: [],
        onRemove: () => console.warn('onRemove not defined'),
        onUpdate: () => console.warn('onUpdate not defined'),
    }

    render()
    {
        const {data, onRemove, onUpdate} = this.props;
        const list = data.map(
            info => (
            <PhoneInfo 
            key={info.id} 
            info={info}
            onRemove={onRemove} // 이게 있어야 객체의 remove 함수에 접근 가능함.
            onUpdate={onUpdate}
            />)
        );

        return(
            <div>
                {list}
            </div>
        );
    }
}

export default PhoneInfoList