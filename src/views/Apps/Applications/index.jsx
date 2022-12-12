import React, { useRef, useState, useEffect } from 'react'
import { EditOutlined, DeleteOutlined, FileDoneOutlined } from '@ant-design/icons'
import { Space, Card, Skeleton, Switch } from 'antd'
import './index.scss'

const Applications = props => {
    const { Meta } = Card

    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const apps = JSON.parse(sessionStorage.getItem('app') || '[]')
        setApplications(apps)
        setLoading(false)
    }, [])

    const linkTo = url => {
        props.history.push(url)
    }

    return (
        <>
            <Space>
                {applications &&
                    applications.map(app => {
                        return (
                            <div key={app.appId} className='site-card-border-less-wrapper'>
                                <Card
                                    title={app.appName}
                                    style={{ width: 300, marginTop: 16 }}
                                    actions={[
                                        <FileDoneOutlined
                                            onClick={() => {
                                                linkTo('/apps/applications?type=edit')
                                            }}
                                        />,
                                        <EditOutlined
                                            key='edit'
                                            onClick={() => {
                                                linkTo('/apps/applications?type=edit')
                                            }}
                                        />,
                                        <DeleteOutlined />
                                    ]}>
                                    <Skeleton loading={loading} avatar active>
                                        <p>应用Id：{app.appId}</p>
                                        <p>创建人：{app.creator}</p>
                                        <p>应用简介：{app.desc}</p>
                                    </Skeleton>
                                </Card>
                            </div>
                        )
                    })}
            </Space>
        </>
    )
}

export default Applications
