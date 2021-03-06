import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from '../components/main/main.component'
import { CustomerComponent } from '../components/customer/customer.component';
import { AdminComponent } from '../components/admin/admin.component';
import { InsertComponent } from '../components/insert/insert.component';
import { UpdateComponent } from '../components/update/update.component';
import { DeleteComponent } from '../components/delete/delete.component';

const routes: Routes = [
    { 
        path: "admin", component: AdminComponent, children:[
            { path: "insert", component: InsertComponent },
            { path: "update", component: UpdateComponent },
            { path: "delete", component: DeleteComponent },
            { path: "", redirectTo: "insert", pathMatch: "full" }
        ]
    }
];

@NgModule({
    declarations: [ AdminComponent,
        InsertComponent,
        UpdateComponent,
        DeleteComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes) // Importing the above routes
  ]
  })
export class AdminModule {

 }
