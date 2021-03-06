import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://to-do-list-nodejs-express.herokuapp.com/api/user';
/*     this.baseUrl = 'http://localhost:3000/api/user';
 */  }

  //GET ALL

  getAll(): Promise<User[]> {
    const httpOptions = { headers: new HttpHeaders() };

    return this.httpClient
      .get<User[]>(this.baseUrl, httpOptions)
      .toPromise();
  }


  //GET BY ID TOKEN

  getById(): Promise<User> {
    return this.httpClient
      .get<User>(`${this.baseUrl}/profile`, this.createHeaders())
      .toPromise();
  }

  //CREATE

  create(formValues): Promise<any> {

    return this.httpClient.post<any>(this.baseUrl, formValues).toPromise();
  }

  // UPDATE 

  updateById(formValues): Promise<any> {
    return this.httpClient
      .put<any>(this.baseUrl, formValues, this.createHeaders())
      .toPromise();
  }

  //DELETE

  delete(): Promise<any> {


    return this.httpClient
      .delete<any>(`${this.baseUrl}`, this.createHeaders())
      .toPromise();
  }


  //HEADERS

  createHeaders() {

    return {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('to-do-list'),
      }),
    };
  }

  //LOGIN

  login(formValues): Promise<any> {
    return this.httpClient
      .post(`${this.baseUrl}/login`, formValues)
      .toPromise();
  }
}
