import Plot from 'react-plotly.js';

const GraficaDeSensores = ({ dataArr, gridLayout }) => {
  return (
    <Plot
      data={dataArr}
      layout={{
        title: `Señales`,
        autosize: true,
        grid: gridLayout,
      }}
      config={{ scrollZoom: true, displaylogo: false }}
      useResizeHandler
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default GraficaDeSensores;
