import React, { Component } from 'react';
import { Column } from './column';
import { Cell } from './cell';
import "./grid.css";

export class Grid extends Component {

  renderGrid = (columnIndex) => {
    const { columns, onClick } = this.props;
    return (rowIndex) => {
      return (
      <Cell sign={ columns[columnIndex][rowIndex] } 
            onClick={ () => { onClick(columnIndex) } } 
            key={`[${columnIndex}][${rowIndex}]`}/>
      );
    }
  }

  renderColumn = (columnIndex) => {
    const columnLength = this.props.columns[0].length;
    return <Column renderCell={ this.renderGrid(columnIndex) } 
                   columnLength={columnLength} 
                   key={columnIndex} />
  }

  render() {
      const columns = [];
      
      for (let i = 0; i < this.props.columns.length; i++) {
          columns.push(this.renderColumn(i));
      };
      
      return (
          <div className="Grid">
              { columns }
          </div>
      )
  }
}