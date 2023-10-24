import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ListPotentialDuplicateComponent } from '../list-potential-duplicate/list-potential-duplicate.component';
import { Lead } from '../../models/lead';
import { LeadsService } from '../../services/leads.service';
@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatDialogModule],
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
})
export class LeadsComponent implements OnInit {
  subscription = new Subscription();
  leadPotentialDuplicates: string[] = [];
  leads: Lead[] = [];
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'source',
    'home_phone',
    'action',
  ];

  dataSource = new MatTableDataSource<Lead>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _LeadsService: LeadsService,
    public _MatDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getALlLeads();
  }
  getALlLeads() {
    this.subscription.add(
      this._LeadsService.getList().subscribe((res) => {
        this.leads = res;
        this.dataSource = new MatTableDataSource<Lead>(this.leads);
        this.dataSource.paginator = this.paginator;
      })
    );
  }

  getListPotentialDuplicates(id: string) {
    this.subscription.add(
      this._LeadsService.getListPotentialDuplicates(id).subscribe((res) => {
        this.leadPotentialDuplicates = res;
        this._MatDialog.open(ListPotentialDuplicateComponent, {
          data: {
            leadPotentialDuplicates: this.leadPotentialDuplicates,
            leads: this.leads,
            selected_lead_id:id
          },
          width: '80%',
          height: 'auto',
        });
      })
    );
  }
  trackByFn(index: number, item: any): any {
    return item ? item.lead_id : undefined;
  }
}
