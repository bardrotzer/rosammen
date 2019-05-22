import { select } from 'd3-selection';
import { arc } from 'd3-shape';
import moment from 'moment';

export default class RadialProgress {
  constructor(className) {
    this.startDate = new moment(new Date('04-01-2019'))
    this.currentDate = new moment();
    this.selection = select(className)
    this._height = 200;
    this._width = 200;
    this._distance = 0;
    this._remaining = 0;
    this._daysLeft = 0;
    this.total = 0;
    this.margin = 20;
  }

  get daysLeft() {
    return this._daysLeft;
  }

  set height(h) {
    this._height = h *0.4;
  }

  set width(w) {
    this._width = w;
  }

  set distance(d) {
    this._distance = Number(d);
    this.total = this._distance + this._remaining;
  }

  set remaining(r) {
    this._remaining = Number(r);
    this.total = this._distance + this._remaining;
  }

  draw(kmh) {
    const kmd = kmh * 24;
    this._daysLeft = Math.round(this._remaining / kmd)
    const radius = (this._height - (this.margin * 2)) * 0.5;
    const center = radius + this.margin;
    const left = this._width * 0.5;

    const width = 15;
    const twoPi = Math.PI * 2;


    var endPercent = (this._distance / this.total)
    const endAngle = twoPi * endPercent;

    const daysSinceStart = moment.duration(this.currentDate.diff(this.startDate));
    const numDays = Math.floor(daysSinceStart.asDays());

  const arcElement = arc()
      .startAngle(0)
      .innerRadius(radius)
      .outerRadius(radius - width)
      .cornerRadius(50);

  select('.js-rp').remove();

  const svg = this.selection.append('svg')
      .attr('class', 'js-rp')
      .attr('width', this._width)
      .attr('height', this._height);



  const field = svg.append('g')
      .attr('transform', `translate(${left},${center})`);

  const meter = field.append('g')
      .attr('class', 'progress-meter');

  meter.append('path')
      .attr('class', 'background')
      .attr('fill', 'gray')
      .attr('fill-opacity', 0)
      .attr('d', arcElement.endAngle(twoPi));


  const front = meter.append('path')
      .attr('class', 'foreground')
      .attr('fill', '#FC6C0C')
      .attr('fill-opacity', 1);

  front.attr('d', arcElement.endAngle(endAngle));

  meter.append('text')
      .attr('fill', '#474044')
      .attr('text-anchor', 'middle')
      .attr('dy', '.178em')
      .attr('class', 'text-4xl')
      .text(numDays)

  meter.append('text')
      .attr('fill', '#474044')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.578em')
      .attr('class', 'text-base')
      .text('days at sea');
  }
}