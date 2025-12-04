import { Button, Select, Row, Col,Table  } from "antd";
import React, { useMemo, useState, useRef, Fragment } from "react";
import { ExpandInfo, getOptions, getPivotData } from "./Constant";

import _  from 'lodash';



const About = () => {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragChildItem = useRef();
  const [list, setList] = useState(getOptions()?.map(item => item.value));
  const [rowList, setRowList] = useState([]);
  const [columnList, setColumnList] = useState([]);
  const [valueList, setValueList] = useState([]);
  const [selectedKey, setSelectedKey] = useState('');
  const [dragOverRow, setDragOverRow] = useState('');
  const [onDrag, setOnDrag] = useState('');
  const [expended, setExpended] = useState('')

  const reset = () => {
    setList(getOptions()?.map(item => item.value));
    setRowList([]);
    setColumnList([]);
    setValueList([]);
  }

  const dragStart = (e, position, onDrag) => {
    dragItem.current = position;

    setTimeout(() => {
      setSelectedKey(dragItem.current);
    }, 0)
    
    setOnDrag(onDrag);
  };

  const dragChildEnter = (e, position, onDrag) => {
    dragChildItem.current = {position, onDrag};
  };

  const dragChildOverEnter = (e, position, onDrag) => {
    // e.stopPropagation();
    console.log(onDrag, selectedKey, position);
    if(onDrag==='all' && selectedKey !== position){
      const listU = list?.filter(item=> item !== selectedKey);
      const index = listU?.findIndex(item => item === position);

      if(index!== -1){
        listU.splice(index, 0, selectedKey)
        setList([... new Set([...listU])]);
        setRowList(rowList?.filter(item=> item !== selectedKey));
      }
    }

    if(onDrag==='row' && selectedKey !== position){
      const listU = rowList?.filter(item=> item !== selectedKey);
      const index = listU?.findIndex(item => item === position);
      if(index!== -1){
        listU.splice(index, 0, selectedKey);
        setRowList([... new Set([...listU])]);
        setColumnList(columnList?.filter(item=> item !== selectedKey));
      }
    }

    if(onDrag==='column' && selectedKey !== position){
      const listU = columnList?.filter(item=> item !== selectedKey);
      const index = listU?.findIndex(item => item === position);
      if(index!== -1){
        listU.splice(index, 0, selectedKey);
        setColumnList([... new Set([...listU])]);
        setRowList(rowList?.filter(item=> item !== selectedKey));
      }
    }

    if(onDrag==='value' && selectedKey !== position){
      const listU = valueList?.filter(item=> item !== selectedKey);
      const index = listU?.findIndex(item => item === position);
      if(index!== -1){
        listU.splice(index, 0, selectedKey);
        setValueList([... new Set([...listU])]);
      }
    }
  };

  const childDrop = (e) => {
    console.log("dragChildOverEnter");
    // if(onDrag==='all' && selectedKey !== dragChildItem.current?.position){
    //   const listU = list?.filter(item=> item !== selectedKey);
    //   const index = listU?.findIndex(item => item === dragChildItem.current?.position);
    //   if(index!== -1){
    //     listU.splice((index+1), 0, selectedKey);
    //     setList([... new Set([...listU])]);
    //   }
    // }
    // if(onDrag==='row' && selectedKey !== dragChildItem.current?.position){
    //   const listU = rowList?.filter(item=> item !== selectedKey);
    //   const index = listU?.findIndex(item => item === dragChildItem.current?.position);
    //   if(index!== -1){
    //     listU.splice((index+1), 0, selectedKey);
    //     setRowList([... new Set([...listU])]);
    //   }
    // }

    // if(onDrag==='column' && selectedKey !== dragChildItem.current?.position){
    //   const listU = columnList?.filter(item=> item !== selectedKey);
    //   const index = listU?.findIndex(item => item === dragChildItem.current?.position);
    //   if(index!== -1){
    //     listU.splice((index+1), 0, selectedKey);
    //     setColumnList([... new Set([...listU])]);
    //     setRowList(rowList?.filter(item=> item !== selectedKey));
    //   }
    // }

    // if(onDrag==='value' && selectedKey !== dragChildItem.current?.position){
    //   const listU = valueList?.filter(item=> item !== selectedKey);
    //   const index = listU?.findIndex(item => item === dragChildItem.current?.position);
    //   if(index!== -1){
    //     listU.splice((index+1), 0, selectedKey);
    //     setValueList([... new Set([...listU])]);
    //     setColumnList(columnList?.filter(item=> item !== selectedKey));
    //   }
    // }

    // dragItem.current = null;
    // dragOverItem.current = null;
    // dragChildItem.current = null;
    setSelectedKey('');
    setDragOverRow('');
    
  }

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    setDragOverRow(position);
  };

  const drop = (e, position, parentValue) => {
    console.log("dragParentOverEnter");
    if(onDrag === 'all'){
      if(dragOverItem.current==='row'){
        setList(list?.filter(item=> item !== selectedKey));
        setRowList([
          ...new Set([...rowList, dragItem.current])
        ]);
      }

      if(dragOverItem.current==='column'){
        setRowList(rowList?.filter(item=> item !== selectedKey));
        setColumnList([
          ...new Set([...columnList, dragItem.current])
        ]);
      }

      if(dragOverItem.current==='value'){
        setColumnList(columnList?.filter(item=> item !== selectedKey));
        setValueList([
          ...new Set([...valueList, dragItem.current])
        ]);
      }

      dragOverItem.current !== 'all' && setList(list?.filter(item => item !== dragItem.current));

    } else if(onDrag === 'row'){
        if(dragOverItem.current==='all'){
          setList([
            ...new Set([...list, dragItem.current])
          ]);
          setRowList(rowList?.filter(item=> item !== selectedKey));
        }

        if(dragOverItem.current==='column'){
          setColumnList([
            ...new Set([...columnList, dragItem.current])
          ]);
        }

        if(dragOverItem.current==='value'){
          setValueList([
            ...new Set([...valueList, dragItem.current])
          ]);
        }
      
        dragOverItem.current !== 'row' && setRowList(rowList?.filter(item => item !== dragItem.current));

    } else if(onDrag === 'column'){
      if(dragOverItem.current==='all'){
        setList([
          ...new Set([...list, dragItem.current])
        ]);
        setRowList(rowList?.filter(item=> item !== selectedKey));
      }

      if(dragOverItem.current==='row'){
        setRowList([
          ...new Set([...rowList, dragItem.current])
        ]);
      }

      if(dragOverItem.current==='value'){
        setValueList([
          ...new Set([...valueList, dragItem.current])
        ]);
      }
    
      dragOverItem.current !== 'column' &&  setColumnList(columnList?.filter(item => item !== dragItem.current));
    }else if(onDrag === 'value'){
      if(dragOverItem.current==='all'){
        setList([
          ...new Set([...list, dragItem.current])
        ]);
      }

      if(dragOverItem.current==='row'){
        setRowList([
          ...new Set([...rowList, dragItem.current])
        ]);
      }

      if(dragOverItem.current==='column'){
        setColumnList([
          ...new Set([...columnList, dragItem.current])
        ]);
      }
    
      dragOverItem.current !== 'value' &&  setValueList(valueList?.filter(item => item !== dragItem.current));
    }
    console.log(dragChildItem.current);
    dragItem.current = null;
    dragOverItem.current = null;
    dragChildItem.current = null;
    setSelectedKey('');
    setDragOverRow('');
  };


  const onDragLeave = (e, position) => {
    setDragOverRow('');
  };

  const getColumns = (columnSort) => {
    const col = [];

    col.push({
      title: '',
      dataIndex: 'Country'
    });

    columnSort?.forEach(item => {
      col.push({
        title: item?.title,
        children: item?.children?.map(record => {
          return {
            title: record,
            dataIndex: `${item?.title}${record}`,
            key: record,
            width: 150
          }
        })
      })
    });

  // console.log(crypto.randomUUID());

    return col

  }
  const getColumnsDataSort = () => {
    let data = getPivotData();
    let dataSort = _(data)
    .groupBy('Country')
    .map(function(items, colName) {
      let Quarter = {};
      return {
        Country: colName,
        key: colName,
        _id: colName,
        'QuarterOld': _(items).groupBy('Quarter')
        .map(function(qData, QcolName) {
          Quarter[`${QcolName}Sold`] = _.reduce(qData, function(sum, n){
            if(sum?.Sold){
              return sum?.Sold
            }
            return sum + n?.Sold
          });
          Quarter[`${QcolName}Amount`] = _.reduce(qData, function(sum, n){
            if(sum?.Amount){
              return sum?.Amount
            }
            return sum + n?.Amount
          });
          return {
            [`${QcolName}Sold`]: _.reduce(qData, function(sum, n){
              if(sum?.Sold){
                return sum?.Sold
              }
              return sum + n?.Sold
            }),
            [`${QcolName}Amount`]: _.reduce(qData, function(sum, n){
              if(sum?.Amount){
                return sum?.Amount
              }
              return sum + n?.Amount
            })
          }
        }).value(),
        Amount: _.reduce(items, function(sum, n){
          if(sum?.Amount){
            return sum?.Amount
          }
          return sum + n?.Amount
        }),
        Sold: _.reduce(items, function(sum, n){
          if(sum?.Sold){
            return sum?.Sold
          }
          return sum + n?.Sold
        }),
        ...Quarter
        // children: items?.map(r => ({
        //   'Sold': r.Sold,
        //   'Amount': r.Amount
        // }))
      };
    }).value();

    const total =_(data)
    .groupBy('Country', function(item) {
      return `${item.Sold}`
    }).value()
    // .map(function(item, col) {
    //   return {
    //     key:'total',
    //     Country: 'Grand Total',
    //     _id: 'total',
    //     [`${col}Sold`]: item.Sold,
    //     [`${col}Amount`]: item.Amount
    //   }
    // }).value();


    let columnSort = _(data)
    .groupBy('Quarter')
    .map(function(items, colName) {
      return {
        title: colName,
        children: ['Sold', 'Amount']
      };
    }).value();


    console.log("columnSort", columnSort);
    console.log("dataSort", dataSort);

    return {columnSort,  dataSort}
  }

