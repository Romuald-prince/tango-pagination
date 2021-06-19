import React, { Component } from "react";

import Pagination from "./Pagination";

//bootstrap
import { Col, Row, Button, Table } from "react-bootstrap";

class SmartTable extends Component {
  state = {
    curruntPage: 1,
    pageSizes:[10,25,50]
   };

  componentDidMount() {
    this.props.fetchData(this.props.page, this.props.pageSize);
  }

  renderColumn() {
    let self = this;
    let columns = self.props.columns;
    if (columns && columns.length) {
      return columns.map((column, i) => <th key={i}>{column.name}</th>);
    }
  }

  renderBody() {
    let self = this;

    let data = self.props.data;
    let columns = self.props.columns;
    if (columns && data && data.length>0 && columns.length) {
      return data.map((item, i) => (
        <tr key={i}>
          {columns.map((column, ic) => (
            <td key={ic}>{column.cell(item)}</td>
          ))}
        </tr>
      ));
    }
  }

  pageOnChange = (page) => {
    let self = this;
    let size = this.props.size;

    // let pagination = self.props.pagination;
    // pagination.page = page;
    // self.props.actions.setPagination(pagination);
    self.props.fetchData(page, size);
  }

  handleSize(e) {
    let value = e.target.value;
    let self = this;
    let size = value ? value : 10;
    let page = self.props.page;
    // let pagination = self.props.pagination;
    // pagination.size = value? value : 10;
    // self.props.actions.setPagination(pagination);
    self.props.fetchData(1, size);
    
  }

  render() {
    let pagination = this.props.pagination;
    return (
      <div className="col">
        <Col>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>{this.renderColumn()}</tr>
            </thead>
            <tbody>{this.renderBody()}</tbody>
          </Table>
        </Col>

        <Col>
          <Row  className="d-flex justify-content-center">
          <Pagination
              total={this.props.total}
              pageSize={this.props.size}
              page={this.props.page}
              listener={this.pageOnChange}
            />
            {/* <Pagination
              current={this.state.curruntPage}
              total={pagination.total}
              pageSize={pagination.size}
              current={pagination.page}
              showSizeChanger
              onChange={(e) => this.pageOnChange(e)}
            /> */}
            <select className="pageSize" onChange={(e)=>this.handleSize(e)}>
              {
                this.state.pageSizes.map((item,i) =>(
                  <option key={i} value={item}>{item}</option>
                ))
              }
              
            </select>
          </Row>
        </Col>
      </div>
    );
  }
}

export default SmartTable;
