import '../node_modules/react-resizable/css/styles.css';
import '../node_modules/react-grid-layout/css/styles.css';

//import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import GridLayout from "react-grid-layout";


function App() {

  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
    { i: "d", x: 4, y: 0, w: 1, h: 2 },
    { i: "e", x: 4, y: 0, w: 1, h: 2 },
    { i: "f", x: 4, y: 0, w: 1, h: 2 },
    { i: "g", x: 4, y: 0, w: 1, h: 2 },
    { i: "h", x: 0, y: 2, w: 4, h: 8 },

  ];

  const layout2 = [
    { i: "x", x: 0, y: 0, w: 1, h: 2 },
    { i: "z", x: 1, y: 0, w: 1, h: 2 },
  ];


  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={50}
      width={1920}
      
    >
      <div style={{ backgroundColor: "lightblue", color: "white", display: "flex", justifyContent: "center", textAlign: "center" }} key="a">a</div>
      <div style={{ backgroundColor: "lightblue", color: "white", display: "flex", justifyContent: "center", textAlign: "center" }} key="b">b</div>
      <div style={{ backgroundColor: "lightblue", color: "white", display: "flex", justifyContent: "center", textAlign: "center" }} key="c">c</div>
      <div style={{ backgroundColor: "lightblue", color: "white", display: "flex", justifyContent: "center", textAlign: "center" }} key="d">d</div>
      <div style={{ backgroundColor: "lightblue", color: "white", display: "flex", justifyContent: "center", textAlign: "center" }} key="e">e</div>
      <div style={{ backgroundColor: "lightblue", color: "white", display: "flex", justifyContent: "center", textAlign: "center" }} key="f">f</div>
      <div style={{ backgroundColor: "lightblue", color: "white", display: "flex", justifyContent: "center", textAlign: "center" }} key="g">g</div>

      <div style={{ backgroundColor: "lightblue", color: "white", display: "flex", justifyContent: "center", textAlign: "center" }} key="h">
        <GridLayout
          className="layout2"
          layout={layout2}
          cols={4}
          rowHeight={50}
          width={1920 / 12 * layout[7].w}
        >
          <div style={{ backgroundColor: "lightpink", color: "white", display: "flex", justifyContent: "center", textAlign: "center" }} key="x">x</div>
          <div style={{ backgroundColor: "lightpink", color: "white", display: "flex", justifyContent: "center", textAlign: "center" }} key="z">z</div>
        </GridLayout>
      </div>
    </GridLayout>

  );
}

export default App;
