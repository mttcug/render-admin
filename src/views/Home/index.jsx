import React from 'react'
import Generator from 'fr-generator'
import 'antd/dist/antd.css'
import './index.scss'

const defaultValue = {
    type: 'object',
    properties: {
        inputName: {
            title: '简单输入框',
            type: 'string'
        }
    }
}

const Demo = () => {
    return (
        <div style={{ height: '80vh', background: '#fff' }}>
            <Generator defaultValue={defaultValue} />
        </div>
    )
}

export default Demo
