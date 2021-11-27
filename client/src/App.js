import React from 'react';
import './App.css';
import { Table, Alert } from 'antd';

export default class App extends React.Component {
  state = {
    data: [],
    pagination: { current: 1,
      pageSize: 25,
      showSizeChanger:false
    },
    loading: true,
    error: false
  };

  componentDidMount() {
    fetch('/v1/tickets')
      .then(response => response.json())
      .then(data => {
        if(data.tickets.length === 0 || data.tickets[0]== null) {
          this.setState({
            loading: false,
            data: [],
            error:true,
            pagination: {
              pageSize: 25,
              total: 0,
              showSizeChanger:false,
              position: ['topRight', 'bottomRight']
              // 200 is mock data, you should read it from server
              // total: data.totalCount,
            },
          })
        } else {
          this.setState({
            loading: false,
            data: data.tickets,
            pagination: {
              pageSize: 25,
              total: data.tickets.length,
              showSizeChanger:false,
              position: ['topRight', 'bottomRight']
              // 200 is mock data, you should read it from server
              // total: data.totalCount,
            },
          })
        }
        
      })
      .catch(err => {
        this.setState({
          loading: false,
          data: [],
          error:true,
          pagination: {
            pageSize: 25,
            total: 0,
            showSizeChanger:false,
            position: ['topRight', 'bottomRight']
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        })
      })
  }

  render() {
    const { data, pagination, loading, error} = this.state;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: 'Subject',
        dataIndex: 'raw_subject',
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'Created At',
        dataIndex: 'created_at'
      }
    ]

    return (
      <div className="App">
          Zendesk Api Challenge
          {error && <Alert type="error" message="Error Fetching Data" banner />}
          <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
            loading={loading}
          />
      </div>
    );
  }
}

