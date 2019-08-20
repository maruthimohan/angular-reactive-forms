import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Hero, Address, states } from '../data-model';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnChanges {

    heroForm: FormGroup;
    states = states;
    @Input() hero: Hero;

    constructor(private formBuilder: FormBuilder) {
        this.createForm();
        // Set the values for the form
        /* this.heroForm.setValue({
            name: this.hero.name,
            address: this.hero.addresses[0] || new Address()
        }); */
    }

    ngOnInit() {

    }

    ngOnChanges() {
        this.rebuildForm();
    }

    createForm() {
        this.heroForm = this.formBuilder.group({
            name: ['', Validators.required],   // This is a form control named 'name'
            secretLairs: this.formBuilder.array([]),
            superpower: '',
            sidekick: ''
        });
    }

    setAddresses(addresses: Address[]) {
        const addressFGs = addresses.map(address => this.formBuilder.group(address));
        const addressFormArray = this.formBuilder.array(addressFGs);
        // Add a new address object to the new addresses array
        if (addressFormArray.length === 0) {
            addressFormArray.push(this.formBuilder.group(new Address()));
        }
        this.heroForm.setControl('secretLairs', addressFormArray);
    }

    get secretLairs() {
        return this.heroForm.get('secretLairs') as FormArray;
    }

    addLair() {
        this.secretLairs.push(this.formBuilder.group(new Address()));
    }

    removeLair(removeIndex: number) {
        const updatedSecretLairs = this.secretLairs.controls.filter((control, controlIndex) => {
            return (controlIndex !== removeIndex);
        });
        // Set the secretLairs value in the form
        this.heroForm.setControl('secretLairs', this.formBuilder.array(updatedSecretLairs));
    }

    rebuildForm() {
        this.heroForm.reset({
            name: this.hero.name
        });
        this.setAddresses(this.hero.addresses);
    }

}
