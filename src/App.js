import '../node_modules/react-resizable/css/styles.css';
import '../node_modules/react-grid-layout/css/styles.css';
import './main.css';

import CustomRLG from './CustomRLG';
import { Responsive, WidthProvider } from "react-grid-layout";
import { useState, useEffect } from 'react';

function App() {
  const ResponsiveReactGridLayout = WidthProvider(Responsive);
  const [layout, setLayout] = useState({});
  const [draggable, setDraggable] = useState(true);
  const fetchData = async () => {
    const response = await fetch("http://localhost:3004/layouts/1");
    const json = await response.json();

    if (response.ok) {
      setLayout(json.layout);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  const rowHeight = 50;
  const margin = 20;


  const minHeight = (l, rowHeight, margin) => {
    let height = 0
    l.map((item) => {
      if (height < item.y + item.h) {
        height = item.y + item.h
      }
    })
    const minHeight = ((height * rowHeight) + ((l.length) * margin) + margin) / rowHeight - 1
    const newLayout = layout.lg.map(item => ({ ...item }));
    newLayout[0].h = minHeight;
    newLayout[0].minH = minHeight;
    setLayout({ lg: newLayout });
  }

  const updateLayout = (newLayout) => {

    const updateLayout = {
      ...layout,
      layout: {
        lg: [
          ...newLayout.map((item) => ({ ...item }))
        ]
      }
    };

    return fetch(`http://localhost:3004/layouts/1`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(updateLayout),
    }).then((response) => response.json());
  }


  return (
    <ResponsiveReactGridLayout
      className="layout"
      breakpoints={{ lg: 1200 }}
      cols={{ lg: 12 }}
      layouts={layout}
      margin={[margin, margin]}
      rowHeight={rowHeight}
      onResizeStop={(layout) => {
        updateLayout(layout)
        setLayout({ lg: [...layout] })
      }}
      onDragStop={(layout) => {
        updateLayout(layout)
      }}
      //isDraggable={draggable}
      draggableCancel={".nested-item"}
    >

      <div key={'a'} style={{ border: "1px solid black", backgroundColor: "white" }}>
        <CustomRLG minHeight={minHeight} rowHeight={rowHeight} margin={margin} setParentStatic={(state) => setDraggable(state)} />
      </div>



      <div key={'b'} style={{ border: "1px solid black", backgroundColor: "white" }}></div>
      <div key={'c'} style={{ border: "1px solid black", backgroundColor: "white" }}></div>
      <div key={'d'} style={{ border: "1px solid black", backgroundColor: "white" }}></div>


    </ResponsiveReactGridLayout >
  );
}

export default App;
