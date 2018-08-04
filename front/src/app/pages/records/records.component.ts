import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { RecordsService } from '../../services/records.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  public Records:any[] = [];
  
  //Variables de control
  public loading = true;
  public showTable = false;
  
  constructor(private user:UsersService, private reco:RecordsService, private router:Router) { }

  ngOnInit() {
	  this.loading = true;
	  this.Records = [];
	  
	this.reco.getAllRecords(this.user.getUser().id).subscribe(data => {
		if(data.records.length){
			this.Records = data.records;
			this.Records.reverse();
			this.loading = false;
			this.showTable = true;
			console.log(this.Records);
		} else {
			this.loading = false;
			this.showTable = false;
		}
	});

  }

}
