import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

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
				'email': new FormControl(null, [Validators.required, Validators.email]),
			}),
			'gender': new FormControl('male'),
			'hobbies': new FormArray([])
		})
	}

	onSubmit() {
		console.log(this.signUpForm);
	}

	onAddHobby() {
		const control = new FormControl(null, Validators.required);
		(<FormArray>this.signUpForm.get('hobbies')).push(control);
	}

	forbiddenNames(control: FormControl): { [s: string]: boolean } {
		if (this.invalidNames.indexOf(control.value) > -1)
			return { "nameIsForbidden": false }

		return null;
	}
}
