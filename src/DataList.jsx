import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import './App.css'

function DataList() {

    const [userList, setUserList] = useState([]);

    const columns = [
        {dataField:'id', text: 'Id'},
        {dataField:'name', text: 'Name', sort: true, filter: textFilter()},
        {dataField:'tagline', text: 'Tagline', sort: true},
        {dataField:'volume.value', text: 'Volume value', sort: true},
    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        }

    })

    useEffect(() => {
      fetch('https://api.punkapi.com/v2/beers')
      .then(response => response.json())
      .then(result => setUserList(result))
      .catch(error => console.log(error));
    }, [])


    return (
    <div className='container'>
        <h2 className='title'>Reactjs API data Table</h2>
        <BootstrapTable 
        boostrap4 
        keyField='id' 
        columns={columns} 
        data={userList}
        pagination={pagination} 
        filter={filterFactory()}
        />
        {/* <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
            </tr>
            {
                userList && userList.length> 0 ?
                userList.map(usr => 
                    <tr>
                        <td>{usr.id}</td>
                        <td>{usr.name}</td>
                        <td>{usr.username}</td>
                        <td>{usr.email}</td>
                    </tr>
                    )
                    :'loading'
            }
            
        </table> */}
    </div>
    )
    
}

export default DataList;