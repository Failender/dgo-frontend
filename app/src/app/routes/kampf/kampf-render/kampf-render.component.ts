import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Kampf, Kampfteilnehmer} from '../kampf.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-kampf-render',
  templateUrl: './kampf-render.component.html',
  styleUrls: ['./kampf-render.component.css']
})
export class KampfRenderComponent implements OnInit, OnChanges {

  @Input()
  public kampf: Kampf;

  private backgroundlayer;
  private playerLayer;
  private stage;
  private scaleFactor = 1.5;
  private currentScale = 1;

  private backgroundImage;


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    this.stage = new Konva.Stage({
      container: 'konvas-container',
      width: window.innerWidth,
      height: window.innerHeight
    });

    this.backgroundlayer = new Konva.Layer();

    this.playerLayer = new Konva.Layer();
    this.stage.add(this.backgroundlayer);
    this.stage.add(this.playerLayer);
    this.backgroundlayer.draw();
    // const image = environment.rest + "assets/"  + this.kampf.image;
    // this.addImage(image, () => {});

    this.setKampf(this.kampf);

    this.playerLayer.draw();

  }

  private setKampf(kampf: Kampf) {
    this.kampf = kampf;

    kampf.teilnehmer.forEach(teilnehmer => {
      this.addTeilnehmerIcon(teilnehmer);
    });

    // kampf.components.forEach(entry => this.renderComponent(entry));

  }

  private addTeilnehmerIcon(teilnehmer: Kampfteilnehmer) {

    const group = new Konva.Group({
      x: 30, y: 30,
    });
    group.draggable(true);
    const background = new Konva.Circle({
      x: 0, y: 0,
      radius: 16,
      stroke: 'blue'
    });
    const fillY = +16 - 32;
    background.fillLinearGradientColorStops([0, 'red', 0, 'green']);
    background.fillLinearGradientStartPoint({x: 8, y: fillY});
    background.fillLinearGradientEndPoint({x: 8, y: 16});
    teilnehmer.konva = group;
    group.add(background);

    const image = new Image();
    image.onload = () => {
      const foreground = new Konva.Circle({
        x: 0, y: 0, radius: 16
      });
      foreground.fillPatternOffset({x: 16, y: 16});
      foreground.fillPatternImage(image);
      group.add(foreground);

      group.draw();
    };

    group.on('dragend', () => {
      // teilnehmer.x = group.attrs.x;
      // teilnehmer.y = group.attrs.y;
      // this.teilnehmerChange.next(teilnehmer);
    });
    image.src = `assets/icons/axe.png`;
    this.playerLayer.add(group);
  }

  private addImage(src, callback?) {
    const image = new Image();
    image.onload = () => {
      const element = new Konva.Image({
        width: image.width,
        height: image.height,
        x: 0,
        y: 0,
        image
      });
      this.backgroundImage = element;
      element.draggable(true);
      this.backgroundlayer.add(element);
      element.fillRadialGradientEndPointY(20);
      this.backgroundlayer.draw();
      if (callback) {
        callback();
      }
    };
    image.src = src;
  }

  scaleUp() {
    this.currentScale *= this.scaleFactor;
    this.stage.height(this.stage.height() * this.scaleFactor);
    this.stage.width(this.stage.width() * this.scaleFactor);
    this.stage.scale({x: this.currentScale, y: this.currentScale});
    this.stage.draw();
  }

  scaleDown() {
    const scale = 1 / this.scaleFactor;
    this.currentScale *= scale;
    this.stage.height(this.stage.height() * scale);
    this.stage.width(this.stage.width() * scale);
    this.stage.scale({x: this.currentScale, y: 1 / this.currentScale});
    this.stage.draw();
  }


}

declare var Konva;
