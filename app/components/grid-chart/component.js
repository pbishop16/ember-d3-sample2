import Ember from 'ember';
import d3 from 'npm:d3';

export default Ember.Component.extend({

  didInsertElement() {

    this._super(...arguments);

    let gridData = this.get('data');

    let margin = {top:10, right:10, bottom:10, left:10};
    let width = 600 - margin.left - margin.right;
    let height = 600 - margin.top - margin.bottom;

    let grid = d3.select('#grid')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g').attr('class', 'container')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let row = grid.selectAll('.row')
            .data(gridData)
            .enter().append('g')
            .attr('class', 'row');

    let column = row.selectAll('.square')
            .data(function(d) { return d; })
            .enter().append('rect')
            .attr('x', function(d) { return d.x; })
            .attr('y', function(d) { return d.y; })
            .attr('width', function(d) { return d.width; })
            .attr('height', function(d) { return d.height; })
            .style('fill', 'fff')
            .style('stroke', '#222')
            .on('mouseover', function(d) {
              d.hover++;
              if ((d.hover)%4 === 0 ) { d3.select(this).style('fill', '#fff'); }
              if ((d.hover)%4 === 1 ) { d3.select(this).style('fill', '#2C93E8'); }
              if ((d.hover)%4 === 2 ) { d3.select(this).style('fill', '#F56C4E'); }
              if ((d.hover)%4 === 3 ) { d3.select(this).style('fill', '#838690'); }

              console.log('Square - ' + d.x + '|' + d.y + ' clicked.');
            });






  }
});
