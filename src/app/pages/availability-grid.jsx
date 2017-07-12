import glamorous from 'glamorous';
import Grid from '../../helpers/Grid';
import maxContent from '../../helpers/MaxContent';

let grid = new Grid([
  'header     header',
  'dataPlane textInput',
  'footer     footer'
]);

const gridItemLayout = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '28px',
  backgroundColor: 'CadetBlue',
  padding: '5px'
}

const AvailabilityGrid = glamorous.div(grid.container, {height: '100vh', padding: '5px', boxSizing: 'border-box'});

const HeaderGridItem = glamorous.div(grid.header, gridItemLayout);

const DataPlaneGridItem = glamorous.div(grid.dataPlane, gridItemLayout);

const TextInputGridItem = glamorous.div(grid.textInput, gridItemLayout);

const FooterGridItem = glamorous.div(grid.footer, gridItemLayout);

export default AvailabilityGrid;
export { HeaderGridItem, DataPlaneGridItem, TextInputGridItem, 
  FooterGridItem };
