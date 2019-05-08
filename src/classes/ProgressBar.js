import { select } from 'd3-selection';
import 'd3-transition';

export default class ProgressBar {
  constructor(className) {
    this.selection = select(className)
    this._height = 20;
    this._width = 500;
    this._distance = 0;
    this._remaining = 0;
  }

  set height(h) {
    this._height = h;
  }

  set width(w) {
    this._width = w;
  }

  set distance(d) {
    this._distance = Number(d);
  }

  set remaining(r) {
    this._remaining = Number(r);
  }

  draw() {
    const total = this._distance + this._remaining;
    const factor = this._width / total;
    const lineWidth = factor * this._distance;
    const fontfamily = 'system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto';

    select('.js-pr').remove();

    const svg = this.selection
      .append('svg')
      .attr('class', 'js-pr')
      .attr('height', 100)
      .attr('width', this._width);


	svg.append('rect')
		.attr('class', 'bg-rect')
		.attr('fill', 'gray')
		.attr('height', this._height)
		.attr('width', this._width)
    .attr('x', 0)
    .attr('y', 20);

    const progress = svg.append('rect')
    .attr('class', 'progress-rect')
    .attr('fill', '#FC6C0C')
    .attr('height', this._height)
    .attr('width', 0)
    .attr('x', 0)
    .attr('y', 20);

  svg.append('line')
    .attr('x1', 0)
    .attr('y1', 15)
    .attr('x2', 0)
    .attr('y2', 40)
    .attr('stroke-width', 1)
    .attr('stroke', 'black');

  svg.append('line')
    .attr('x1', this._width)
    .attr('y1', 15)
    .attr('x2', this._width)
    .attr('y2', 40)
    .attr('stroke-width', 1)
    .attr('stroke', 'black');

  svg.append('text')
    .text('Portmao')
    .attr('class', 'text-sm md:text-base lg:text-base xl:text-base')
    .attr('y', 12)
    .attr('text-anchor', 'start');

  svg.append('text')
    .text('Cayenne')
    .attr('class', 'text-sm md:text-base lg:text-base xl:text-base')
    .attr('y', 12)
    .attr('x', this._width)
    .attr('text-anchor', 'end');

  const midline = svg.append('line')
          .attr('x1', 0)
          .attr('y1', 20)
          .attr('x2', 0)
          .attr('y2', 44)
          .attr('stroke-width', 1)
          .attr('stroke', 'black');

  const description = svg.append('text')
    .text(Math.round(this._distance) + 'km / ' + Math.round(this._remaining) +'km')
    .attr('class', 'text-sm md:text-base lg:text-base xl:text-base')
    .attr('y', 60)
    .attr('x', 0)
    .attr('text-anchor', 'middle');


	progress.transition()
		.duration(1000)
		.attr('width', lineWidth);

  midline.transition()
    .duration(1000)
    .attr('x1', lineWidth)
    .attr('x2', lineWidth);

  description.transition()
    .duration(1000)
    .attr('x', lineWidth);
	// function moveProgressBar(state){
	// 	progress.transition()
	// 		.duration(1000)
	// 		.attr('fill', function(){
	// 			return colorScale(state);
	// 		})
	// 		.attr('width', function(){
	// 			var index = states.indexOf(state);
	// 			return (index + 1) * segmentWidth;
	// 		});
	// }


  }
}