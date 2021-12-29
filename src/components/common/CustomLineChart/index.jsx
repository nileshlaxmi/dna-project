import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import './index.scss';

const CustomLineChart = ({
  graphData,
  config = {},
  isTooltip = true,
  isLegend = true,
  isCartesianGrid = true,
  isReferenceLineX = false,
  isReferenceLineY = false,
}) => {
  const {
    responsiveContainer = {},
    lineChart = {},
    legends = {},
    lines = [],
    xAxis = {},
    yAxis = {},
    tooltip = {},
    cartesianGrid = {},
    referenceLineX = {},
    referenceLineY = {},
  } = config;
  if (!(graphData && graphData.length > 0)) {
    return <div>No Data</div>;
  }
  return (
    <div data-testid="custom-line-chart" className="custom-line-chart">
      <ResponsiveContainer width="100%" height={400} {...responsiveContainer}>
        <LineChart data={graphData} {...lineChart} margin={{ top: 5, right: 50, left: 5, bottom: 5 }}>
          {isCartesianGrid && (
            <CartesianGrid strokeDasharray="3 3" {...cartesianGrid} />
          )}
          <XAxis {...xAxis} />
          <YAxis {...yAxis} />
          {isReferenceLineX && <ReferenceLine {...referenceLineX} />}
          {isReferenceLineY && <ReferenceLine {...referenceLineY} />}
          {isTooltip && <Tooltip {...tooltip} />}
          {isLegend && <Legend {...legends} />}
          {lines.map((line, index) => (
            <Line key={index} {...line} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
// const AxisLabel = ({ axisType, x, y, width, height, stroke, children }) => {
//   const isVert = axisType === 'yAxis';
//   const cx = isVert ? x : x + (width / 2);
//   const cy = isVert ? (height / 2) + y : y + height + 10;
//   const rot = isVert ? `270 ${cx} ${cy}` : 0;
//   return (
//     <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle" stroke={stroke}>
//       {children}
//     </text>
//   );
// };

// class CustomLineChart extends React.Component {
//   state = {
//     interval: 3
//   }
//   componentDidMount() {

//   }
//   render() {
//     const {
//       graphData,
//       config = {},
//       isTooltip = true,
//       isLegend = true,
//       isCartesianGrid = true,
//       isReferenceLineX = false,
//       isReferenceLineY = false,
//     } = this.props;
//     const {
//       responsiveContainer = {},
//       lineChart = {},
//       legends = {},
//       lines = [],
//       xAxis = {},
//       yAxis = {},
//       tooltip = {},
//       cartesianGrid = {},
//       referenceLineX = {},
//       referenceLineY = {},
//     } = config;
//     if (!(graphData && graphData.length > 0)) {
//       return <div>no data</div>;
//     }
//     return (
//       <div data-testid="custom-line-chart" className="custom-line-chart">
//         <ResponsiveContainer width={'100%'} height={400} {...responsiveContainer}>
//           <LineChart data={graphData}
//             {...lineChart}
//             margin={{ top: 5, right: 70, left: 20, bottom: 5 }}
//           >
//             {isCartesianGrid && (
//               <CartesianGrid strokeDasharray="3 3" {...cartesianGrid} />
//             )}
//             <XAxis
//               {...xAxis}
//               // tickCount={4}
//               // type="number"
//               // domain={['auto', 'auto']}
//               // scale='time'
//               // domain={['dataMin', 'dataMax']}
//               // allowDataOverflow={true}
//               // tickFormatter={(time) => {
//               //   console.log(time, '---')
//               //   return moment(time).format('DD-MM-YYYY')
//               // }}
//               // label="XAxis"
//               dataKey="bucket"
//             // interval="preserveStartEnd"
//             // padding={{ left: 30, right: 30 }}
//             />
//             <YAxis {...yAxis} />
//             {isReferenceLineX && <ReferenceLine {...referenceLineX} />}
//             {isReferenceLineY && <ReferenceLine {...referenceLineY} />}
//             {isTooltip && <Tooltip {...tooltip} />}
//             {isLegend && <Legend {...legends} />}
//             {lines.map((line, index) => (
//               <Line key={index} {...line} />
//             ))}
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }
// };

export default CustomLineChart;
