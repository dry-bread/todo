import React, { useState } from 'react';
import './App.css';
import "antd/dist/antd.css";
import { Form, Input, Button, DatePicker, Select, InputNumber, Modal, Spin } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import addMoreEventLogo from './addMoreEventLogo.svg';
import { v4 as uuidv4 } from 'uuid';

moment.locale('zh-cn');
const { Option } = Select;
const { TextArea } = Input;

const NewEvent = ({ addTasks }) => {
    const [startTime, setStartTime] = useState(moment());
    const [clickState, setClickState] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const onFinish = values => {
        values.id = uuidv4();
        setConfirmLoading(true);
        const promiseStore = new Promise((resolve, reject) => {
            addTasks(values);
            resolve();
        });
        promiseStore.then((suc) => {
            setClickState(false);
            setConfirmLoading(false);
            form.resetFields();
        }, (err) => {
            console.log(err);
            alert('Fail');
        });
    };
    const onFinishFailed = errorInfo => {
        alert("Failed : " + errorInfo);
    };
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    }
    const tailLayout = {
        wrapperCol: { offset: 18, span: 16 },
    }
    function disableStartTime(current) {
        return current && moment(current).isBefore(moment(), 'days');

    }
    function disableEndTime(endTime) {
        return endTime && moment(endTime).isBefore(startTime, 'days');

    }
    function handleOk() {
        setConfirmLoading(true);
        setTimeout(() => {
            setClickState(false);
            setConfirmLoading(false);
        }, 1000);
    }

    function handleCancle() {
        setClickState(false);
    }
    function startDrag(ev) {

    }
    return (
        <div>
            <img src={addMoreEventLogo}
                draggable
                className="AddMoreEvent-logo"
                alt="点此添加事件"
                title="添加事件"
                onClick={() => setClickState(!clickState)}
                style={
                    clickState ? ({ transform: 'rotate(45deg)', }) : ({ transform: 'rotate(0deg)', })
                }
            />
            <Modal
                title='添加新事件'
                visible={clickState}
                onOk={handleOk}
                onCancel={handleCancle}
                footer={null}

            >
                <Spin tip="上传中" spinning={confirmLoading}>
                    <Form
                        {...layout}
                        name="NewEventInfo"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        form={form}
                    >
                        <Form.Item
                            label="标题"
                            name="eventTitle"
                            rules={[{ required: true, message: "请输入事件标题" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="开始时间"
                            name="eventStartTime"
                            rules={[{ required: true, message: "请输入事件开始时间" }]}
                        >
                            <DatePicker disabledDate={disableStartTime} value={startTime}
                                onChange={(theStartTime) => setStartTime(theStartTime)} showToday={true} />
                        </Form.Item>
                        <Form.Item
                            label="事件类型"
                            name="eventType"
                            rules={[{ required: true, message: "请选择事件类型" }]}
                        >
                            <Select
                                placeholder="选择事件类型"
                            >
                                <Option value="shortTermTask">短期任务</Option>
                                <Option value="longTermPlan">长期计划</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.eventType !== currentValues.eventType}
                        >
                            {({ getFieldValue }) => {
                                return getFieldValue('eventType') === 'shortTermTask' ? (
                                    <Form.Item
                                        label="结束时间"
                                        name="eventEndTime"
                                        rules={[{ required: true, message: '请填写截止日期与时间' }]}>
                                        <DatePicker showTime disabledDate={disableEndTime} />
                                    </Form.Item>
                                ) : null;
                            }}
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.eventType !== currentValues.eventType}
                        >
                            {
                                ({ getFieldValue }) => {
                                    return getFieldValue('eventType') === 'shortTermTask' ? (
                                        <Form.Item
                                            label="预估所需时长"
                                            name="eventDuration"
                                            rules={[{ required: false }]}
                                        >
                                            <InputNumber min={0} step={0.5} defaultValue={2} />
                                        </Form.Item>
                                    ) : null;
                                }
                            }
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.eventType !== currentValues.eventType}>
                            {
                                ({ getFieldValue }) => {
                                    return getFieldValue('eventType') === 'longTermPlan' ? (
                                        <Form.Item
                                            label="打卡周期"
                                            name="eventPeriod"
                                            rules={[{ required: true }]}
                                        >
                                            <Select
                                                placeholder="每天/每周/每月"
                                            >
                                                <Option value="everyDay">每天</Option>
                                                <Option value="everyWeek">每周</Option>
                                                <Option value="everyMonth">每月</Option>
                                            </Select>
                                        </Form.Item>
                                    ) : null;
                                }
                            }
                        </Form.Item>

                        <Form.Item
                            label="备注"
                            name="eventNote"
                            rules={[{ required: false, }]}>
                            <TextArea rows={2} />
                        </Form.Item>
                        <Form.Item {...tailLayout} >
                            <Button type="primary" htmlType="submit">
                                完成
                </Button>

                        </Form.Item>
                    </Form>

                </Spin>

            </Modal>
        </div>

    );

}
export default NewEvent;