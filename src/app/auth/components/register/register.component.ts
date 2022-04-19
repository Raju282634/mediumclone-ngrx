import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
// NgRX
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
// Actions
import { registerAction } from '../../store/actions/register.actions';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { AuthService } from './../../services/auth.service';
import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface';
import { BackEndErrorsInterface } from 'src/app/shared/types/backEndErrors.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackEndErrorsInterface>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store
        .pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store
        .pipe(select(validationErrorsSelector));
  }

  initializeForm(): void{
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    console.log(this.registerForm.value);
    const request: RegisterRequestInterface = {
      user: this.registerForm.value
    };
    this.store.dispatch(registerAction({request}));
  }
}
