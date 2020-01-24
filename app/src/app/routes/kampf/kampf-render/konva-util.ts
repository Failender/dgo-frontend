import Konva from 'konva';

export function createImage(x: number, y: number, src: string, callback: (element) => any): void {
  const image = new Image();
  image.onload = () => {
    const element = new Konva.Image({
      width: image.width,
      height: image.height,
      x, y,
      image
    });
    if (callback) {
      callback(element);
    }
  };
  image.src = src;
}

export function createGroup(x: number, y: number) {
  return new Konva.Group({
    x, y
  });
}

export function createRect(x: number, y: number, width: number, height: number, fill: string, stroke: string, strokeWidth: number) {
  return new Konva.Rect({
    x, y, width, height, fill, stroke, strokeWidth
  });
}

export function createCircle(x: number, y: number, radius: number, stroke: string, fill?: string) {
  return new Konva.Circle({
    x, y, radius, stroke, fill
  });
}

