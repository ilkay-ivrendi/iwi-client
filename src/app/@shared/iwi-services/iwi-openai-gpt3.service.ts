import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IwiOpenaiGpt3Service {
  private apiKey = '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'; // replace with your OpenAI API key
  constructor(private http: HttpClient) {}

  // method to generate text using the OpenAI GPT-3 API
  generateText(prompt: string, model: string, temperature: number, maxTokens: number, n: number): Observable<any> {
    const url = 'https://api.openai.com/v1/engines/' + model + '/completions';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.apiKey,
    });
    const body = {
      prompt: prompt,
      temperature: temperature,
      max_tokens: maxTokens,
      n: n,
    };
    return this.http.post(url, body, { headers });
  }

  // method to retrieve the available models from the OpenAI GPT-3 API
  listModels(): Observable<any> {
    const url = 'https://api.openai.com/v1/engines';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.apiKey,
    });
    return this.http.get(url, { headers });
  }

  // method to retrieve the status of the OpenAI GPT-3 API
  getStatus(): Observable<any> {
    const url = 'https://api.openai.com/v1/status';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.apiKey,
    });
    return this.http.get(url, { headers });
  }
}
