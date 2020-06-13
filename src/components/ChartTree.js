import React from 'react';
import { Treemap, Tooltip } from 'recharts';
import CustomContent from './CustomContent';
import CustomTooltip from './CustomTooltip';

const parsedStrValToNum = (obj, keyId) => {
  return JSON.parse(JSON.stringify(obj), (key, value) => {
    if (key === keyId) return +value;
    return value;
  });
};

const COLORS = [
  '#8889DD',
  '#9597E4',
  '#8DC77B',
  '#A5D297',
  '#E2CF45',
  '#F8C12D',
];

const ChartTree = ({ chartData }) => {
  const { children } = chartData;
  const parsedChildren = parsedStrValToNum(children, 'value');

  return (
    <>
      <Treemap
        width={1200}
        height={600}
        className="treemap-chart"
        data={parsedChildren}
        dataKey="value"
        ratio={2 / 1}
        stroke="#292929"
        colorPanel={COLORS}
        // content={<CustomContent colors={COLORS} />}
      >
        <Tooltip content={<CustomTooltip />} />
      </Treemap>
    </>
  );
};

export default ChartTree;
