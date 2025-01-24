import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{
  
  constructor(private router:Router){}

  @ViewChild(MatDrawer)
  drawer!: MatDrawer;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
