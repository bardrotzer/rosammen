import { select } from 'd3-selection';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent, max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { area } from 'd3-shape';

export default class SpeedChart {
  constructor(className) {
    this.selection = select(className)
    this._height = 200;
    this._width = 500;
    this._data = [];
  }

  set height(h) {
    this._height = h;
  }

  set width(w) {
    this._width = w;
  }

  set data(d) {
    this._data = d;
  }

  draw() {
    const fontfamily = 'system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto';
    const margin = {top: 20, right: 20, bottom: 30, left: 30};

    select('.js-speed').remove();

    const x = scaleTime()
      .domain(extent(this._data, d => d.date))
      .range([margin.left, this._width - margin.right])

    const y = scaleLinear()
    .domain([0, max(this._data, d => d.knots)]).nice()
    .range([this._height - margin.bottom, margin.top])

    const xAxis = g => g
    .attr('transform', `translate(0,${this._height - margin.bottom})`)
    .call(axisBottom(x).ticks(this._width / 80).tickSizeOuter(0))

    const yAxis = g => g
    .attr('transform', `translate(${margin.left},0)`)
    .call(axisLeft(y))
    .call(g => g.select('.domain').remove())
    .call(g => g.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text(this._data.knots));

    const aChart = area()
        .x(d => x(d.date))
        .y0(y(0))
        .y1(d => y(d.knots))

    const svg = this.selection
      .append('svg')
      .attr('class', 'js-speed')
      .attr('height', this._height)
      .attr('width', this._width)
      // .append('rect')
      // .attr('height', this._height)
      // .attr('width', this._width)
      // .attr('fill', 'white');

      svg.append('linearGradient')
      .attr('id', 'temperature-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0).attr('y1', y(50))
      .attr('x2', 0).attr('y2', y(60))
    .selectAll('stop')
      .data([
        {offset: '0%', color: 'steelblue'},
        {offset: '50%', color: 'gray'},
        {offset: '100%', color: 'red'}
      ])
    .enter().append('stop')
      .attr('offset', function(d) { return d.offset; })
      .attr('stop-color', function(d) { return d.color; });

    svg.append('path')
        .datum(this._data)
        .attr('fill', '#FC6C0C')
        .attr('d', aChart);


    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    // return svg.node();
  }

}