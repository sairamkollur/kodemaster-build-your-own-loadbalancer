import { BEServerHealth } from './utils/enums';

export interface IBackendServerDetails {
  url: string;
  serverWeight: number;
  getStatus(): BEServerHealth;
  setStatus(status: BEServerHealth): void;
  incrementRequestsServed(): void;
  resetMetrics(): void;
}

export class BackendServerDetails implements IBackendServerDetails {
  public url: string;
  public serverWeight: number;
  private status: BEServerHealth;
  private requestsServed: number = 0;

  constructor(url: string, weight: number) {
    this.url = url;
    this.serverWeight = weight;
    // Default to UNHEALTHY until first health check passes
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

  // Helper for debugging/logging
  public getMetrics() {
    return {
      url: this.url,
      status: this.status,
      requestsServed: this.requestsServed
    };
  }
}