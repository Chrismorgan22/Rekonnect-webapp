import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import { LayoutService } from 'src/app/services/layout.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
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
  lastFewBitsDetailForm: FormGroup;
  lastFewBitsJoinDetailForm: FormGroup;
  onBoardDetailForm: FormGroup;
  userRoleSubmit: boolean = false;
  addressSubmit: boolean = false;
  experienceTypeSubmit: boolean = false;
  experienceDetailSubmit: boolean = false;
  educationTypeSubmit: boolean = false;
  educationDetailSubmit: boolean = false;
  lastFewBitsDetailSubmit: boolean = false;
  lastFewBitsJoinDetailsSubmit: boolean = false;
  onBoardDetailSubmit: boolean = false;
  monthDrp: any = [];
  yearDrp: any = [];
  stateDrp: any = [];
  locationDrp: any = [];
  countryDrp: any = [];
  dropdownList = [];
  technicaldropdownList = [];
  currentCareerDrp: any = [];
  languageDrp: any = [];
  selectedItems = [];
  dropdownSettings = {};
  formIdArray = ['candidateModalCenter', 'candidateModalCenterupload', 'candidateModalExperience', 'candidateModalEducation', 'candidateModallastbits', 'candidateModallastbitsfinal', 'gainmorevisibilitymodal', 'almostdonemodal']
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private layoutService: LayoutService, private _toastrService: ToastrService,
    private SpinnerService: NgxSpinnerService, private router: Router) {
    // $('#candidateModalCenter').modal('show')
    this.getUserTempData();

  }

  async ngOnInit() {
    this.monthDrp = moment.months();
    const year = moment().get('year');
    for (let i = 1999; i <= year; i++) {
      this.yearDrp.push(i);
    }
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
      currently_working: [false]
    })
    this.educationTypeForm = this.formBuilder.group({
      education_type: ['', Validators.required]
    })
    this.educationDetailForm = this.formBuilder.group({
      school_name: ['', Validators.required],
      degree: ['', Validators.required],
      field_of_study: ['', Validators.required],
      start_month: ['', Validators.required],
      start_year: ['', Validators.required],
      end_month: ['', Validators.required],
      end_year: ['', Validators.required],
      currently_studying: [false],
      grade: ['', Validators.required],
      description: ['', Validators.required]
    })
    this.lastFewBitsDetailForm = this.formBuilder.group({
      soft_skills: ['', Validators.required],
      technical_skills: ['', Validators.required],
      current_career: ['', Validators.required],
      changecareer: ['', Validators.required],
      change_career: [''],
      passion: ['', Validators.required],
      language: ['', Validators.required]
    })
    this.lastFewBitsJoinDetailForm = this.formBuilder.group({
      joining_status: ['', Validators.required],
      joining_within: ['']
    })
    this.onBoardDetailForm = this.formBuilder.group({
      onboard: [false]
    })
    this.dropdownList = [];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    await Promise.all([this.getStateList('State'), this.getLocationList('Location'), this.getCountryList('Country'),
    this.getSoftSkillsList('Soft_skills'), this.getTechnicalList('Technical_skills'), this.careerList('Career'), this.getLanguage('Language')])
  }
  get userRole() { return this.userRoleForm.controls }
  get userAddress() { return this.addressForm.controls }
  get userExperienceType() { return this.experienceTypeForm.controls }
  get userExpDetails() { return this.experienceDetailForm.controls }
  get userEducationType() { return this.educationTypeForm.controls }
  get userEduDetails() { return this.educationDetailForm.controls }
  get userSoftSkillDetails() { return this.lastFewBitsDetailForm.controls }
  get userjoiningDetails() { return this.lastFewBitsJoinDetailForm.controls }
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
        if (objectKeys.length !== 7) {
          const currentFormId = objectKeys[objectKeys.length - 1];
          const currentFormIndex = this.formIdArray.indexOf(objectKeys[objectKeys.length - 1])
          const openFormId = this.formIdArray[objectKeys.length];
          console.log(currentFormId, openFormId);
          this.moveToNextModal(currentFormId, openFormId)
        } else {
          this.router.navigate(['/dashboard/candidate'])
        }
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
          "state": JSON.parse(this.addressForm.controls.state.value),
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
      tempData['candidateModalExperience'] = {
        "experience_data": {
          "experience_type": this.experienceTypeForm.controls.experience_type.value,
          "experience_details": {
            "designation": this.experienceDetailForm.controls.designation.value,
            "company": this.experienceDetailForm.controls.company.value,
            "location": JSON.parse(this.experienceDetailForm.controls.location.value),
            "country": JSON.parse(this.experienceDetailForm.controls.country.value),
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
    if (this.educationDetailForm.valid) {
      console.log(this.educationDetailForm)
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0]
      console.log(localData);
      const tempData = {};
      tempData['candidateModalEducation'] = {
        "education_data": {
          "education_type": this.educationTypeForm.controls.education_type.value,
          "education_details": {
            "school_name": this.educationDetailForm.controls.school_name.value,
            "degree": this.educationDetailForm.controls.degree.value,
            "field_of_study": this.educationDetailForm.controls.field_of_study.value,
            "start_date": {
              "month": this.educationDetailForm.controls.start_month.value,
              "year": this.educationDetailForm.controls.start_year.value,
            },
            "end_date": {
              "month": this.educationDetailForm.controls.end_month.value,
              "year": this.educationDetailForm.controls.end_year.value,
            },
            "grade": this.educationDetailForm.controls.grade.value,
            "currently_studying": this.educationDetailForm.controls.currently_studying.value,
            "description": this.educationDetailForm.controls.description.value,
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
  radioCheck(event) {
    console.log(event.target.value);
    if (event.target.value === 'yes') {
      this.lastFewBitsDetailForm.get('change_career').setValidators(Validators.required);
    } else {
      this.lastFewBitsDetailForm.get('change_career').clearValidators();
    }
    this.lastFewBitsDetailForm.get('change_career').updateValueAndValidity();
  }
  lastFewBitsDetailsFormSubmit(currentModal, nextModal) {
    this.lastFewBitsDetailSubmit = true;
    console.log("lastFewBitsDetailFormSubmit", this.lastFewBitsDetailForm)
    if (this.lastFewBitsDetailForm.valid) {
      console.log(this.lastFewBitsDetailForm)
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0]
      console.log(localData);
      const tempData = {};
      tempData[currentModal] = {
        "last_few_bits": {
          "soft_skills": this.lastFewBitsDetailForm.controls.soft_skills.value,
          "technical_skills": this.lastFewBitsDetailForm.controls.technical_skills.value,
          "current_career": JSON.parse(this.lastFewBitsDetailForm.controls.current_career.value),
          "changecareer": this.lastFewBitsDetailForm.controls.changecareer.value,
          "change_career": this.lastFewBitsDetailForm.controls.change_career.value !== undefined && this.lastFewBitsDetailForm.controls.change_career.value !== null && this.lastFewBitsDetailForm.controls.change_career.value !== '' ? JSON.parse(this.lastFewBitsDetailForm.controls.change_career.value) : '',
          "passion": this.lastFewBitsDetailForm.controls.passion.value,
          "language": this.lastFewBitsDetailForm.controls.language.value,
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
  joiningStatus(value) {
    if (value === 'yes') {
      this.lastFewBitsJoinDetailForm.get('joining_within').setValidators(Validators.required);
    } else {
      this.lastFewBitsJoinDetailForm.get('joining_within').clearValidators();
    }
    this.lastFewBitsJoinDetailForm.get('joining_within').updateValueAndValidity();
  }
  lastFewBitsJoinDetailsFormSubmit(currentModal, nextModal) {
    this.lastFewBitsJoinDetailsSubmit = true;
    console.log(this.lastFewBitsJoinDetailForm)
    if (this.lastFewBitsJoinDetailForm.valid) {
      console.log(this.lastFewBitsJoinDetailForm)
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0]
      console.log(localData);
      const tempData = {};
      tempData[currentModal] = {
        "last_few_join": {
          "joining_status": this.lastFewBitsJoinDetailForm.controls.joining_status.value,
          "join_within": this.lastFewBitsJoinDetailForm.controls.joining_within.value,
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
  onBoardDetailsFormSubmit(currentModal, nextModal) {
    if (this.onBoardDetailForm.valid) {
      console.log(this.onBoardDetailForm)
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0]
      console.log(localData);
      const tempData = {};
      tempData[currentModal] = {
        "on_board": this.onBoardDetailForm.controls.onboard.value,

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
  async getStateList(type) {
    const body = {
      lookup_type: type
    }
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe(res => {
      res.data.map(ele => {
        const json = {
          id: ele._id,
          name: ele.name
        }
        drpJson.push(json);
      })
      this.stateDrp = drpJson;
    })
  }
  async getLocationList(type) {
    const body = {
      lookup_type: type
    }
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe(res => {
      res.data.map(ele => {
        const json = {
          id: ele._id,
          name: ele.name
        }
        drpJson.push(json);
      })
      this.locationDrp = drpJson;
    })
  }
  async getCountryList(type) {
    const body = {
      lookup_type: type
    }
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe(res => {
      res.data.map(ele => {
        const json = {
          id: ele._id,
          name: ele.name
        }
        drpJson.push(json);
      })
      this.countryDrp = drpJson;
    })
  }
  async getSoftSkillsList(type) {
    const body = {
      lookup_type: type
    }
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe(res => {
      res.data.map(ele => {
        const json = {
          id: ele._id,
          name: ele.name
        }
        drpJson.push(json);
      })
      this.dropdownList = drpJson;
    })
  }
  async getTechnicalList(type) {
    const body = {
      lookup_type: type
    }
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe(res => {
      res.data.map(ele => {
        const json = {
          id: ele._id,
          name: ele.name
        }
        drpJson.push(json);
      })
      this.technicaldropdownList = drpJson;
    })
  }
  async careerList(type) {
    const body = {
      lookup_type: type
    }
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe(res => {
      res.data.map(ele => {
        const json = {
          id: ele._id,
          name: ele.name
        }
        drpJson.push(json);
      })
      this.currentCareerDrp = drpJson;
    })
  }
  async getLanguage(type) {
    const body = {
      lookup_type: type
    }
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe(res => {
      res.data.map(ele => {
        const json = {
          id: ele._id,
          name: ele.name
        }
        drpJson.push(json);
      })
      this.languageDrp = drpJson;
    })
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  saveFinalData() {
    const localData = JSON.parse(sessionStorage.getItem('_ud'))[0]
    if (this.userRoleForm.controls.user_role.value === '1') {
      const json = {
        "user_id": localData._id,
        "profile_url": "wwww",
        "address_details": {
          "street": this.addressForm.controls.street.value,
          "state": JSON.parse(this.addressForm.controls.state.value),
          "zip_code": this.addressForm.controls.zip_code.value,
          "landmark": this.addressForm.controls.landmark.value,
          "organization_strength": this.addressForm.controls.organization_strength.value
        },
        "education_data": {
          "education_type": this.educationTypeForm.controls.education_type.value,
          "education_details": {
            "school_name": this.educationDetailForm.controls.school_name.value,
            "degree": this.educationDetailForm.controls.degree.value,
            "field_of_study": this.educationDetailForm.controls.field_of_study.value,
            "start_date": {
              "month": this.educationDetailForm.controls.start_month.value,
              "year": this.educationDetailForm.controls.start_year.value,
            },
            "end_date": {
              "month": this.educationDetailForm.controls.end_month.value,
              "year": this.educationDetailForm.controls.end_year.value,
            },
            "grade": this.educationDetailForm.controls.grade.value,
            "currently_studying": this.educationDetailForm.controls.currently_studying.value,
            "description": this.educationDetailForm.controls.description.value,
          }
        },
        "experience_data": {
          "experience_type": this.experienceTypeForm.controls.experience_type.value,
          "experience_details": {
            "designation": this.experienceDetailForm.controls.designation.value,
            "company": this.experienceDetailForm.controls.company.value,
            "location": JSON.parse(this.experienceDetailForm.controls.location.value),
            "country": JSON.parse(this.experienceDetailForm.controls.country.value),
            "start_date": this.experienceDetailForm.controls.start_date.value,
            "end_date": this.experienceDetailForm.controls.end_date.value,
            "currently_working": this.experienceDetailForm.controls.currently_working.value,
            "job_description": this.experienceDetailForm.controls.job_description.value,
          }
        },
        "soft_skills": this.lastFewBitsDetailForm.controls.soft_skills.value,
        "technical_skills": this.lastFewBitsDetailForm.controls.technical_skills.value,
        "current_career": JSON.parse(this.lastFewBitsDetailForm.controls.current_career.value),
        "changecareer": this.lastFewBitsDetailForm.controls.changecareer.value,
        "change_career": this.lastFewBitsDetailForm.controls.change_career.value !== undefined && this.lastFewBitsDetailForm.controls.change_career.value !== null && this.lastFewBitsDetailForm.controls.change_career.value !== '' ? JSON.parse(this.lastFewBitsDetailForm.controls.change_career.value) : '',
        "passion": this.lastFewBitsDetailForm.controls.passion.value,
        "languages": this.lastFewBitsDetailForm.controls.language.value,
        "joining_status": this.lastFewBitsJoinDetailForm.controls.joining_status.value,
        "join_within": this.lastFewBitsJoinDetailForm.controls.joining_within.value,
        "on_board": this.onBoardDetailForm.controls.onboard.value
      }
      console.log(json)
      this.SpinnerService.show()
      this.authService.saveCandidateRegistration(json).subscribe(res => {
        if (res.result === 'success') {
          const body = {
            user_id: localData._id
          }
          this.authService.updateCandidateStatus(body).subscribe(res => {
            this.SpinnerService.hide();
            this._toastrService.error(
              'Registration successfully', 'Success'
            )
          })
        }
        $('#almostdonemodal').modal('hide')
      })
    }
  }
}
