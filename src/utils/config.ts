import Joi from 'joi';
import { readFileSync } from 'fs';
import path from 'path';

export interface IBackend {
  domain: string;
  weight: number;
}

export interface IConfig {
  lbPORT: number;
  lbAlgo: 'rand' | 'rr' | 'wrr';
  be_servers: IBackend[];
}

export class Config {
  private static instance: IConfig | null = null;

  // Joi schema for validation
  private static configSchema = Joi.object({
    lbPORT: Joi.number().port().required(),
    lbAlgo: Joi.string().valid('rand', 'rr', 'wrr').required(),
    be_servers: Joi.array().items(
      Joi.object({
        domain: Joi.string().uri().required(),
        weight: Joi.number().min(1).required()
      })
    ).min(1).required()
  });

  public static load(): void {
    try {
      // Read config.json from root
      const rawData = readFileSync(path.join(process.cwd(), 'config.json'), 'utf-8');
      const parsedData = JSON.parse(rawData);

      // Validate
      const { error, value } = this.configSchema.validate(parsedData);
      
      if (error) {
        console.error('❌ Config Validation Error:', error.message);
        process.exit(1); // Fail Fast
      }

      this.instance = value;
      console.log('✅ Configuration loaded and validated.');
    } catch (err) {
      console.error('❌ Failed to load config.json:', err);
      process.exit(1);
    }
  }

  public static getConfig(): IConfig {
    if (!this.instance) {
      throw new Error('Config not loaded! Call Config.load() first.');
    }
    return this.instance;
  }
}