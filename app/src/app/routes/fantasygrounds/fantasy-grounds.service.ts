import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FantasyGroundsService {

  constructor(private http: HttpClient) { }

  public uploadDbXml(file: File) {
    const formData = new FormData();
    formData.append('body', file);

    return this.http.post<CampaignInformation>(`${environment.rest}fantasygrounds/db`, formData);
  }

  public getUploadedDbXml() {
    return this.http.get<CampaignInformation>(`${environment.rest}fantasygrounds/db`);
  }

  public export(settings: ExportSettings) {
    return this.http.post<Blob>(`${environment.rest}fantasygrounds/export`, settings, {responseType: 'blob' as 'json' });
  }
}


export interface CampaignInformation {
  characters: Character[];
}

export interface Character {

  name: string;
  currentAsp: number;
  currentLep: number;
  id: number;
}

export interface ExportSettings {
  characters: ExportedCharacter[];
}

export interface ExportedCharacter {
  id: number;
  campaignId?: number;
}

export interface MigrationResult {
  xml: string;
}
