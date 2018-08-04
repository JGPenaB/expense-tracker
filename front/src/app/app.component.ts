import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd} from '@angular/router';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  
  public currentuser; //JSON user
  public user_exist = false;
  public loading = false;
  
  constructor(private user:UsersService, private router: Router) { }
  
  ngOnInit() {
	//Cada vez que la URL cambie, ejecuto una llamada a getUser
	//si la propiedad name no está definida, significa que el usuario cerró sesión
	this.router.events.subscribe((event: Event) => {
		
		if (event instanceof NavigationStart){ this.loading = true; }
		if (event instanceof NavigationEnd)
		{
			this.loading = false;
			this.currentuser = this.user.getUser();
			if(this.currentuser.name){
				this.user_exist = true;
			}else{
				this.user_exist = false;
			}
		}
		
	});
  }
  
  
}
