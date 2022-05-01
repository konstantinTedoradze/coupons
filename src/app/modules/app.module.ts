import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutComponent } from '../components/layout/layout.component';
import { MenuComponent } from '../components/menu/menu.component';
import { MainComponent } from '../components/main/main.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { UserService } from '../services/UserService';
// import { HttpClient, HttpHandler} from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CustomerComponent } from '../components/customer/customer.component';
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';
import { CouponsService } from '../services/CouponsService';
import { CouponsPipeByMinPrice } from '../pipes/CouponsPipeByMinPrice';
import { ManagementComponent } from '../components/management/management.component';
import { AdminComponent } from '../components/admin/admin.component';
import { InsertComponent } from '../components/insert/insert.component';
import { UpdateComponent } from '../components/update/update.component';
import { DeleteComponent } from '../components/delete/delete.component';
import { AdminModule } from './admin.module';


@NgModule({
  declarations: [
  CouponsPipeByMinPrice,
  LayoutComponent,
  MenuComponent,
  MainComponent,
  HeaderComponent,
  FooterComponent,
  CustomerComponent,
  ManagementComponent,
 ],
  imports: [
    AdminModule,
    BrowserModule,
    FormsModule, ReactiveFormsModule, 
    RouterModule, RoutingModule,
    HttpClientModule
  ],
  providers: [UserService
    , CouponsService
    , { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
    ],
  bootstrap: [LayoutComponent],
})
export class AppModule { }
