import React from 'react'
import { List } from 'antd';
const Movies = (props) =>
{
    return(

      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={props.data}
        footer={
          <div>
            footer
          </div>
        }
        renderItem={item => (
          <List.Item
            extra={
              <img
                width={272}
                height={153}
                alt="logo"
                src={item.poster}
              />
            }
          >
            <List.Item.Meta
              title={<a href={`/${item.id}`} >{item.title}</a>}
              description={<p>{item.url}<div/>{item.rating}</p>}
            />
          </List.Item>
        )}
      />

    );
}
export default Movies;