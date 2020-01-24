import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Kampf, Kampfteilnehmer} from '../kampf.service';
import Konva from 'konva';
import {createCircle, createGroup, createImage, createRect} from './konva-util';
import {zip} from 'rxjs';

@Component({
  selector: 'app-kampf-render',
  templateUrl: './kampf-render.component.html',
  styleUrls: ['./kampf-render.component.css']
})
export class KampfRenderComponent implements OnInit, OnChanges {

  @Input()
  public kampf: Kampf;

  private backgroundLayer;
  private toolbarLayer;
  private playerLayer;
  private stage;
  private scaleFactor = 1.5;
  private currentScale = 1;

  private teilnehmerSpanwed = 0;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    const toolbarSizeY = 60;
    this.stage = new Konva.Stage({
      container: 'konvas-container',
      width: window.innerWidth,
      height: window.innerHeight - toolbarSizeY
    });

    this.backgroundLayer = new Konva.Layer();

    this.toolbarLayer = new Konva.Layer();
    this.playerLayer = new Konva.Layer();
    this.stage.add(this.backgroundLayer);
    this.stage.add(this.toolbarLayer);
    this.stage.add(this.playerLayer);

    const image = `assets/icons/grid.png`;
    this.addImage(image, () => {});
    this.addToolbar();

    this.setKampf(this.kampf);
    this.stage.draw();

  }

  private setKampf(kampf: Kampf) {
    this.kampf = kampf;

    kampf.teilnehmer.forEach(teilnehmer => {
      //this.addTeilnehmerIcon(teilnehmer);
    });

    // kampf.components.forEach(entry => this.renderComponent(entry));

  }

  private addDragableIcon(x: number, y: number, imageLink: string, color: string) {
    const group = createGroup(x, y);
    group.draggable(true);
    const background = createCircle(0, 0, 16, 'blue', color )

    group.add(background);
    createImage(-16, -16, imageLink, image => {
      group.add(image);
      group.draw();
    })



    group.on('dragend', () => {
      // teilnehmer.x = group.attrs.x;
      // teilnehmer.y = group.attrs.y;
      // this.teilnehmerChange.next(teilnehmer);
    });
    this.playerLayer.add(group);
  }

  private addTeilnehmerIcon(teilnehmer: Kampfteilnehmer) {

    this.addDragableIcon(30, 30 * ++this.teilnehmerSpanwed, 'assets/icons/axe.png', 'green');
  }

  private addImage(src, callback?) {
    createImage(0, 0, src, (element) => {
      this.backgroundLayer.add(element);
      this.backgroundLayer.draw();
      if (callback) {
        callback();
      }
    });
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

  private addToolbar() {
    const sizeX = 100;
    const height = 500;

    const groupX = this.stage.width() - sizeX;
    const groupY = (this.stage.height() - height) / 2;
    const group = createGroup(groupX, groupY);
    const rect = createRect(0, 0, sizeX, height, 'gray', 'black', 4);

    const icons = ['assets/icons/axe.png', 'assets/icons/bow.png', 'assets/icons/mage.png', 'assets/icons/dualsword.png', 'assets/icons/shield.png', 'assets/icons/fist.png'];
    group.add(rect);

    let j = 0;
    for (const color of ['green', 'red']) {
      let i = 0;
      for (const icon of icons) {
        group.add(this.createIcon(icon, i, j, color));
        i++;
      }
      j++;

    }


    this.toolbarLayer.add(group);

  }

  private createIcon(imageLink: string, xIndex: number, yIndex: number, color: string) {
    const group = createGroup(30  + yIndex* 32, 30  + xIndex * 32);


    group.on('click', data => {
      this.addDragableIcon(30, 30 * ++this.teilnehmerSpanwed, imageLink, color);

    })
    const circle = createCircle(0, 0, 16, 'blue', color);
    group.add(circle);

    createImage(-16, -16, imageLink, image => {
      group.add(image);
      group.draw();
    });



    /*
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
    image.src = `assets/icons/axe.png`;
    */

    return group;
  }



}
