import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import { LayoutService } from 'src/app/services/layout.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
// import { Options } from "@angular-slider/ngx-slider";
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
  tempFormData: any = []
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
  dropdownSettings1 = {}
  companyTimeLineData: any = [];
  rangeValues: number[] = [0, 1000000];
  autoTicks = false;
  disabled = false;
  invert = false;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  // value = 0;
  vertical = false;
  tickInterval = 1;
  value: number = 0;
  highValue: number = 10000000;
  options = {
    floor: 0,
    ceil: 10000000
  };
  formIdArray = ['candidateModalCenter', 'candidateModalCenterupload', 'candidateModalExperience', 'candidateModalEducation', 'candidateModallastbits', 'candidateModallastbitsfinal', 'gainmorevisibilitymodal', 'almostdonemodal']
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private layoutService: LayoutService, private _toastrService: ToastrService,
    private SpinnerService: NgxSpinnerService, private router: Router) {
    // $('#candidateModalCenter').modal('show')

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
      end_date: [''],
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
      end_month: [''],
      end_year: [''],
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
      joining_within: [''],
      rangeValues: [[0, 10000000]],
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
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    }
    await Promise.all([this.getStateList('State'), this.getLocationList('Location'), this.getCountryList('Country'),

    this.getSoftSkillsList('Soft_skills'), this.getTechnicalList('Technical_skills'), this.careerList('Career'), this.getLanguage('Language'), this.getUserTempData()])
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
    console.log(localData);
    this.authService.getTempUser(body).subscribe((data) => {
      console.log(data);
      if (data.data[0].temp_data !== undefined) {
        this.tempFormData = data.data[0].temp_data
        // $('#candidateModalCenter').modal('hide')
        const objectKeys = Object.keys(data.data[0].temp_data)
        console.log(objectKeys)
        if (objectKeys.length !== 7 || localData.register_complete === false) {
          const currentFormId = objectKeys[objectKeys.length - 1];
          const currentFormIndex = this.formIdArray.indexOf(objectKeys[objectKeys.length - 1])
          const openFormId = this.formIdArray[objectKeys.length];
          console.log(currentFormId, openFormId);
          this.setUpFormData()
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
          "state": this.addressForm.controls.state.value[0],
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
        "experience_data": {
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
  checkWorkingStatus(event) {
    if (!event.target.checked) {
      this.experienceDetailForm.get('end_date').setValidators(Validators.required);
      this.experienceDetailForm.controls['end_date'].enable();
    } else {
      this.experienceDetailForm.controls['end_date'].disable();
      this.experienceDetailForm.get('end_date').clearValidators();
      this.experienceDetailForm.controls['end_date'].setValue('');
    }
    this.experienceDetailForm.get('end_date').updateValueAndValidity();
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
            "location": this.experienceDetailForm.controls.location.value[0],
            "country": this.experienceDetailForm.controls.country.value[0],
            "start_date": this.experienceDetailForm.controls.start_date.value,
            "end_date": this.experienceDetailForm.controls.end_date.value,
            "currently_working": this.experienceDetailForm.controls.currently_working.value,
            "job_description": this.experienceDetailForm.controls.job_description.value,
          },
          "timeline_details": [
            {
              "company_name": this.experienceDetailForm.controls.company.value,
              "total_experience": this.calculateExperience(this.experienceDetailForm.controls.start_date.value, this.experienceDetailForm.controls.end_date.value, this.experienceDetailForm.controls.currently_working.value),
            }
          ]
        }
      }
      const body = {
        "user_id": localData._id,
        "user_token": localData.user_token,
        "temp_data": tempData
      }
      console.log(body)
      this.authService.saveTempUser(body).subscribe((res) => {
        this.companyTimeLineData = body.temp_data['candidateModalExperience'].experience_data.timeline_details
        // if (this.experienceTypeForm.controls.experience_type.value !== 'Experienced') {
        //   nextModal = 'candidateModallastbits';
        // }
        this.moveToNextModal(currentModal, nextModal)
      })
    } else {
      return false;
    }
  }
  calculateExperience(startDate, endDate, currentlyWorking) {
    if (currentlyWorking) {

    } else {
      var endDates = moment(endDate);
      var startDates = moment(startDate);
      var diffDuration = moment.duration(endDates.diff(startDates));
      const year = diffDuration.years();
      const month = diffDuration.months();
      console.log(diffDuration.years()); // 8 years
      console.log(diffDuration.months()); // 5 months
      console.log(diffDuration.days()); // 2 days
      // console.log(year,month)
      return year + ' Years ' + month + ' months ';
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
        "education_data": {
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
  checkEducationStatus(event) {
    if (!event.target.checked) {
      this.educationDetailForm.get('end_month').setValidators(Validators.required);
      this.educationDetailForm.controls['end_month'].enable();
      this.educationDetailForm.get('end_year').setValidators(Validators.required);
      this.educationDetailForm.controls['end_year'].enable();
    } else {
      this.educationDetailForm.get('end_month').clearValidators();
      this.educationDetailForm.controls['end_month'].disable();
      this.educationDetailForm.get('end_year').clearValidators();
      this.educationDetailForm.controls['end_year'].disable();
      this.educationDetailForm.controls['end_month'].setValue('');
      this.educationDetailForm.controls['end_year'].setValue('');
    }
    this.educationDetailForm.get('end_month').updateValueAndValidity();
    this.educationDetailForm.get('end_year').updateValueAndValidity();
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
          "current_career": this.lastFewBitsDetailForm.controls.current_career.value[0],
          "changecareer": this.lastFewBitsDetailForm.controls.changecareer.value,
          "change_career": this.lastFewBitsDetailForm.controls.change_career.value !== undefined && this.lastFewBitsDetailForm.controls.change_career.value !== null && this.lastFewBitsDetailForm.controls.change_career.value !== '' ? this.lastFewBitsDetailForm.controls.change_career.value[0] : '',
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
    console.log(this.lastFewBitsJoinDetailForm.controls.rangeValues.value)
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
          "salary_range": {
            "min": this.lastFewBitsJoinDetailForm.controls.rangeValues.value[0],
            "max": this.lastFewBitsJoinDetailForm.controls.rangeValues.value[1]
          },
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

    // if (this.userRoleForm.controls.user_role.value === '1') {
    const json = {
      "user_id": localData._id,
      "profile_url": "wwww",
      "address_details": {
        "street": this.addressForm.controls.street.value,
        "state": this.addressForm.controls.state.value[0],
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
          "location": this.experienceDetailForm.controls.location.value[0],
          "country": this.experienceDetailForm.controls.country.value[0],
          "start_date": this.experienceDetailForm.controls.start_date.value,
          "end_date": this.experienceDetailForm.controls.end_date.value,
          "currently_working": this.experienceDetailForm.controls.currently_working.value,
          "job_description": this.experienceDetailForm.controls.job_description.value,
        }
      },
      "soft_skills": this.lastFewBitsDetailForm.controls.soft_skills.value,
      "technical_skills": this.lastFewBitsDetailForm.controls.technical_skills.value,

      "current_career": this.lastFewBitsDetailForm.controls.current_career.value[0],
      "changecareer": this.lastFewBitsDetailForm.controls.changecareer.value,
      "change_career": this.lastFewBitsDetailForm.controls.change_career.value !== undefined && this.lastFewBitsDetailForm.controls.change_career.value !== null && this.lastFewBitsDetailForm.controls.change_career.value !== '' ? this.lastFewBitsDetailForm.controls.change_career.value[0] : '',
      "passion": this.lastFewBitsDetailForm.controls.passion.value,
      "languages": this.lastFewBitsDetailForm.controls.language.value,
      "joining_status": this.lastFewBitsJoinDetailForm.controls.joining_status.value,
      "join_within": this.lastFewBitsJoinDetailForm.controls.joining_within.value,
      "salary_range": {
        "min": this.lastFewBitsJoinDetailForm.controls.rangeValues[0],
        "max": this.lastFewBitsJoinDetailForm.controls.rangeValues[1]
      },
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
      $('#almostdonemodal').modal('hide');
      this.getUserTempData();
    })
    // }
  }
  setUpFormData() {
    console.log(this.tempFormData)
    const objectKeys = Object.keys(this.tempFormData)
    console.log(objectKeys)
    if (objectKeys.length > 0) {
      if (objectKeys.includes('candidateModalCenter')) {
        console.log(this.tempFormData['candidateModalCenter'].user_role)
        this.userRoleForm.controls.user_role.setValue(this.tempFormData['candidateModalCenter'].user_role.toString());
        if (objectKeys.includes('candidateModalCenterupload')) {
          console.log(this.tempFormData['candidateModalCenterupload'].address_details.state.toString())
          this.addressForm.controls.street.setValue(this.tempFormData['candidateModalCenterupload'].address_details.street);
          this.addressForm.controls.state.setValue([this.tempFormData['candidateModalCenterupload'].address_details.state]);
          this.addressForm.controls.zip_code.setValue(this.tempFormData['candidateModalCenterupload'].address_details.zip_code);
          this.addressForm.controls.landmark.setValue(this.tempFormData['candidateModalCenterupload'].address_details.landmark);
          this.addressForm.controls.organization_strength.setValue(this.tempFormData['candidateModalCenterupload'].address_details.organization_strength);
          if (objectKeys.includes("candidateModalExperience")) {
            this.experienceTypeForm.controls.experience_type.setValue(this.tempFormData['candidateModalExperience'].experience_data.experience_type)
            if (this.tempFormData['candidateModalExperience'].experience_data.experience_type === "Experienced") {
              this.experienceDetailForm.controls.designation.setValue(this.tempFormData['candidateModalExperience'].experience_data.experience_details.designation)
              this.experienceDetailForm.controls.company.setValue(this.tempFormData['candidateModalExperience'].experience_data.experience_details.company)
              this.experienceDetailForm.controls.location.setValue([this.tempFormData['candidateModalExperience'].experience_data.experience_details.location])
              this.experienceDetailForm.controls.country.setValue([this.tempFormData['candidateModalExperience'].experience_data.experience_details.country])
              this.experienceDetailForm.controls.start_date.setValue(this.tempFormData['candidateModalExperience'].experience_data.experience_details.start_date)
              this.experienceDetailForm.controls.end_date.setValue(this.tempFormData['candidateModalExperience'].experience_data.experience_details.end_date)
              this.experienceDetailForm.controls.currently_working.setValue(this.tempFormData['candidateModalExperience'].experience_data.experience_details.currently_working)
              if (this.tempFormData['candidateModalExperience'].experience_data.experience_details.currently_working) {
                this.experienceDetailForm.controls['end_date'].disable();
                this.experienceDetailForm.controls.end_date.setValue('')
              }
              this.experienceDetailForm.controls.job_description.setValue(this.tempFormData['candidateModalExperience'].experience_data.experience_details.job_description)
              this.companyTimeLineData = this.tempFormData['candidateModalExperience'].experience_data.timeline_details
            }
            if (objectKeys.includes("candidateModalEducation")) {
              this.educationTypeForm.controls.education_type.setValue(this.tempFormData['candidateModalEducation'].education_data.education_type)
              if (this.tempFormData['candidateModalEducation'].education_data.education_type === "Educated") {
                this.educationDetailForm.controls.school_name.setValue(this.tempFormData['candidateModalEducation'].education_data.education_details.school_name)
                this.educationDetailForm.controls.degree.setValue(this.tempFormData['candidateModalEducation'].education_data.education_details.degree)
                this.educationDetailForm.controls.field_of_study.setValue(this.tempFormData['candidateModalEducation'].education_data.education_details.field_of_study)
                this.educationDetailForm.controls.start_month.setValue(this.tempFormData['candidateModalEducation'].education_data.education_details.start_date.month)
                this.educationDetailForm.controls.start_year.setValue(this.tempFormData['candidateModalEducation'].education_data.education_details.start_date.year)
                this.educationDetailForm.controls.end_month.setValue(this.tempFormData['candidateModalEducation'].education_data.education_details.end_date.month)
                this.educationDetailForm.controls.end_year.setValue(this.tempFormData['candidateModalEducation'].education_data.education_details.end_date.year)
                this.educationDetailForm.controls.currently_studying.setValue(this.tempFormData['candidateModalEducation'].education_data.education_details.currently_studying)
                if (this.tempFormData['candidateModalEducation'].education_data.education_details.currently_studying) {
                  this.educationDetailForm.controls.end_month.setValue('')
                  this.educationDetailForm.controls.end_year.setValue('')
                  this.educationDetailForm.controls.end_month.disable();
                  this.educationDetailForm.controls.end_year.disable();
                }
                this.educationDetailForm.controls.grade.setValue(this.tempFormData['candidateModalEducation'].education_data.education_details.grade)
                this.educationDetailForm.controls.description.setValue(this.tempFormData['candidateModalEducation'].education_data.education_details.description)
              }
              if (objectKeys.includes("candidateModallastbits")) {
                this.lastFewBitsDetailForm.controls.current_career.setValue([this.tempFormData['candidateModallastbits'].last_few_bits.current_career]);
                this.lastFewBitsDetailForm.controls.soft_skills.setValue(this.tempFormData['candidateModallastbits'].last_few_bits.soft_skills)
                this.lastFewBitsDetailForm.controls.technical_skills.setValue(this.tempFormData['candidateModallastbits'].last_few_bits.technical_skills)
                this.lastFewBitsDetailForm.controls.changecareer.setValue(this.tempFormData['candidateModallastbits'].last_few_bits.changecareer)
                this.lastFewBitsDetailForm.controls.change_career.setValue([this.tempFormData['candidateModallastbits'].last_few_bits.change_career])
                this.lastFewBitsDetailForm.controls.passion.setValue(this.tempFormData['candidateModallastbits'].last_few_bits.passion)
                this.lastFewBitsDetailForm.controls.language.setValue(this.tempFormData['candidateModallastbits'].last_few_bits.language)
                if (objectKeys.includes("candidateModallastbitsfinal")) {
                  this.lastFewBitsJoinDetailForm.controls.joining_status.setValue(this.tempFormData['candidateModallastbitsfinal'].last_few_join.joining_status)
                  this.lastFewBitsJoinDetailForm.controls.joining_within.setValue(this.tempFormData['candidateModallastbitsfinal'].last_few_join.join_within)
                  this.value = this.tempFormData['candidateModallastbitsfinal'].last_few_join.salary_range?.min !== undefined ? this.tempFormData['candidateModallastbitsfinal'].last_few_join.salary_range.min : 0;
                  this.highValue = this.tempFormData['candidateModallastbitsfinal'].last_few_join.salary_range?.max;
                  if (objectKeys.includes("gainmorevisibilitymodal")) {
                    this.onBoardDetailForm.controls.onboard.setValue(this.tempFormData['gainmorevisibilitymodal'].on_board)
                  }
                }
              }
            }
          }
        }
      }

    }
  }
}
