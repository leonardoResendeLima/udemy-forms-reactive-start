import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	signUpForm: FormGroup;

	genders = ['male', 'female'];
	invalidNames = ['Chris', 'Anna'];


	ngOnInit() {
		this.signUpForm = new FormGroup({
			'userData': new FormGroup({
				'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
				'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
			}),
			'gender': new FormControl('male'),
			'hobbies': new FormArray([])
		})

		this.signUpForm.valueChanges.subscribe(
			(values) => console.log(values)
		)

		this.signUpForm.statusChanges.subscribe(
			(status) => console.log(status)
		)

		this.signUpForm.setValue({
			'userData': {
				'username': 'Leo',
				'email': 'teste@teste.com.br'
			},
			'gender': 'male',
			'hobbies': []
		})

		this.signUpForm.patchValue({
			'userData': {
				'username': 'Anna',	
			}
		})
	}

	onSubmit() {
		console.log(this.signUpForm);
		this.signUpForm.reset();
	}

	onAddHobby() {
		const control = new FormControl(null, Validators.required);
		(<FormArray>this.signUpForm.get('hobbies')).push(control);
	}

	forbiddenNames(control: FormControl): { [s: string]: boolean } {
		if (this.invalidNames.indexOf(control.value) !== -1)
			return { "nameIsForbidden": true }

		return null;
	}

	// Async Validators
	forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
		const promise = new Promise<any>((resolve, reject) => {
			setTimeout(() => {
				if (control.value === 'teste@teste.com')
					resolve({ 'emailIsForbidden': true })
				resolve(null);
			}, 1500)
		})
		return promise;
	}
}
