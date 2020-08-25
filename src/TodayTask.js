import React, { useState } from 'react';
import "antd/dist/antd.css";
import { List, Checkbox } from 'antd';
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';

const CardList = ({ tasks,remove,punchCard }) => {
    const [allowAnimate,setAllowAnimate]=useState(false)
    function* allocationInDex(){
        var index=0;
        while(true){
            yield index++;
        }
    }
    const [indexIterator, setIterator]=useState(allocationInDex());
    const [key, setKey]=useState(0);
    return (
        
    <List
    locale={{emptyText:'今日暂无无任务'}}
        itemLayout="horizontal"
        dataSource={tasks}
        header={`${tasks.length} 个任务`}
        itemLayout="horizontal"
        renderItem={props =>
            <CSSTransition key={props.id} timeout={8000} classNames="item">
                <List.Item 
                style={{ backgroundColor: 'white', padding: '15px', marginBottom: '5px', fontSize: 'large', textAlign: 'left' }}
                actions={[
                    <Checkbox defaultChecked={false} onChange={(e)=>{
                        if(e.target.checked){ 
                            if(props.eventType==='shortTermTask')
                            {remove(props);}
                            else
                            {punchCard(props);}
                            }}}>{props.eventType==='shortTermTask' ? '完成':'打卡'}
                            </Checkbox>
                    ]}
                >
                    <List.Item.Meta
                    title={<p>{props.eventTitle}</p>}
                    description={props.eventNote}
                    >

                    </List.Item.Meta>
                        
                </List.Item>
            </CSSTransition>}
    >

    </List>


);}

const TodayTask = ({ todayAllTasks,removeTask,punchCard}) => {

    return (
        <div style={{ margin: '0 10px', padding: '0 2vw' }}>
            {<CardList tasks={todayAllTasks} remove={removeTask} punchCard={punchCard}/>}
        </div>

    );

};

export default TodayTask;