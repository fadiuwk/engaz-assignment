import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Lead } from '../models/lead';

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  private readonly baseurl = 'http://localhost:3000/api';
  listLeads = new Subject<Lead[]>();

  constructor(private http: HttpClient) {}

  getList(): Observable<Lead[]> {
    return this.http.get<Lead[]>(`${this.baseurl}/leads`);
  }

  // getListLeads

  getListPotentialDuplicates(lead_id: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.baseurl}/leads/${lead_id}/potential-duplicates`
    );
  }

  markLead(body: Lead, lead_id: string): Observable<Lead> {
    return this.http.put<Lead>(`${this.baseurl}/leads/${lead_id}`, body);
  }
}