const {columnSort, dataSort } = getColumnsDataSort();

  return (
      <div className="pivote-table">
         <h2>Pivote Table</h2>
         <div className="reset-btn">
         <Button type="primary" danger onClick={reset}>Reset</Button>
         </div>
         
        <Row>
          <Col span={5}  id="all">
            <label>All Field</label>
            <div 
                style={dragOverRow === 'all' ? {border:'2px dashed green'} : {}}
                className='box-section'
                onDragEnter={(e) => dragEnter(e, 'all')}
                onDragLeave={(e) => onDragLeave(e, 'all')}
                onDragEnd={(e) => drop(e, 'all')}
              >
                {list.map((item, index) => {
                  return (
                    <div
                      className="value-box"
                      key={item}
                      draggable
                      onDragStart={(e) => dragStart(e, item, 'all')}
                      onDragEnter={(e) => dragChildEnter(e, item, 'all')}
                      onDragOver={(e) => dragChildOverEnter(e, item, 'all')}
                      onDragEnd={(e) => childDrop(e)}
                    >
                      <div style={selectedKey === item ? {visibility:'hidden'} : {}}>{item}</div>
                    </div>
                  )
                })}
              </div>
          </Col>
          <Col span={5} offset={1}  id="row">
            <label>Row Field</label>
            <div 
              style={dragOverRow === 'row' ? {border:'2px dashed green'} : {}}
              className='box-section'
              onDragEnter={(e) => dragEnter(e, 'row')}
              onDragLeave={(e) => onDragLeave(e, 'row')}
              onDragEnd={(e) => drop(e, 'row')}
            >
              {rowList.map((item, index) => {
                return (
                  <div  
                    className="value-box"
                    key={item}
                    draggable
                    onDragStart={(e) => dragStart(e, item, 'row')}
                    onDragEnter={(e) => dragChildEnter(e, item, 'row')}
                    onDragOver={(e) => dragChildOverEnter(e, item, 'row')}
                    onDragEnd={(e) => childDrop(e)}
                  >
                    <div style={selectedKey === item ? {visibility:'hidden'} : {}}>{item}</div>
                  </div>
                )
              })}
            </div>
          </Col>
          <Col span={5} offset={1}  id="column">
            <label>Column Field</label>
            <div 
                style={dragOverRow === 'column' ? {border:'2px dashed green'} : {}}
                className='box-section'
                onDragEnter={(e) => dragEnter(e, 'column')}
                onDragLeave={(e) => onDragLeave(e, 'column')}
                onDragEnd={(e) => drop(e, 'column')}
              >
                {columnList.map((item, index) => {
                  return (
                    <div
                      className="value-box"
                      key={item}
                      draggable
                      onDragStart={(e) => dragStart(e, item, 'column')}
                      onDragEnter={(e) => dragChildEnter(e, item, 'column')}
                      onDragOver={(e) => dragChildOverEnter(e, item, 'column')}
                      onDragEnd={(e) => childDrop(e)}
                    >
                       <div style={selectedKey === item ? { visibility:'hidden' } : {}}>{item}</div>
                    </div>
                  )
                })}
              </div>
          </Col>
          <Col span={5} offset={1}  id="value">
            <label>Value Field</label>
            <div 
                style={dragOverRow === 'value' ? {border:'2px dashed green'} : {}}
                className='box-section'
                onDragEnter={(e) => dragEnter(e, 'value')}
                onDragLeave={(e) => onDragLeave(e, 'value')}
                onDragEnd={(e) => drop(e, 'value')}
              >
                {valueList.map((item, index) => {
                  return (
                    <div
                      className="value-box"
                      key={item}
                      draggable
                      onDragStart={(e) => dragStart(e, item, 'value')}
                      onDragEnter={(e) => dragChildEnter(e, item, 'value')}
                      onDragOver={(e) => dragChildOverEnter(e, item, 'value')}
                      onDragEnd={(e) => childDrop(e)}
                    >
                       <div style={selectedKey === item ? {visibility:'hidden'} : {}}>{item}</div>
                    </div>
                  )
                })}
              </div>
          </Col>
        </Row>
      <div style={{marginTop:'50px'}}>
               
        <Table
          columns={getColumns(columnSort)}
          dataSource={dataSort}
          bordered
          size="middle"
          expandable={{
            // childrenColumnName: 'test',
            // expandedRowRender: record => <p style={{ margin: 0 }}>{JSON.stringify(record)}</p>,
            // expandIcon:(record) => <ExpandInfo record={record} setExpended={(value) => setExpended(value)} />,
            // expandedRowKeys:[expended],
            // rowExpandable: true,
          }}
          rowKey='_id'
        />
         </div>
      </div>
  )
  }

