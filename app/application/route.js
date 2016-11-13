import Ember from 'ember';

export default Ember.Route.extend({
  columnRowCount: 20,

  model() {
    let gridData = function() {
      let data = [];
      let xpos = 0; // starting position
      let ypos = 0;
      let width = 40;
      let height = 40;
      let rowCount = 12;
      let columnCount = 12;
      let hover = 0;

      for(let row = 0; row < rowCount; row++){
        data.push( [] );
        for(let column = 0; column < columnCount; column++) {
          data[row].push({
            x: xpos,
            y: ypos,
            width: width,
            height: height,
            hover: hover
          });
          xpos += width;
        }
        xpos = 0;
        ypos += height;
      }
      return data;
    };
    return gridData();
  }
});
