import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface RuntimeConfig {
  baseGalleryApiUrl: string;
  baseGalleryPublicImageUrl: string;
  baseTempImageUrl: string;
  baseUsersApiUrl: string;
  baseUtilityApiUrl: string;
}

@Injectable({ providedIn: 'root' })
export class RuntimeConfigService {
  private config?: RuntimeConfig;

  constructor(private http: HttpClient) {}

  load(): Promise<void> {
    return firstValueFrom(this.http.get<RuntimeConfig>('assets/config.json'))
      .then(config => {
        this.config = config;
      });
  }

  get settings(): RuntimeConfig {
    if (!this.config) {
      throw new Error('La configurazione runtime non è stata caricata.');
    }
    return this.config;
  }
}
