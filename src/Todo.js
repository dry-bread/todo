import NewEvent from './NewEvent'
import TodayTask from './TodayTask';
import ShowTasks from './ShowTasks';
import { UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Layout, Calendar, Badge, Popover, Card, List, Statistic } from 'antd';
import './App.css';
import "antd/dist/antd.css";
import 'moment/locale/zh-cn';
import moment from 'moment';

const { Header, Footer, Sider, Content } = Layout;

const Todo = () => {
    const [headerTip, setHeaderTip] = useState('今日待办');
    const [allTasks, setAllTasks] = useState(getAllImfo());
    const [deadlines, setDeadlines] = useState(getDeadlinesTask(getAllImfo()));
    const [punchTimes, setPunchTimes] = useState(getPunchTimes(getAllImfo()));
    const [todayAllTasks, setTodayAllTasks] = useState(findTodayTasks(getAllImfo()));
    const [futureTasks, setFutureTasks] = useState(findFutureTasks(getAllImfo()));

    function getDeadlinesTask(tasks) {
        let short = [];
        tasks.forEach(function (item, index, arr) {
            if (item.eventType === 'shortTermTask') {
                short.push(item);
            }
        });
        return short;


    }
    function getAllImfo() {
        if (localStorage.getItem('tasks') != null)
            return JSON.parse(localStorage.getItem('tasks'));
        else
            return [];
    }
    function priority(tasks) {
        let short = [];
        let long = [];
        tasks.forEach(function (item, index, arr) {
            if (item.eventType === 'shortTermTask') {
                short.push(item);
            }
            else {
                if (!item.lastTime || moment(item.lastTime).isBefore(moment(), 'days')) { long.push(item); }
            }
        });
        short.sort((value1, value2) => {
            if (moment(value1.eventEndTime).subtract(value1.eventDuration, 'hours').isAfter(moment(value2.eventEndTime).subtract(value2.eventDuration, 'hours'))) {
                return -1;
            } else return 1;
        });
        long.sort((value1, value2) => {
            if (value1.eventPeriod !== value2.eventPeriod) {
                if (value2.eventPeriod === 'everyDay') { return -1; }
                else {
                    if (value2.eventPeriod === 'everyMonth') { return 1; }
                    else {
                        if (value1.eventPeriod === 'everyMonth') { return -1; }
                        else return 1;
                    }
                }

            } else {
                return 1;
            }
        });
        return short.concat(long);

    }
    function findTodayTasks(allTheTasks) {
        let todayTasks = [];
        let fuTask = [];
        for (let i = 0; i < allTheTasks.length; i++) {
            if (moment(allTheTasks[i].eventStartTime).isSameOrBefore(moment(), 'days')) {
                todayTasks.push(allTheTasks[i]);
            } else {
                fuTask.push(allTheTasks[i]);
            }
        }
        return priority(todayTasks);
    }
    function findFutureTasks(allTheTasks) {
        let fuTasks = [];
        for (let i = 0; i < allTheTasks.length; i++) {
            if (moment(allTheTasks[i].eventStartTime).isAfter(moment(), 'days')) {
                fuTasks.push(allTheTasks[i]);
            }
        }
        return fuTasks;
    }

    function addTask(task) {
        localStorage.setItem('tasks', JSON.stringify([...allTasks, task]));
        setAllTasks([...allTasks, task]);
        setTodayAllTasks(findTodayTasks([...allTasks, task]));
        setDeadlines(getDeadlinesTask([...allTasks, task]));

    }

    function diff(obj1, obj2) {
        if (obj1.id === obj2.id) {
            return true;
        }
        else {
            return false;
        }
        // var o1 = obj1 instanceof Object;
        // var o2 = obj2 instanceof Object;
        // if (!o1 || !o2) {/*  判断不是对象  */
        //     return obj1 === obj2;
        // }

        // if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        //     return false;
        //     //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
        // }

        // for (var attr in obj1) {
        //     var t1 = obj1[attr] instanceof Object;
        //     var t2 = obj2[attr] instanceof Object;
        //     if (t1 && t2) {
        //         return diff(obj1[attr], obj2[attr]);
        //     } else if (obj1[attr] !== obj2[attr]) {
        //         return false;
        //     }
        // }
        // return true;
    }
    function removeTask(theEvent) {
        let tallTasks_copy = todayAllTasks.slice();
        tallTasks_copy.forEach(function (item, index, arr) {
            if (diff(item, theEvent)) {
                arr.splice(index, 1);
            }
        });
        setTodayAllTasks(tallTasks_copy);
        setAllTasks(tallTasks_copy.concat(futureTasks));
        setDeadlines(getDeadlinesTask(tallTasks_copy.concat(futureTasks)));
        setPunchTimes(getPunchTimes(tallTasks_copy.concat(futureTasks)))
        localStorage.removeItem('tasks');
        localStorage.setItem('tasks', JSON.stringify(tallTasks_copy.concat(futureTasks)));

    }
    function punchCard(theEvent) {
        let tallTasks_copy = allTasks.slice();
        for(let i=0;i<tallTasks_copy.length;i++){
            if (diff(tallTasks_copy[i], theEvent)) {
                tallTasks_copy[i].times ? tallTasks_copy[i].times++ : tallTasks_copy[i].times = 1;
                tallTasks_copy[i].lastTime = moment();
                alert(tallTasks_copy[i].times);
            }
        };
        setTodayAllTasks(findTodayTasks(tallTasks_copy));
        setAllTasks(tallTasks_copy);
        setPunchTimes(getPunchTimes(tallTasks_copy));
        localStorage.removeItem('tasks');
        localStorage.setItem('tasks', JSON.stringify(tallTasks_copy));

    }
    function changeTask(task) {
        let allTasks_copy = allTasks.slice();
        for (let i = 0; i < allTasks_copy.length; i++) {
            if (diff(task, allTasks_copy[i])) {
                let temp = Object.keys(task);
                for (let m = 0; m < temp.length; m++) {
                    if ((task[temp[m]] !== undefined) && (temp[m] !== 'id')) {
                        (allTasks_copy[i])[temp[m]] = task[temp[m]];
                    }
                }
                break;
            }
        }
        setAllTasks(allTasks_copy);
        setTodayAllTasks(findTodayTasks(allTasks_copy));
        setFutureTasks(findFutureTasks(allTasks_copy));
        setDeadlines(getDeadlinesTask(allTasks_copy));
        localStorage.removeItem('tasks');
        localStorage.setItem('tasks', JSON.stringify(allTasks_copy));

    }
    function getPunchTimes(tasks) {
        let task_copy = tasks;
        let result = [];
        task_copy.forEach((item) => {
            if (item.eventType === 'longTermPlan') {
                if (!item.times) 
                { item.times = 0; }
                result.push(item);
            }
        });
        return result;
    }
    function markCalendar(current) {
        let list = [];
        for (let i = 0; i < deadlines.length; i++) {
            if (moment(current).isSame(deadlines[i].eventEndTime, 'days')) {
                list.push(deadlines[i]);
            }
        }
        return (<div>
            {list.map(item => (
                <Popover content={item.eventNote} title={item.eventTitle}><Badge color='red'></Badge></Popover>
            ))}
        </div>);


    }

    return (
        <div >



            <Layout>

                <Header style={{ color: 'white', height: '10vh', backgroundColor: '#191970' }} >{headerTip}</Header>
                <Layout>
                    <Sider style={{ color: 'white', backgroundColor: '#B0C4DE', padding: '0 10px' }} width={250}>
                        <ShowTasks allTasks={allTasks} removeTask={removeTask} changeTask={changeTask} />
                    </Sider>
                    <Content style={{ height: '90vh', width: '80vw' }}>
                        <TodayTask todayAllTasks={todayAllTasks} removeTask={removeTask} punchCard={punchCard} />
                    </Content>
                    <Sider style={{ color: 'white', backgroundColor: '#B0C4DE', padding: '0 10px' }} width={400}>
                        <Calendar
                            style={{ margin: '10px 0' }}
                            fullscreen={false}
                            disabledDate={(current) => { return current && current.isBefore(moment(), 'days') }}
                            dateCellRender={markCalendar}
                        />
                        <ShowPunchTimes punchTimes={punchTimes}/>



                    </Sider>


                </Layout>
                <Footer >曼婷制作</Footer>
            </Layout>

            <NewEvent addTasks={addTask} />
        </div>
    );
}

const ShowPunchTimes=({punchTimes})=>{
    function helpPer(t) {
        if (t === 'everyDay') 
        return '今日';
        if (t === 'everyWeek') 
        return '本周';
        if (t === 'everyMonth') 
        return '本月';
        return '已打卡';
    }
    const gridStyle = {
        width: '25%',
        textAlign: 'center',
        backgroundColor:'white'
      };
    return (
        <List
        dataSource={punchTimes}
        renderItem={(item) => (
            <Card.Grid
            style={gridStyle}
                title={item.eventTitle}
            >
                <p>{item.eventTitle}</p>
                <Statistic
                
                    title={helpPer(item.eventPeriod)}
                    value={item.times}
                    valueStyle={{ color: '#3f8600' }}
                    suffix='次'
                />

            </Card.Grid>
        )

        } />
    );
}
export default Todo