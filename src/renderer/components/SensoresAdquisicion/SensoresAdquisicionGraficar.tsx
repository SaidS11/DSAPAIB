import Plot from "react-plotly.js";

interface SensoresAdquisicionInterface {
    gridLayout: any
    dataArr: any
}

const SensoresAdquisicionGraficar = (props: SensoresAdquisicionInterface) => {
 
    const { gridLayout, dataArr } = props;
    return (
        <Plot
        data={dataArr}
        layout={{
            title: `Graficas`,
            autosize: true,
            grid: gridLayout,
        }}
      config={{ scrollZoom: true, displaylogo: false }}
      useResizeHandler
      style={{ height: '100%', width: '100%' }}
    />
    );
  };
  
  export default SensoresAdquisicionGraficar;