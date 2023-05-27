import Plot from 'react-plotly.js';

const PlotP = ({
  dataArr,
  selectedPatients,
  currentIteration,
  storeSelections,
  gridLayout,
  allSelections,
}) => {
  return (
    <Plot
      data={dataArr}
      layout={{
        title: `Caracterizar \n${selectedPatients[currentIteration].col1}`,
        autosize: true,
        grid: gridLayout,
        shapes: allSelections
           ? allSelections.flatMap((x) =>
               x.selections
                 ? { ...x.selections[0], line: { dash: "solid" } }
                 : []
             )
           : undefined
      }}
      config={{ scrollZoom: true, displaylogo: false }}
      useResizeHandler
      style={{ height: '100%', width: '100%' }}
      onSelected={(selectedWindow) => storeSelections(selectedWindow)}
    />
  );
};

export default PlotP;
