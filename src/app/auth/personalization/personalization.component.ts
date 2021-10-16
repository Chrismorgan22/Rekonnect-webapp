import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-personalization',
  templateUrl: './personalization.component.html',
  styleUrls: ['./personalization.component.scss']
})
export class PersonalizationComponent implements OnInit {
  userRoleForm: FormGroup;
  addressForm: FormGroup;
  experienceTypeForm: FormGroup;
  experienceDetailForm: FormGroup;
  educationTypeForm: FormGroup;
  educationDetailForm: FormGroup;
  userRoleSubmit: boolean = false;
  addressSubmit: boolean = false;
  experienceTypeSubmit: boolean = false;
  experienceDetailSubmit: boolean = false;
  educationTypeSubmit: boolean = false;
  educationDetailSubmit: boolean = false;
  formIdArray = ['candidateModalCenter', 'candidateModalCenterupload', 'candidateModalExperience', 'candidateModalcenterexperiencetimeline', 'candidateModalEducation', 'candidateModallastbits', 'candidateModallastbitsfinal', 'gainmorevisibilitymodal', 'almostdonemodal', '']
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    // $('#candidateModalCenter').modal('show')
    this.getUserTempData();

  }

  ngOnInit() {
    this.userRoleForm = this.formBuilder.group({
      user_role: ['', Validators.required]
    })
    this.addressForm = this.formBuilder.group({
      street: ['', Validators.required],
      state: ['', Validators.required],
      zip_code: ['', Validators.required],
      landmark: ['', Validators.required],
      organization_strength: ['', Validators.required]
    })
    this.experienceTypeForm = this.formBuilder.group({
      experience_type: ['', Validators.required]
    })
    this.experienceDetailForm = this.formBuilder.group({
      designation: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      country: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      job_description: ['', Validators.required],
      currently_working: ['']
    })
    this.educationTypeForm = this.formBuilder.group({
      education_type: ['', Validators.required]
    })
    this.educationDetailForm = this.formBuilder.group({
      school_name: ['', Validators.required],
      degree: ['', Validators.required],
      field_of_study: ['', Validators.required]
    })
  }
  get userRole() { return this.userRoleForm.controls }
  get userAddress() { return this.addressForm.controls }
  get userExperienceType() { return this.experienceTypeForm.controls }
  get userExpDetails() { return this.experienceDetailForm.controls }
  get userEducationType() { return this.educationTypeForm.controls }
  get userEduDetails() { return this.educationDetailForm.controls }
  moveToNextModal(currentModal, nextModal) {
    $('#' + currentModal).addClass('fade');
    $('#' + nextModal).removeClass('fade');
    $('#' + nextModal).css('display', 'block');
    $('#' + currentModal).css('display', 'none');
    $('#' + currentModal).modal('hide');
    $('#' + nextModal).modal('show')
  }
  moveToPreviousModal(currentModal, prevModal) {
    $('#' + currentModal).addClass('fade');
    $('#' + prevModal).removeClass('fade');
    $('#' + currentModal).css('display', 'none');
    $('#' + prevModal).css('display', 'block');
    $('#' + currentModal).modal('hide');
    $('#' + prevModal).modal('show')
  }
  getUserTempData() {
    const localData = JSON.parse(sessionStorage.getItem('_ud'))[0]
    console.log(localData);
    const body = {
      "user_id": localData._id,
      "user_token": localData.user_token
    }
    this.authService.getTempUser(body).subscribe((data) => {
      console.log(data);
      if (data.data[0].temp_data !== undefined) {
        // $('#candidateModalCenter').modal('hide')
        const objectKeys = Object.keys(data.data[0].temp_data)
        console.log(objectKeys)
        const currentFormId = objectKeys[objectKeys.length - 1];
        const currentFormIndex = this.formIdArray.indexOf(objectKeys[objectKeys.length - 1])
        const openFormId = this.formIdArray[objectKeys.length];
        console.log(currentFormId, openFormId);
        this.moveToNextModal(currentFormId, openFormId)
      } else {
        $('#candidateModalCenter').modal('show')
      }
    })
  }
  userRoleFormSubmit(currentModal, nextModal) {
    this.userRoleSubmit = true;
    if (this.userRoleForm.valid) {
      console.log(this.userRoleForm)
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0]
      console.log(localData);
      const tempData = {};
      tempData[currentModal] = { "user_role": Number(this.userRoleForm.controls.user_role.value) }
      const body = {
        "user_id": localData._id,
        "user_token": localData.user_token,
        "temp_data": tempData
      }
      console.log(body)
      this.authService.saveTempUser(body).subscribe((res) => {
        this.moveToNextModal(currentModal, nextModal)
      })
    } else {
      return false;
    }
  }
  addressFormSubmit(currentModal, nextModal) {
    this.addressSubmit = true;
    if (this.addressForm.valid) {
      console.log(this.addressForm)
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0]
      console.log(localData);
      const tempData = {};
      tempData[currentModal] = {
        "address_details": {
          "street": this.addressForm.controls.street.value,
          "state": this.addressForm.controls.state.value,
          "zip_code": this.addressForm.controls.zip_code.value,
          "landmark": this.addressForm.controls.landmark.value,
          "organization_strength": this.addressForm.controls.organization_strength.value
        }
      }
      const body = {
        "user_id": localData._id,
        "user_token": localData.user_token,
        "temp_data": tempData
      }
      console.log(body)
      this.authService.saveTempUser(body).subscribe((res) => {
        this.moveToNextModal(currentModal, nextModal)
      })
    } else {
      return false;
    }
  }
  experienceTypeFormSubmit(currentModal, nextModal) {
    this.experienceTypeSubmit = true;
    if (this.experienceTypeForm.valid) {
      console.log(this.experienceTypeForm)
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0]
      console.log(localData);
      const tempData = {};
      tempData[currentModal] = {
        "experience_type": {
          "experience_type": this.experienceTypeForm.controls.experience_type.value,
        }
      }
      const body = {
        "user_id": localData._id,
        "user_token": localData.user_token,
        "temp_data": tempData
      }
      console.log(body)
      // this.authService.saveTempUser(body).subscribe((res) => {
      if (this.experienceTypeForm.controls.experience_type.value !== 'Experienced') {
        nextModal = 'candidateModalEducation';
        this.authService.saveTempUser(body).subscribe((res) => {
        })
      }
      this.moveToNextModal(currentModal, nextModal)
      // })
    } else {
      return false;
    }
  }
  experienceDetailsFormSubmit(currentModal, nextModal) {
    this.experienceDetailSubmit = true;
    if (this.experienceDetailForm.valid) {
      console.log(this.experienceDetailForm)
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0]
      console.log(localData);
      const tempData = {};
      tempData[currentModal] = {
        "experience_data": {
          "experience_type": this.experienceTypeForm.controls.experience_type.value,
          "experience_details": {
            "designation": this.experienceDetailForm.controls.designation.value,
            "company": this.experienceDetailForm.controls.company.value,
            "location": this.experienceDetailForm.controls.location.value,
            "country": this.experienceDetailForm.controls.country.value,
            "start_date": this.experienceDetailForm.controls.start_date.value,
            "end_date": this.experienceDetailForm.controls.end_date.value,
            "currently_working": this.experienceDetailForm.controls.currently_working.value,
            "job_description": this.experienceDetailForm.controls.job_description.value,
          }
        }
      }
      const body = {
        "user_id": localData._id,
        "user_token": localData.user_token,
        "temp_data": tempData
      }
      console.log(body)
      this.authService.saveTempUser(body).subscribe((res) => {
        // if (this.experienceTypeForm.controls.experience_type.value !== 'Experienced') {
        //   nextModal = 'candidateModallastbits';
        // }
        this.moveToNextModal(currentModal, nextModal)
      })
    } else {
      return false;
    }
  }
  educationTypeFormSubmit(currentModal, nextModal) {
    this.educationTypeSubmit = true;
    if (this.educationTypeForm.valid) {
      console.log(this.educationTypeForm)
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0]
      console.log(localData);
      const tempData = {};
      tempData[currentModal] = {
        "education_type": {
          "education_type": this.educationTypeForm.controls.education_type.value,
        }
      }
      const body = {
        "user_id": localData._id,
        "user_token": localData.user_token,
        "temp_data": tempData
      }
      console.log(body)
      // this.authService.saveTempUser(body).subscribe((res) => {
      if (this.educationTypeForm.controls.education_type.value !== 'Educated') {
        nextModal = 'candidateModallastbits';
        this.authService.saveTempUser(body).subscribe((res) => {
        })
      }
      this.moveToNextModal(currentModal, nextModal)
      // })
    } else {
      return false;
    }
  }
  educationDetailsFormSubmit(currentModal, nextModal) {
    this.educationDetailSubmit = true;
  }
}
