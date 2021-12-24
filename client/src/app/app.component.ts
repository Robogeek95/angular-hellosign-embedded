import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { ConfigService } from './config.service';
import HelloSign from 'hellosign-embedded';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';

  ndaForm!: FormGroup;
  submitted = false;
  signUrl: string = '';

  client: HelloSign = new HelloSign({
    clientId: '153fe6c1601c1c11925eda77430b9e6d',
  });

  constructor(
    private formBuilder: FormBuilder,
    private config: ConfigService
  ) {}

  ngOnInit() {
    this.ndaForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.ndaForm.value;

    this.config
      .requestSign({ name: formData.name, email: formData.email })
      .subscribe((res) => {
        this.client.open(res.data.embedded.sign_url, {
          skipDomainVerification: true,
        });
      });
  }
}
