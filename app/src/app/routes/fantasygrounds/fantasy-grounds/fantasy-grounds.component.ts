import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CampaignInformation, Character, ExportedCharacter, FantasyGroundsService} from '../fantasy-grounds.service';
import {GruppenService} from '../../../lib/gruppen.service';
import {HeldDto, HeldenService} from '../../../lib/helden/helden.service';
import {flatMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-fantasy-grounds',
  templateUrl: './fantasy-grounds.component.html',
  styleUrls: ['./fantasy-grounds.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FantasyGroundsComponent implements OnInit, OnDestroy {

  public campaignInformation: CampaignInformation;
  public gruppenHelden: HeldDto[];
  private unsubscribe = new Subject();

  public exportedHelden: ExportHeld[];


  constructor(private fantasyGroundsService: FantasyGroundsService, private gruppenService: GruppenService, private heldenService: HeldenService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.gruppenService
      .getCurrentGroup()
      .pipe(  takeUntil(this.unsubscribe), flatMap(gruppe => this.heldenService.getHeldenInGroup(gruppe.id, false, false)))
      .subscribe(helden => {
        this.gruppenHelden = helden;
        this.exportedHelden = helden.map(entry => {
          return {
            export: true,
            held: entry.id,
            name: entry.name
          };
        })
        if (this.campaignInformation == null) {
          this.fantasyGroundsService.getUploadedDbXml().subscribe(data => this.setCampaignInformation(data));
        }
        this.cdr.markForCheck();
      });
  }

  public fileChange(event) {
    const files: FileList = event.target.files;
    this.fantasyGroundsService.uploadDbXml(files.item(0))
      .subscribe(result => {
        this.setCampaignInformation(result);
      });


  }

  private setCampaignInformation(campaignInformation: CampaignInformation) {
    this.campaignInformation = campaignInformation;
    this.exportedHelden.forEach(entry => {
      if (!campaignInformation) {
        entry.campaignData = null;
        return;
      }
      const held = campaignInformation.characters.find(info => entry.name === info.name);
      if (held) {
        entry.campaignId = held.id;
        entry.campaignData = held;
      } else {
        entry.campaignId = null;
        entry.campaignData = null;
      }

    });
    this.cdr.markForCheck();
  }

  public onHeldChange(held: ExportHeld, event) {
    if (event !== undefined) {
      held.campaignData = this.campaignInformation.characters.find(entry => entry.id === event);
    } else {
      held.campaignData = null;
    }

  }

  public export() {
    const exportCharacters: ExportedCharacter[] = this.exportedHelden.filter(entry => entry.export).map(entry => {
      return {
        id: entry.held,
        campaignId: entry.campaignId
      };
    });

    this.fantasyGroundsService.export({characters: exportCharacters}).subscribe(result => {
      this.download(result, 'db.xml');
    });
  }

  private download (content: Blob, filename) {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(content);
    a.download = filename;
    a.click();
  }


  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

}

export interface ExportHeld {
  name: string;
  held?: number;
  campaignId?: number;
  campaignData?: Character;
  export?: boolean;
}