export default About;

/* useImperativeHandle Example */
// const About = () => {
//   const ref = useRef();
//   return (
//     <div>
//       <AboutChild ref={ref} />
//       <Button onClick={() => ref.current.onIncrement(1)}>ParentCount</Button>
//     </div>
//   );
// };

/* useCallback Example */

// const About = () => {
//   const [count1, setCount1] = useState(0);
//   const [count2, setCount2] = useState(0);

//   const getValue = useCallback(
//     (value) => {
//       console.log("============Called");
//       return count2 + value;
//     },
//     [count2]
//   );

//   return (
//     <>
//       <h2>useCallBack Method</h2>
//       <span>count1:{count1}</span>
//       <br />
//       <span>count2:{count2}</span>
//       <br />
//       <Button onClick={() => setCount1(count1 + 1)}>count1</Button>
//       <Button onClick={() => setCount2(count2 + 1)}>count2</Button>
//       <AboutChild getValue={getValue} />
//     </>
//   );
// };

/* useMemo Example */

// const About = () => {
//   const [count1, setCount1] = useState(0);
//   const [count2, setCount2] = useState(0);

//   const getEven = useMemo(() => {
//     console.log("Even Function Call");
//     return count1 % 2 === 0;
//   }, [count1]);

//   return (
//     <>
//       <h2>useMemo</h2>
//       <h3>count1: {count1}</h3>
//       <h3>count2: {count2}</h3>
//       {getEven ? "Even" : "odd"}
//       <Button onClick={() => setCount1(count1 + 1)}>count1</Button>
//       <Button onClick={() => setCount2(count2 + 1)}>count2</Button>
//     </>
//   );
// };
