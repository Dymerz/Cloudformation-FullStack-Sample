import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { firstValueFrom, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Fruit } from '../types/fruit.type'

@Injectable()
export class HttpService
{
  constructor(
    private http: HttpClient
  ) {}

  public async ping(): Promise<unknown>
  {
    return this.toPromise(this.http.get<unknown>(`${environment.BACKEND_URL}/ping`))
  }

  public async getFruits(): Promise<Fruit[]>
  {
    return this.toPromise(this.http.get<Fruit[]>(`${environment.BACKEND_URL}/fruits`))
  }

  public async getFruit(uuid: string): Promise<Fruit>
  {
    return this.toPromise(this.http.get<Fruit>(`${environment.BACKEND_URL}/fruits/${uuid}`))
  }

  public async removeFruit(uuid: string): Promise<Fruit>
  {
    return this.toPromise(this.http.delete<Fruit>(`${environment.BACKEND_URL}/fruits/${uuid}`))
  }

  public async createFruit(fruit: Fruit): Promise<any>
  {
    return this.toPromise(this.http.post(`${environment.BACKEND_URL}/fruits`, fruit))
  }

  private async toPromise<T>(http: Observable<T>): Promise<T>
  {
    return new Promise<T>((resolve, reject) => {
      http
        .subscribe({
          next: (res: any) => resolve(res),
          error: (res: any) => reject(res),
        })
    })
  }
}