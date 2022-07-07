export interface NormalizedCoordinates {
  x: number;
  y: number;
}

export default class DrawInUnitCircle {
  context: CanvasRenderingContext2D;
  height: number;
  width: number;
  limit: number;

  locus: NormalizedCoordinates[] = [];

  /**
   * HTMLCanvasElementをもらって色々する
   * @param {HTMLCanvasElement} elem
   * @param {number} height px単位になります
   * @param {number} width px単位になります
   */
  constructor(
    elem: HTMLCanvasElement,
    height: number = 200,
    width: number = 200,
    limit: number = 100
  ) {
    elem.setAttribute('height', `${height}px`);
    elem.setAttribute('width', `${width}px`);

    this.height = height;
    this.width = width;
    this.limit = limit;
    this.context = elem.getContext('2d');
  }

  init(): void {
    this.context.fillStyle = 'rgb(240, 240, 240)';
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.strokeStyle = 'rgb(0, 0, 0)';
    this.context.lineWidth = 1;

    this.context.beginPath();
    this.context.moveTo(0, this.height / 2);
    this.context.lineTo(this.width, this.height / 2);
    this.context.closePath();
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(this.width / 2, 0);
    this.context.lineTo(this.width / 2, this.height);
    this.context.closePath();
    this.context.stroke();
  }

  plot(nc: NormalizedCoordinates): void;
  plot(x: number, y: number): void;
  plot(arg1: NormalizedCoordinates | number, arg2?: number) {
    if (this.locus.length > this.limit) {
      this.locus.shift();
    }

    if (typeof arg1 === 'number') {
      this.locus.push({
        x: ((arg1 + 1) * this.width) / 2,
        y: ((arg2 + 1) * this.height) / 2,
      });
    } else {
      this.locus.push({
        x: ((arg1.x + 1) * this.width) / 2,
        y: ((arg1.y + 1) * this.height) / 2,
      });
    }

    this.init();

    this.locus.forEach((v, i, a) => {
      if (i === a.length - 1) return;

      this.context.strokeStyle = `rgba(255, 0, 0, ${i / (a.length - 1)})`;
      this.context.lineWidth = 1;
      this.context.beginPath();
      this.context.moveTo(v.x, v.y);
      this.context.lineTo(a[i + 1].x, a[i + 1].y);
      this.context.closePath();
      this.context.stroke();
    });
  }
}
