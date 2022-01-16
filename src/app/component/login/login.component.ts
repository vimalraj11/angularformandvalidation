import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  fieldTextType!: boolean;

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  };

  get f() { return this.registerForm.controls; }

  onSubmit() : void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    else {
      this.router.navigateByUrl("layout")
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  };

  toggleFieldTextType() : void {
    this.fieldTextType = !this.fieldTextType;
  };

}
