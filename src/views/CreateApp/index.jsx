import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Checkbox, Form, Input } from 'antd'
import Generator from 'fr-generator'
import 'antd/dist/antd.css'
import './index.scss'

const AppInfomation = props => {
    const { TextArea } = Input
    const save = values => {
        props.submit(values)
    }
    const failed = errorInfo => {
        console.log('Failed:', errorInfo)
    }
    return (
        <div className='app-info-container'>
            <p>创建您的Application</p>
            <Form
                name='basic'
                className='app-info-form'
                labelCol={{
                    span: 5
                }}
                wrapperCol={{
                    span: 16
                }}
                onFinish={save}
                onFinishFailed={failed}
                autoComplete='off'>
                <Form.Item
                    label='应用名称'
                    name='appName'
                    rules={[
                        {
                            required: true,
                            message: '请输入应用名称!'
                        }
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label='应用id'
                    name='appId'
                    rules={[
                        {
                            required: true,
                            message: '请输入应用id!'
                        }
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label='创建人'
                    name='creator'
                    rules={[
                        {
                            required: true,
                            message: '请输入创建人!'
                        }
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label='应用描述'
                    name='desc'
                    rules={[
                        {
                            required: false,
                            message: '请输入应用描述!'
                        }
                    ]}>
                    <TextArea rows={4} placeholder='请输入详细描述' />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16
                    }}>
                    <Button type='primary' htmlType='submit'>
                        创建应用
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const CreateApp = () => {
    const { from, pathname } = useLocation()
    const [app, setApp] = useState(false)
    // Generator的props
    // defaultValue,
    // canDrag,
    // canDelete,
    // submit,
    // transformer: _transformer,
    // extraButtons,
    // controlButtons,
    // preview: _preview,
    // hideId,
    // getId = defaultGetId,
    // settings,
    // commonSettings,
    // globalSettings,
    // widgets = {},
    // mapping = {},
    // validation = true,
    // children,
    // fieldRender,
    // fieldWrapperRender,
    // elementRender,
    const genRef = useRef()
    const defaultValue = {
        type: 'object',
        properties: {
            inputName: {
                title: '简单输入框',
                type: 'string'
            }
        }
    }
    const defaultSettings = [
        {
            title: '基础组件',
            widgets: [
                {
                    text: '输入框',
                    name: 'input',
                    schema: {
                        title: '输入框',
                        type: 'string'
                    },
                    setting: {
                        props: {
                            title: '选项',
                            type: 'object',
                            labelWidth: 80,
                            properties: {
                                allowClear: {
                                    title: '是否带清除按钮',
                                    description: '填写内容后才会出现x哦',
                                    type: 'boolean'
                                },
                                addonBefore: {
                                    title: '前tab',
                                    type: 'string'
                                },
                                addonAfter: {
                                    title: '后tab',
                                    type: 'string'
                                },
                                prefix: {
                                    title: '前缀',
                                    type: 'string'
                                },
                                suffix: {
                                    title: '后缀',
                                    type: 'string'
                                }
                            }
                        },
                        minLength: {
                            title: '最短字数',
                            type: 'number'
                        },
                        maxLength: {
                            title: '最长字数',
                            type: 'number'
                        },
                        pattern: {
                            title: '校验正则表达式',
                            type: 'string',
                            props: {
                                placeholder: '填写正则表达式'
                            }
                        }
                    }
                }
            ],
            show: true,
            useCommon: true // TODO: 是否将common
        }
    ]
    const globalSettings = {
        type: 'object',
        properties: {
            column: {
                title: '整体布局',
                type: 'number',
                enum: [1, 2, 3],
                enumNames: ['一行一列', '一行二列', '一行三列'],
                props: {
                    placeholder: '默认一行一列'
                }
            },
            labelWidth: {
                title: '标签宽度',
                type: 'number',
                widget: 'slider',
                max: 300,
                default: 120,
                props: {
                    hideNumber: true
                }
            },
            displayType: {
                title: '标签展示模式',
                type: 'string',
                default: 'row',
                enum: ['row', 'column'],
                enumNames: ['同行', '单独一行'],
                widget: 'radio'
            }
        }
    }
    const commonSettings = {
        $id: {
            title: 'ID',
            description: '字段名称/英文',
            type: 'string',
            widget: 'idInput',
            require: true,
            rules: [
                {
                    pattern: '^#/.+$',
                    message: 'ID 必填'
                }
            ]
        },
        title: {
            title: '标题',
            type: 'string',
            widget: 'htmlInput'
        }
    }

    // 获取生成器最后的结果
    const getAppFromData = () => {
        const value = genRef.current && genRef.current.getValue()
        console.log('------数据：value', value)
    }

    // 配置canvas上的保存按钮
    const extraButtons = [
        {
            text: '数据源',
            onClick: event => {
                getAppFromData()
            }
        },
        {
            text: '保存',
            onClick: event => {
                getAppFromData()
            }
        }
    ]

    const submitApp = values => {
        const { appName, appId } = values
        const apps = JSON.parse(sessionStorage.getItem('app') || '[]')
        apps.push(values)
        sessionStorage.setItem('app', JSON.stringify(apps))
        setApp(true)
    }
    return (
        <div style={{ height: '85vh', background: '#fff' }}>
            {app ? (
                <Generator
                    ref={genRef}
                    defaultValue={defaultValue}
                    extraButtons={extraButtons}
                    settings={defaultSettings}
                    globalSettings={globalSettings}
                    commonSettings={commonSettings}
                />
            ) : (
                <AppInfomation submit={submitApp} />
            )}
        </div>
    )
}

export default CreateApp
