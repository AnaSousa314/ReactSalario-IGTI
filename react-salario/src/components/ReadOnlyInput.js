import React, { Component } from 'react'
import css from './style.module.css'

export default class ReadOnlyInput extends Component {
    render() {
        const {value,description,percentage,simbol,simbol2} = this.props;
        //const simbol = "%";
        return (
            <div className={`${css.calcs}`}>
                <label>
                    <span>{description}</span>
                    <input  type='text' readOnly disabled value={value}/>
                    <span>{simbol2}{percentage}{simbol}</span> 
                </label>
            </div>
        )
    }
}
