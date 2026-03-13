import { Injectable } from '@nestjs/common';
import vault from 'node-vault';

@Injectable()
export class VaultService {
  private client;
  private keys: any;

  constructor() {
    this.client = vault({
      apiVersion: 'v1',
      endpoint: 'http://127.0.0.1:8200',
      token: 'root', // in production use env or kubernetes auth
    });
  }

  async onModuleInit() {
    const result = await this.client.read('secret/data/jwt');

    this.keys = {
      privateKey: result.data.data.privateKey,
      publicKey: result.data.data.publicKey,
    };
  }

  async getJwtKeys() {
    return this.keys;
  }
}