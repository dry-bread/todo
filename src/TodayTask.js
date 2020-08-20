import React, { useState } from 'react';
import "antd/dist/antd.css";
import { Card,List} from 'antd'
import { getFileItem } from 'antd/lib/upload/utils';

const CardList=({tasks})=>(
    <List 
    grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
    dataSource={tasks}
    header={`${tasks.length} 个任务`}
    itemLayout="horizontal"
renderItem={props =><Card title={props.eventTitle}><p>{props.eventNote}</p></Card>}
    />
);

const TodayTask=()=>{

    function getAllImfo(){
        var tempTask=[];
        for(let i=0;i<localStorage.length;i++){
            let tempTag=localStorage.key(i);
            tempTask.push(JSON.parse(localStorage.getItem(tempTag)));
        }
        return tempTask;
    }  
    return (
        <div>
            { <CardList tasks={getAllImfo()} />}
        </div>
        
    );

};

export default TodayTask;