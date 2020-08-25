import { List, Drawer, Button, Form, Spin, Input, DatePicker, Select, InputNumber, Row, Col, Popconfirm} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import React, { useState, useForm } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
const { Option } = Select;
const { TextArea } = Input;

const ShowTasks = ({ allTasks,removeTask,changeTask }) => {
    const [startTime, setStartTime] = useState(moment());
    const [theTask, setTheTask] = useState({});
    const [showDrawer, setShowDrawer] = useState(false);
    const [changing, setChanging] = useState(false);
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    }
    const tailLayout = {
        wrapperCol: { offset: 18, span: 16 },
    }
    function onFinish(values) {
        values.id=theTask.id;
        setChanging(true);
        const promiseStore = new Promise((resolve, reject) => {
            changeTask(values);
            resolve();
        });
        promiseStore.then((suc) => {
            setChanging(false);
            setShowDrawer(false);
        }, (err) => {
            console.log(err);
            alert('Fail');
        });

    }
    function onFinishFailed() {

    }
    function disableStartTime(current) {
        return current && moment(current).isBefore(moment(), 'days');

    }
    function disableEndTime(endTime) {
        return endTime && moment(endTime).isBefore(startTime, 'days');

    }
    function confirm(e) {
        alert(JSON.stringify(theTask));
        removeTask(theTask);
        setShowDrawer(false);
      }
      
      function cancel(e) {
      }
    return (
        <>
            <InfiniteScroll
            >
                <List
                    style={{ padding: '10px 0' }}
                    header='所有任务'
                    locale={{ emptyText: '无任务' }}
                    dataSource={allTasks}
                    renderItem={item => (
                        <List.Item
                        key={item.id}
                            style={{ backgroundColor: '#F0FFFF' }}
                            actions={[
                                <EditOutlined key='edit' onClick={() => { setShowDrawer(true); setTheTask(item); }} />,
                            ]}
                        >
                            <List.Item.Meta
                                title={item.eventTitle}

                            ></List.Item.Meta>
                        </List.Item>
                    )}

                />


            </InfiniteScroll>
            <Drawer
                width={400}
                placement="right"
                closable={false}
                visible={showDrawer}
                onClose={() => { setShowDrawer(false) }}
                title={<Row>
                    <Col span={11} style={{ fontSize: 'large' }}>{theTask.eventTitle}</Col>
                    <Popconfirm
                    title="确定删除该事项吗?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="删除"
                    cancelText="取消">
                        <Col offset={10} style={{ fontSize: 'small' }}><a style={{ textAlign: 'right' }}>删除</a></Col>
                    </Popconfirm>
                </Row>}

            >


                <Spin
                    tip='更改中'
                    spinning={changing}
                >

                    <Form
                        {...layout}
                        name="taskChange"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        form={form}
                    >
                        <Form.Item
                            label="标题"
                            name="eventTitle"

                        >
                            <Input defaultValue={theTask.eventTitle} />
                        </Form.Item>
                        <Form.Item
                            label="开始时间"
                            name="eventStartTime"
                        >
                            <DatePicker
                                disabledDate={disableStartTime}
                                value={startTime}
                                defaultValue={moment(theTask.eventStartTime)}
                                onChange={(theStartTime) => setStartTime(theStartTime)}
                                showToday={true} />
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.eventType !== currentValues.eventType}
                        >
                            {() => {
                                return theTask.eventType === 'shortTermTask' ? (
                                    <Form.Item
                                        label="结束时间"
                                        name="eventEndTime"
                                    >
                                        <DatePicker
                                            defaultValue={moment(theTask.eventEndTime)}
                                            showTime
                                            disabledDate={disableEndTime} />
                                    </Form.Item>
                                ) : (<Form.Item
                                    label="打卡周期"
                                    name="eventPeriod"

                                >
                                    <Select
                                        placeholder="每天/每周/每月"
                                        defaultValue={theTask.eventPeriod}

                                    >
                                        <Option value="everyDay">每天</Option>
                                        <Option value="everyWeek">每周</Option>
                                        <Option value="everyMonth">每月</Option>
                                    </Select>
                                </Form.Item>);
                            }}
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.eventType !== currentValues.eventType}
                        >
                            {
                                () => {
                                    return theTask.eventType === 'shortTermTask' ? (
                                        <Form.Item
                                            label="预估所需时长"
                                            name="eventDuration"

                                        >
                                            <InputNumber min={0} step={0.5} defaultValue={theTask.eventDuration} />
                                        </Form.Item>
                                    ) : null;
                                }
                            }
                        </Form.Item>
                        <Form.Item
                            label="备注"
                            name="eventNote"
                        >
                            <Input defaultValue={theTask.eventNote} />
                        </Form.Item>
                        <Form.Item  {...tailLayout}>
                            <Button type="primary" htmlType="submit">完成 </Button>
                        </Form.Item>
                    </Form>

                </Spin>

            </Drawer>
        </>);

}

export default ShowTasks;