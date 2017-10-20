import glamorous from 'glamorous';
import Grid from '../../helpers/Grid';
import maxContent from '../../helpers/MaxContent';

let grid = new Grid([
  'header    header   header',
  'main      main     submit'
], {gridTemplateRows: `${maxContent()} 1fr`});

const gridItemLayout = {
  display: 'table-row',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '10px',
  backgroundColor: 'CadetBlue',
  padding: '5px',
}

const AvailabilityGrid = glamorous.div(grid.container, {height: '100vh', padding: '5px', boxSizing: 'border-box'});

const HeaderGridItem = glamorous.div(grid.header, gridItemLayout);

const MainGridItem = glamorous.div(grid.main, gridItemLayout);

const SubmitGridItem = glamorous.div(grid.submit, gridItemLayout);

export default AvailabilityGrid;
export { HeaderGridItem, MainGridItem, SubmitGridItem };
