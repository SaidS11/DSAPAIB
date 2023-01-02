import Plot from 'react-plotly.js';
import './ProbarSensores.css';

const ProbarSensores = () => {
  return (
    <div className="display-center">
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
          { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{ title: 'A Fancy Plot', autosize: true }}
        config={{ scrollZoom: true }}
        useResizeHandler
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
};

export default ProbarSensores;
