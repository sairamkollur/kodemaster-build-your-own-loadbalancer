import { BEServerHealth } from './utils/enums';

export interface IBackendServerDetails {
  url: string;
  serverWeight: number;
  requestsServed: number; // Added to interface to ensure visibility
  
  getStatus(): BEServerHealth;
  setStatus(status: BEServerHealth): void;
  incrementRequestsServed(): void;
  resetMetrics(): void;
}

export class BackendServerDetails implements IBackendServerDetails {
  public url: string;
  public serverWeight: number;
  public requestsServed: number = 0; // Set to public so the test can verify it
  private status: BEServerHealth;

  constructor(url: string, weight: number) {
    this.url = url;
    this.serverWeight = weight;
    // Default to UNHEALTHY per instructions
    this.status = BEServerHealth.UNHEALTHY;
  }

  public getStatus(): BEServerHealth {
    return this.status;
  }

  public setStatus(status: BEServerHealth): void {
    this.status = status;
  }

  public incrementRequestsServed(): void {
    this.requestsServed++;
  }

  public resetMetrics(): void {
    this.requestsServed = 0;
  }
}