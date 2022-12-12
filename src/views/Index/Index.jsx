import React, { Component } from 'react'
import { Layout, Row, Col, Divider } from 'antd'

import screenfull from 'screenfull'
import '@/style/view-style/index.scss'

class Index extends Component {
    fullToggle = () => {
        if (screenfull.isEnabled) {
            screenfull.request(document.getElementById('bar'))
        }
    }
    render() {
        return <Layout className='index animated fadeIn'></Layout>
    }
}

export default Index
