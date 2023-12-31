import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  dataUser: any;

  constructor(private afAuth: AngularFireAuth,
    private router: Router) {

  }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user =>{
      if(user && user.emailVerified) {
        this.dataUser = user;
      } else {
        this.router.navigate(['/sesion']);
      }
    })

  }

  logOut(){
    this.afAuth.signOut().then(() => this.router.navigate(['/sesion']))
  }

}
