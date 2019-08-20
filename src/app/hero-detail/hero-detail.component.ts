import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hero, Address, states } from '../data-model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnChanges {

    heroForm: FormGroup;
    states = states;
    @Input() hero: Hero;
    nameChangeLog: string[] = [];

    constructor(private formBuilder: FormBuilder,
                private heroService: HeroService) {
        this.createForm();
        this.logNameChange();
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

    logNameChange() {
        const nameControl = this.heroForm.get('name');
        // Log name changes to a local variable
        nameControl.valueChanges.forEach(
            (value: string) => {
                this.nameChangeLog.push(value);
            }
        );
    }

    rebuildForm() {
        this.heroForm.reset({
            name: this.hero.name
        });
        this.setAddresses(this.hero.addresses);
    }

    onSubmit() {
        this.hero = this.prepareSaveHero();
        console.log(this.hero);
        this.heroService.updateHero(this.hero).subscribe(
            (result) => {
                // Error handling
                // rebuild the form
                this.rebuildForm();
            }
        );
    }

    prepareSaveHero(): Hero {
        const formModel = this.heroForm.value;

        console.log(formModel.secretLairs);

        // Create deep copies of the changed Secret Lairs of the heroes
        const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
            (address: Address) => Object.assign({}, address)
        );

        console.log('secretLairsDeepCopy');
        console.log(secretLairsDeepCopy);

        // Return new 'Hero' with udpated field values from the old Hero record
        const saveHero: Hero = {
            id: this.hero.id,
            name: formModel.name as string,
            addresses: secretLairsDeepCopy
        };

        return saveHero;
    }

    revert() {
        this.rebuildForm();
    }

}
