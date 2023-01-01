import '../node_modules/react-resizable/css/styles.css';
import '../node_modules/react-grid-layout/css/styles.css';
import './main.css';

import { Responsive, WidthProvider } from "react-grid-layout";
import { useState, useEffect } from 'react';

const CustomRLG = (props) => {
    const ChildResponsiveReactGridLayout = WidthProvider(Responsive);
    const [layout, setLayout] = useState({});
    const fetchData = async () => {
      const response = await fetch("http://localhost:3004/layouts/2");
      const json = await response.json();
  
      if (response.ok) {
        setLayout(json);
      }
    }
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const updateLayout = (newLayout) => {
  
      const updateLayout = {
        ...layout,
        layout: {
          lg: [
            ...newLayout.map((item) => ({ ...item }))
          ]
        }
      };
  
      return fetch(`http://localhost:3004/layouts/2`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(updateLayout),
      }).then((response) => response.json());
    }
  
  
    return (
      <div style={{ width: "100%", height: "100%", backgroundColor: "yellow" }}>
        <ChildResponsiveReactGridLayout
          className="layout"
          breakpoints={{ lg: 1200 }}
          cols={{ lg: 12 }}
          layouts={layout.layout}
          margin={[props.margin, props.margin]}
          rowHeight={props.rowHeight}
          onResizeStop={(layout) => {
            props.minHeight(layout, props.rowHeight, props.margin);
            updateLayout(layout);
          }}
          onDragStop={(layout) => {
            props.minHeight(layout, props.rowHeight, props.margin);
            //props.setParentStatic(true);
            updateLayout(layout);
          }}
          //onDragStart={() => props.setParentStatic(false)}
        >
  
          <div className='nested-item' key={'u'} style={{ border: "1px solid red", backgroundColor: "white" }}></div>
          <div className='nested-item' key={'v'} style={{ border: "1px solid red", backgroundColor: "white" }}></div>
          <div className='nested-item' key={'w'} style={{ border: "1px solid red", backgroundColor: "white" }}></div>
          <div className='nested-item' key={'x'} style={{ border: "1px solid red", backgroundColor: "white" }}></div>
        </ChildResponsiveReactGridLayout>
      </div>
  
    )
  }

  export default CustomRLG;