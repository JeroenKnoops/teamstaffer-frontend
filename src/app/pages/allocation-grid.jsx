import glamorous from 'glamorous';
import Grid from '../../helpers/Grid';
import maxContent from '../../helpers/MaxContent';

let grid = new Grid([
  'header         header          header',
  'allocTable     allocTable      submit',
  'allocChart     allocChart      allocChart'
], {gridTemplateRows: `${maxContent()} 1fr`});

const gridItemLayout = {
  display: 'inline-block',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '10px',
  backgroundColor: 'CadetBlue',
  padding: '5px',
}

const AllocationGrid = glamorous.div(grid.container, {height: '100vh', padding: '5px', boxSizing: 'border-box'});

const HeaderGridItem = glamorous.div(grid.header, gridItemLayout);

const AllocTableGridItem = glamorous.div(grid.allocTable, gridItemLayout);

const AllocChartGridItem = glamorous.div(grid.allocChart, gridItemLayout);

const SubmitGridItem = glamorous.div(grid.submit, gridItemLayout);

export default AllocationGrid;
export { HeaderGridItem, AllocTableGridItem, AllocChartGridItem, SubmitGridItem };
