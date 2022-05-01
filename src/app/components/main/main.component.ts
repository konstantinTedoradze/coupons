import { Component, OnInit } from '@angular/core';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UserService } from 'src/app/services/UserService';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    public loginFormGroup: FormGroup;
    public userNameFormControl: FormControl;
    public passwordFormControl: FormControl;

    public userLoginDetails: UserLoginDetails;

    // The router parameter is an example to a short writing of a member + it's assignment
    // private router: Router EQUIVALENT TO the following 3: 
    // 1. Member definition
    // 2. Parameter definition
    // 3. this.router = router
    constructor(private usersService : UserService, private router: Router) {
        this.userLoginDetails = new UserLoginDetails();
    }

    public login(): void{

        this.userLoginDetails.userName = this.userNameFormControl.value;
        this.userLoginDetails.password = this.passwordFormControl.value;

        // Creating an observable object
        // It looks like an http request had been issued BUT IT DIDN'T
        const observable = this.usersService.login(this.userLoginDetails);

        // The method subscribe() ussues an http request to the server
        // successfulServerRequestData
        observable.subscribe(successfulServerRequestData => {
            console.log(successfulServerRequestData);                    
            
            sessionStorage.setItem("token", successfulServerRequestData.token+"");
            this.usersService.userType = successfulServerRequestData.userType;

            if(successfulServerRequestData.userType == "CUSTOMER"){
                this.router.navigate(["/customer"]);
            }

            if(successfulServerRequestData.userType == "ADMIN"){
                this.router.navigate(["/admin"]);
            }

            if(successfulServerRequestData.userType == "COMPANY"){
                this.router.navigate(["/company"]);
            }
        }, serverErrorResponse => { // Reaching here means that the server had failed
                    // serverErrorResponse is the object returned from the ExceptionsHandler
                    this.router.navigate(["/api/admin"]);
            alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);            
        }); 

    }

    ngOnInit() {
        // Initializing form controls with validators
        //this.userName = new FormControl("Default value doesn't make sense here", [Validators.required, Validators.pattern("^[A-Z]+")]);
        this.userNameFormControl = new FormControl("", [Validators.required, Validators.pattern("^[A-Z]+")]);
        this.passwordFormControl = new FormControl("", Validators.required);
        
        // Initializing the from group
        this.loginFormGroup = new FormGroup({
            userName : this.userNameFormControl,
            password : this.passwordFormControl
        });
    }

}
