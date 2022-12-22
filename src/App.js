import '../node_modules/react-resizable/css/styles.css';
import '../node_modules/react-grid-layout/css/styles.css';

import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
//import GridLayout from "react-grid-layout";

import { Responsive, WidthProvider } from "react-grid-layout";
import { useState, useRef, useEffect } from 'react';

function App() {
  const ResponsiveReactGridLayout = WidthProvider(Responsive);

  const [layout, setLayout] = useState({});

  const initialLayout = {
    lg: [
      { i: "a", x: 0, y: 0, h: 5, w: 9 },
      { i: "b", x: 6, y: 0, h: 5, w: 6 },
      { i: "c", x: 0, y: 0, h: 4, w: 6 },
      { i: "d", x: 6, y: 0, h: 6, w: 6 }
    ],
  }

  useEffect(() => {
    setLayout(initialLayout);
  }, [])


  const rowHeight = 50;
  const margin = 20;


  const calculateH = (widthPx, colWidth, margin) => {
    let w = Math.ceil((widthPx - margin[0]) / (colWidth + margin[0]));
    return w;
  };

  const minHeight = (l, rowHeight, margin) => {
    const minHeight = ((l.reduce((partialSum, item) => partialSum + item.h, 0) * rowHeight) + ((l.length) * margin) + margin ) / rowHeight - 1;
    // https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
    // mělo by fungovat, ale nefunguje...

    setLayout((prevLayout) => ({
      lg: prevLayout.lg.map(
        el => el.i === "a"? {...el, h: minHeight}: el
      )
    }));
    
  }


  return (
    <ResponsiveReactGridLayout
      className="layout"
      breakpoints={{ lg: 1200 }}
      cols={{ lg: 12 }}
      layouts={layout}
      margin={[margin, margin]}
      rowHeight={rowHeight}
      onLayoutChange={(layout) => setLayout({ lg: [...layout] })}
      //onLayoutChange={(layout) => console.log({ lg: [...layout] })}
      useCSSTransforms={false}
    >

      <div key={'a'} style={{ border: "1px solid black", backgroundColor: "white" }}>
        <CustomRLG minHeight={minHeight} rowHeight={rowHeight} margin={margin} />
      </div>

      <div key={'b'} style={{ border: "1px solid black", backgroundColor: "white" }}></div>
      <div key={'c'} style={{ border: "1px solid black", backgroundColor: "white" }}></div>
      <div key={'d'} style={{ border: "1px solid black", backgroundColor: "white" }}></div>


    </ResponsiveReactGridLayout >
  );
}


export const CustomRLG = (props) => {
  const ChildResponsiveReactGridLayout = WidthProvider(Responsive);
  const nestedLayout = {
    lg: [
      { i: "u", x: 0, y: 0, h: 1, w: 12 },
      { i: "v", x: 0, y: 0, h: 1, w: 11 },
      { i: "w", x: 0, y: 0, h: 1, w: 6 },
      { i: "x", x: 0, y: 0, h: 2, w: 3 }
    ],
  }

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "yellow" }}>
      <ChildResponsiveReactGridLayout
        className="layout"
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        layouts={nestedLayout}
        margin={[props.margin, props.margin]}
        rowHeight={props.rowHeight}
        isBounded={true}
        onLayoutChange={(layout) => props.minHeight(layout, props.rowHeight, props.margin)}
      >

        <div key={'u'} style={{ border: "1px solid red", backgroundColor: "white" }}></div>
        <div key={'v'} style={{ border: "1px solid red", backgroundColor: "white" }}></div>
        <div key={'w'} style={{ border: "1px solid red", backgroundColor: "white" }}></div>
        <div key={'x'} style={{ border: "1px solid red", backgroundColor: "white" }}></div>
      </ChildResponsiveReactGridLayout>
    </div>

  )
}


export default App;
