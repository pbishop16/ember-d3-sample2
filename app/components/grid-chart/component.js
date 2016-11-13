import Ember from 'ember';
import d3 from 'npm:d3';

export default Ember.Component.extend({
  ref1Output: null,
  ref2Output: null,
  didInsertElement() {

    this._super(...arguments);
    this.grid(this.get('data'));

  },
  grid(data) {
    let gridData = data;

    let component = this;

    let margin = {top:40, right:10, bottom:10, left:40};
    let width = 600 - margin.left - margin.right;
    let height = 600 - margin.top - margin.bottom;
    let labels = ['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];

    let reverseLabels = labels.map(function(l) {
      let num = (labels.length - 1) - labels.indexOf(l);
      return labels[num];
    });

    let grid = d3.select('#grid')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g').attr('class', 'container')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let xScale = d3.scaleBand()
            .domain(labels.map(function(l) { return l; }))
            .rangeRound([0,40*12]);

    let yScale = d3.scaleBand()
            .domain(reverseLabels.map(function(l) { return l; }))
            .rangeRound([40*12,0]);

    let xAxis = d3.axisTop(xScale);

    let yAxis = d3.axisLeft(yScale);

    let xAxis_g = grid.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,0)')
            .call(xAxis)
            .select('text');

    let yAxis_g = grid.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(0,0)')
            .call(yAxis)
            .select('text');

    let row = grid.selectAll('.row')
            .data(gridData)
            .enter().append('g')
            .attr('class', 'row');

    let getRandomIntInclusive = function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let fillColor = function(hover, square) {
      if ((hover)%4 === 0 ) { d3.select(square).style('fill', '#fff'); }
      if ((hover)%4 === 1 ) { d3.select(square).style('fill', '#2C93E8'); }
      if ((hover)%4 === 2 ) { d3.select(square).style('fill', '#F56C4E'); }
      if ((hover)%4 === 3 ) { d3.select(square).style('fill', '#838690'); }
    }

    let column = row.selectAll('.square')
            .data(function(d) { return d; })
            .enter().append('rect')
            .attr('class', 'square')
            .attr('x', function(d) { return d.x; })
            .attr('y', function(d) { return d.y; })
            .attr('width', function(d) { return d.width; })
            .attr('height', function(d) { return d.height; })
            .style('fill', '#fff')
            .style('stroke', '#222')
            .on('mouseover', function(d) {
              d.hover++;

              fillColor(d.hover, this);

              component.set('ref1Output', d.x);
              component.set('ref2Output', d.y);

            });

    /*
      Temporarily unused.
    */
    d3.selectAll('rect.square')
            .append('rect')
            .attr('class', 'content')
            .attr('x', function(d) { return d.x; })
            .attr('y', function(d) { return d.y; })
            .attr('width', function(d) { return d.width; })
            .attr('height', function(d) { return d.height; })
            .style('fill', '#232323');

    d3.selectAll('rect.square')
            .append('rect')
            .attr('class', 'content back')
            .attr('x', function(d) { return d.x; })
            .attr('y', function(d) { return d.y; })
            .attr('width', function(d) { return d.width; })
            .attr('height', function(d) { return d.height; })
            .style('fill', '#838690');
  },
  actions: {

  }
});
