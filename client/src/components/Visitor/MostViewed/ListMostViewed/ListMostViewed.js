import React from "react";
import {List} from "antd";
import MostViewPreview from "../MostViewedPreview";

export default function ListMostViewed(props){
    const { publications } = props;
    return (
      <div>
        <Publications publications={publications} />
      </div>
    );
  }
  
  function Publications(props) {
    const { publications } = props;
    return (
      <List
        itemLayout="vertical"
        size="large"
        dataSource={publications}
        /*footer={
        }*/
        renderItem={(publication) => 
            <Publication publication={publication}/>
         }
      />
    );
  }
  
  function Publication(props) {
    const { publication } = props;
    return (
      <>
        <MostViewPreview publication={publication} />
      </>
    );
  }