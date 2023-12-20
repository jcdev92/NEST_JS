import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('This is an error - Check logs');
    }
  }

  async post<T>(url: string, data: any): Promise<T> {
    try {
      const { data: response } = await this.axios.post<T>(url, data);
      return response;
    } catch (error) {
      throw new Error('This is an error - Check logs');
    }
  }

  async put<T>(url: string, data: any): Promise<T> {
    try {
      const { data: response } = await this.axios.put<T>(url, data);
      return response;
    } catch (error) {
      throw new Error('This is an error - Check logs');
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const { data: response } = await this.axios.delete<T>(url);
      return response;
    } catch (error) {
      throw new Error('This is an error - Check logs');
    }
  }
}
