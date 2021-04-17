import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chores } from '../interfaces/chores';


@Injectable({
  providedIn: 'root'
})
export class ChoresService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
/*     this.baseUrl = 'https://to-do-list-express-node-mysql.herokuapp.com/api/chores'
 */    this.baseUrl = 'http://localhost:3000/api/chores'
  }

  //GET ALL

  getAll(): Promise<Chores[]> {
    const httpOptions = { headers: new HttpHeaders() };

    return this.httpClient
      .get<Chores[]>(this.baseUrl, httpOptions)
      .toPromise();
  }

  //GET BY ID USER

  getChoresByUserId(pId): Promise<Chores[]> {
    const httpOptions = { headers: new HttpHeaders() };

    return this.httpClient
      .get<Chores[]>(`${this.baseUrl}/profile`, httpOptions)
      .toPromise();
  }


  //CREATE
  create(formValues): any {
    return this.httpClient
      .post(this.baseUrl, formValues, this.createHeaders())
      .toPromise();
  }


  // UPDATE 
  updateByIdToken(taskId, formValues): Promise<any> {
    return this.httpClient
      .put<any>(`${this.baseUrl}/${taskId}`, formValues, this.createHeaders())
      .toPromise();
  }

  // DELETE 
  deleteByIdToken(idChore): Promise<any> {
    /* console.log('log del idChore', idChore); */

    return this.httpClient
      .delete<any>(`${this.baseUrl}/${idChore}`, this.createHeaders())
      .toPromise();
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('to-do-list'),
      }),
    };
  }

}
