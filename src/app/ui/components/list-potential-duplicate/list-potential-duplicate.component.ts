import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Lead } from '../../models/lead';
import { LeadsService } from '../../services/leads.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-potential-duplicate',
  standalone: true,
  imports: [CommonModule , MatTableModule],
  templateUrl: './list-potential-duplicate.component.html',
  styleUrls: ['./list-potential-duplicate.component.scss'],
})
export class ListPotentialDuplicateComponent implements OnInit {
  subscription = new Subscription();
  leadId!:string;
  dataSource = new MatTableDataSource<Lead>();
  listPotentialDuplicatet:string[] = [];
  displayedColumns: string[] = [
    'name',
    'email',
    'source',
    'action',
  ];
  isDataEmpty : boolean = false;
  constructor(
    private _LeadsService: LeadsService,
    private _ToastrService: ToastrService,
    private dialogRef: MatDialogRef<ListPotentialDuplicateComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.leadId = data ? data.selected_lead_id : '';
    this.listPotentialDuplicatet = data ? data.leadPotentialDuplicates : [];
    const result = data.leads.filter((obj:Lead) => this.listPotentialDuplicatet.includes(obj.lead_id));
    this.isDataEmpty = result.length ? false : true;
    this.dataSource = new MatTableDataSource<Lead>(result);
    console.log("this.dataSource" , this.dataSource);
    
  }

  ngOnInit(): void {}
  markAsActualDuplicates(data: Lead) {
    this.subscription.add(
      this._LeadsService.markLead(data , this.leadId).subscribe(
        () => {
          this.dialogRef.close();
          this._ToastrService.success('Updated Successfully')
        }
      )
    )
  }

  trackByFn(index: number, item: any): any {
    return item ? item.lead_id : undefined;
  }
}
