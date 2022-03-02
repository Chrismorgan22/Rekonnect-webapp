import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import { LayoutService } from 'src/app/services/layout.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload.service';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../../environments/environment';
import { SignupService } from '../../services/sign-up.service';
// import { Options } from "@angular-slider/
// ngx-slider";

declare var $: any;
@Component({
  selector: 'app-personalization',
  templateUrl: './personalization.component.html',
  styleUrls: ['./personalization.component.scss'],
})
export class PersonalizationComponent implements OnInit {
  userData: any;
  isSchoolNum: boolean = false;
  isPinError: boolean = false;

  goAhead: boolean = true;
  isDegreeNum: boolean = false;
  isStudyNum: boolean = false;
  completion: Number = 75;
  userRoleForm: FormGroup;
  addressForm: FormGroup;
  experienceTypeForm: FormGroup;
  experienceDetailForm: FormGroup;
  educationTypeForm: FormGroup;
  educationDetailForm: FormGroup;
  setCurrentCarrer: boolean = false;
  ischange: boolean = false;
  companyData: string[] = ['Goa', 'Mumbai', 'Pune'];
  lastFewBitsDetailForm: FormGroup;
  lastFewBitsJoinDetailForm: FormGroup;
  onBoardDetailForm: FormGroup;
  companydetailsForm: FormGroup;
  userRoleSubmit: boolean = false;
  addressSubmit: boolean = false;
  experienceTypeSubmit: boolean = false;
  isEducated: boolean = false;
  experienceDetailSubmit: boolean = false;
  educationTypeSubmit: boolean = false;
  educationDetailSubmit: boolean = false;
  lastFewBitsDetailSubmit: boolean = false;
  lastFewBitsJoinDetailsSubmit: boolean = false;
  onBoardDetailSubmit: boolean = false;
  companySubmit: boolean = false;
  tempFormData: any = [];
  monthDrp: any = [];
  yearDrp: any = [];
  stateDrp: any = [];
  locationDrp: any = [];
  countryDrp: any = [];
  dropdownList = [];
  cityDrp: any = [];
  technicaldropdownList = [];
  currentCareerDrp: any = [];
  languageDrp: any = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownSettings1 = {};
  companyTimeLineData: any = [];
  last_drawn: number[] = [0, 1000000];
  rangeValues: number[] = [0, 1000000];
  autoTicks = false;
  disabled = false;
  invert = false;
  companyLocations: any[];
  showTicks = false;
  cannotGo: boolean;
  isEmp: boolean;
  step = 1;
  thumbLabel = false;
  // value = 0;
  vertical = false;
  tickInterval = 1;
  currentCarrer: any;
  value: number = 1;
  todayDate: any;
  Dvalue: number = 1;
  DhighValue: number = 100;
  highValue: number = 100;
  options = {
    floor: 1,
    ceil: 100,
  };
  drawnOptions = {
    floor: 1,
    ceil: 100,
  };
  bucket = new S3({
    accessKeyId: environment.accessKeyId,
    secretAccessKey: environment.secretAccessKey,
    region: environment.region,
  });
  profileImagUrl: any = '';
  resumeFileUrl: any = '';
  visumeFileUrl: any = '';
  employerIdArray = [
    'candidateModalCenter',
    'candidateModalCenterupload',
    'companyDetailsModal',
  ];
  formIdArray = [
    'candidateModalCenter',
    'candidateModalCenterupload',
    'candidateModalExperience',
    'candidateModalEducation',
    'candidateModallastbits',
    'candidateModallastbitsfinal',
    'gainmorevisibilitymodal',
    'almostdonemodal',
  ];
  workingExpFlag: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private layoutService: LayoutService,
    private _toastrService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    private signupService: SignupService,
    private fileUploadService: FileUploadService
  ) {
    // $('#candidateModalCenter').modal('show')
  }

  getValue(): number {
    if (this.completion === 100) return 100;
    else return 75;
  }
  addCurrentCarrer(event: Event) {
    console.log('added');
    this.currentCarrer = (<HTMLInputElement>event.target).value;
    this.currentCareerDrp.push({
      id: 'someid',
      name: this.currentCarrer,
    });
    console.log(this.currentCareerDrp);
  }
  validatePin(event: Event) {
    const input = (<HTMLInputElement>event.target).value;
    console.log(input);
    console.log(parseInt(input));

    if (!parseInt(input)) {
      this.isPinError = true;
    } else {
      this.isPinError = false;
    }
    console.log(this.isPinError);
  }
  getwidth(): string {
    if (this.completion === 100) return '100%';
    else return '75%';
  }
  submitEducation(value: string): void {
    this.educationTypeForm.setValue({ education_type: value });
  }
  submitExp(value: string): void {
    this.experienceTypeForm.setValue({ experience_type: value });
  }
  submitRole(value: string): void {
    console.log(this.userRoleForm);
    this.userRoleForm.setValue({ user_role: value });
  }
  async ngOnInit() {
    this.monthDrp = moment.months();
    this.todayDate = moment(new Date()).format('yyyy-MM-DD');
    // this.signupService.tokenSubObservable$.subscribe((data) => {
    //   this.userData = data;
    //   console.log(data);
    // });
    const year = moment().get('year');
    for (let i = 1999; i <= year; i++) {
      this.yearDrp.push(i);
    }
    // (<FormArray>this.experienceDetailForm.get('experienceDetails')).clear();
    this.userRoleForm = this.formBuilder.group({
      user_role: ['', Validators.required],
    });
    this.addressForm = this.formBuilder.group({
      street: ['', Validators.required],
      state: ['', Validators.required],
      zip_code: ['', Validators.required],
      landmark: ['', Validators.required],
      // organization_strength: ['', Validators.required]
    });
    this.experienceTypeForm = this.formBuilder.group({
      experience_type: ['', Validators.required],
    });
    this.experienceDetailForm = this.formBuilder.group({
      experienceDetails: this.formBuilder.array([this.addExperienceDetails()]),
    });
    console.log(this.experienceDetailForm);
    this.educationTypeForm = this.formBuilder.group({
      education_type: ['', Validators.required],
    });
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
      description: ['', Validators.required],
    });
    this.lastFewBitsDetailForm = this.formBuilder.group({
      soft_skills: [[]],
      technical_skills: [[]],
      current_career: [[]],
      changecareer: [false],
      change_career: [''],
      passion: ['', Validators.required],
      language: ['', Validators.required],
    });
    this.lastFewBitsJoinDetailForm = this.formBuilder.group({
      joining_status: ['yes', Validators.required],
      joining_within: [''],
      rangeValues: [[0, 10000000]],
      last_drawn: [[0, 10000000]],
    });
    this.onBoardDetailForm = this.formBuilder.group({
      onboard: [false],
    });
    this.companydetailsForm = this.formBuilder.group({
      company_name: ['', Validators.required],

      no_of_employees: ['', Validators.required],
      company_website: ['', Validators.required],
      linkedin_url: ['', Validators.required],
      official_mail_address: ['', Validators.required],
    });
    this.dropdownList = [];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
    await Promise.all([
      this.getStateList('State'),
      this.getLocationList('Location'),
      this.getCountryList('Country'),

      this.getSoftSkillsList('Soft_skills'),
      this.getTechnicalList('Technical_skills'),
      this.careerList('Career'),
      this.getLanguage('Language'),
      this.getUserTempData(),
      this.getCityList('City'),
    ]);
  }

  onLocationSelectAll(event: any) {}
  onLocationItemSelect(event: Event) {
    console.log((<HTMLInputElement>event.target).value);
    // console.log(this.companyLocations);
    // this.companyLocations.push(item);
  }
  addButtonClick(): void {
    if (
      this.experienceDetailForm.controls.experienceDetails['controls'].length <
      10
    ) {
      (<FormArray>this.experienceDetailForm.get('experienceDetails')).push(
        this.addExperienceDetails()
      );
    } else {
      this._toastrService.warning(
        'Warning',
        'Maximum upto 10 numbers of experience can be added'
      );
    }

    console.log('this.', this.experienceDetailForm.controls.experienceDetails);
  }
  removeExperience(i) {
    this.experienceDetailForm.controls.experienceDetails['controls'].splice(
      i,
      1
    );
  }
  setMinData() {
    if (
      this.experienceDetailForm?.controls &&
      this.experienceDetailForm?.controls.experienceDetails['controls'].length >
        1
    ) {
      return this.userExpDetails.experienceDetails['controls'][
        this.userExpDetails.experienceDetails['controls'].length - 2
      ].controls.end_date.value;
    }
  }
  addExperienceDetails(): FormGroup {
    return this.formBuilder.group({
      company: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      other_city: [''],
      start_date: ['', Validators.required],
      end_date: [''],
      job_description: ['', Validators.required],
      currently_working: [false],
    });
  }
  get userRole() {
    return this.userRoleForm.controls;
  }
  get userAddress() {
    return this.addressForm.controls;
  }
  get userExperienceType() {
    return this.experienceTypeForm.controls;
  }
  get userExpDetails() {
    return this.experienceDetailForm.controls;
  }
  get userEducationType() {
    return this.educationTypeForm.controls;
  }
  get userEduDetails() {
    return this.educationDetailForm.controls;
  }
  get userSoftSkillDetails() {
    return this.lastFewBitsDetailForm.controls;
  }
  get userjoiningDetails() {
    return this.lastFewBitsJoinDetailForm.controls;
  }
  get companyDetails() {
    return this.companydetailsForm.controls;
  }
  moveToNextModal(currentModal, nextModal) {
    $('#' + currentModal).addClass('fade');
    $('#' + nextModal).removeClass('fade');
    $('#' + nextModal).css('display', 'block');
    $('#' + currentModal).css('display', 'none');
    $('#' + currentModal).modal('hide');
    $('#' + nextModal).modal('show');
  }
  moveToPreviousModal(currentModal, prevModal) {
    $('#' + currentModal).addClass('fade');
    $('#' + prevModal).removeClass('fade');
    $('#' + currentModal).css('display', 'none');
    $('#' + prevModal).css('display', 'block');
    $('#' + currentModal).modal('hide');
    $('#' + prevModal).modal('show');
  }
  getUserTempData() {
    const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
    console.log(localData);
    const body = {
      user_id: localData._id,
      user_token: localData.user_token,
    };
    console.log(localData);
    this.authService.getTempUser(body).subscribe((data) => {
      console.log(data);
      if (data?.data[0].temp_data !== undefined) {
        this.tempFormData = data.data[0].temp_data;
        console.log(this.tempFormData);
        // $('#candidateModalCenter').modal('hide')
        const objectKeys = Object.keys(data.data[0].temp_data);
        console.log(objectKeys);
        let currentFormId;
        let openFormId;
        currentFormId = objectKeys[objectKeys.length - 1];
        console.log(this.userRoleForm.controls.user_role.value);
        if (
          this.tempFormData['candidateModalCenter']?.user_role === '1' ||
          this.tempFormData['candidateModalCenter']?.user_role === 1 ||
          this.userRoleForm.controls.user_role.value === '1' ||
          this.userRoleForm.controls.user_role.value === 1
        ) {
          if (
            objectKeys.length !== 7 &&
            localData.register_complete === false
          ) {
            openFormId = this.formIdArray[objectKeys.length];
            this.setUpFormData();
            this.moveToNextModal(currentFormId, openFormId);
          } else {
            this.router.navigate(['/dashboard/candidate']);
          }
        } else {
          if (
            objectKeys.length !== 2 &&
            localData.register_complete === false
          ) {
            openFormId = this.employerIdArray[objectKeys.length];
            this.setUpEmployerFormData();
            this.moveToNextModal(currentFormId, openFormId);
          } else {
            this.router.navigate(['/dashboard/employer']);
          }
        }
      } else {
        $('#candidateModalCenter').modal('show');
      }
    });
  }
  userRoleFormSubmit(currentModal, nextModal) {
    this.userRoleSubmit = true;
    console.log(this.isEmp);

    if (this.userRoleForm.valid) {
      console.log(this.userRoleForm);
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
      console.log(localData);
      const tempData = {};
      tempData[currentModal] = {
        user_role: Number(this.userRoleForm.controls.user_role.value),
      };
      const body = {
        user_id: localData._id,
        user_token: localData.user_token,
        temp_data: tempData,
      };
      console.log(body);
      localData['role'] = Number(this.userRoleForm.controls.user_role.value);
      sessionStorage.setItem('_ud', JSON.stringify([localData]));
      this.authService.userRegister(this.userData).subscribe((data) => {
        console.log('user reg!');
      });
      this.authService.saveTempUser(body).subscribe((res) => {
        this.moveToNextModal(currentModal, nextModal);
      });
    } else {
      return false;
    }
  }
  addressFormSubmit(currentModal, nextModal) {
    this.addressSubmit = true;
    if (this.addressForm.valid) {
      console.log(this.addressForm);
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
      console.log(localData);
      const tempData = {};
      console.log(this.profileImagUrl);
      tempData[currentModal] = {
        address_details: {
          profile_url: this.profileImagUrl,
          street: this.addressForm.controls.street.value,
          state: this.addressForm.controls.state.value[0],
          zip_code: this.addressForm.controls.zip_code.value,
          landmark: this.addressForm.controls.landmark.value,
          // "organization_strength": this.addressForm.controls.organization_strength.value
        },
      };
      const body = {
        user_id: localData._id,
        user_token: localData.user_token,
        temp_data: tempData,
      };
      console.log(body);
      this.authService.saveTempUser(body).subscribe((res) => {
        if (
          this.tempFormData['candidateModalCenter']?.user_role === '1' ||
          this.tempFormData['candidateModalCenter']?.user_role === 1 ||
          this.userRoleForm.controls.user_role.value === '1' ||
          this.userRoleForm.controls.user_role.value === 1
        ) {
          this.moveToNextModal(currentModal, nextModal);
        } else {
          this.moveToNextModal(currentModal, 'companyDetailsModal');
        }
      });
    } else {
      return false;
    }
  }

  toggleEmp(term: string) {
    if (term == 'yes') {
      this.isEmp = true;
    } else {
      this.isEmp = false;
    }
  }
  experienceTypeFormSubmit(currentModal, nextModal) {
    this.experienceTypeSubmit = true;
    if (this.experienceTypeForm.valid) {
      console.log(this.experienceTypeForm);
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
      console.log(localData);
      const tempData = {};
      tempData[currentModal] = {
        experience_data: {
          experience_type:
            this.experienceTypeForm.controls.experience_type.value,
        },
      };
      const body = {
        user_id: localData._id,
        user_token: localData.user_token,
        temp_data: tempData,
      };
      console.log(body);
      this.authService.saveTempUser(body).subscribe((res) => {
        if (
          this.experienceTypeForm.controls.experience_type.value !==
          'Experienced'
        ) {
          nextModal = 'candidateModallastbits';
        } else {
          nextModal = 'candidateModalcenterexperience';
        }
        this.moveToNextModal(currentModal, nextModal);
      });
    } else {
      return false;
    }
  }
  checkWorkingStatus(event, experienceControl) {
    if (!event.target.checked) {
      experienceControl.get('end_date').setValidators(Validators.required);
      experienceControl.controls['end_date'].enable();
      this.workingExpFlag = false;
    } else {
      experienceControl.controls['end_date'].disable();
      experienceControl.get('end_date').clearValidators();
      experienceControl.controls['end_date'].setValue('');
      this.workingExpFlag = true;
    }
    experienceControl.get('end_date').updateValueAndValidity();
  }
  experienceDetailsFormSubmit(currentModal, nextModal) {
    this.experienceDetailSubmit = true;
    if (this.experienceDetailForm.valid) {
      console.log(this.experienceDetailForm);
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
      console.log(localData);
      const experienceArray = [];
      const timelineArray = [];
      this.experienceDetailForm.controls.experienceDetails['controls'].map(
        (ele) => {
          const json = {
            company: ele.controls.company.value,
            state: ele.controls.state.value[0],
            city: ele.controls.city.value[0],
            other_city: ele.controls.other_city.value,
            start_date: ele.controls.start_date.value,
            end_date: ele.controls.end_date.value,
            currently_working: ele.controls.currently_working.value,
            job_description: ele.controls.job_description.value,
          };
          experienceArray.push(json);
          const timelineJson = {
            company_name: ele.controls.company.value,
            total_experience: this.calculateExperience(
              ele.controls.start_date.value,
              ele.controls.end_date.value,
              ele.controls.currently_working.value
            ),
          };
          timelineArray.push(timelineJson);
        }
      );
      const tempData = {};
      tempData['candidateModalExperience'] = {
        experience_data: {
          experience_type:
            this.experienceTypeForm.controls.experience_type.value,
          experience_details: experienceArray,
          timeline_details: timelineArray,
        },
      };
      const body = {
        user_id: localData._id,
        user_token: localData.user_token,
        temp_data: tempData,
      };
      console.log(body);
      this.authService.saveTempUser(body).subscribe((res) => {
        this.companyTimeLineData =
          body.temp_data[
            'candidateModalExperience'
          ].experience_data.timeline_details;
        // if (
        //   this.experienceTypeForm.controls.experience_type.value !==
        //   'Experienced'
        // ) {
        //   nextModal = 'candidateModallastbits';
        // }else{
        // nextModal = 'candidateModalcenterexperience';
        // }
        this.moveToNextModal(currentModal, nextModal);
      });
    } else {
      return false;
    }
    // } else {
    //   return false;
    // }
  }
  calculateExperience(startDate, endDate, currentlyWorking) {
    if (currentlyWorking) {
      return 'Currently Working';
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
  educationFix() {
    // this.educationTypeSubmit = true;
    this.isEducated = true;
  }
  educationTypeFormSubmit(currentModal, nextModal) {
    this.educationTypeSubmit = true;
    if (this.educationTypeForm.valid) {
      console.log(this.educationTypeForm);
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
      console.log(localData);
      const tempData = {};
      tempData[currentModal] = {
        education_data: {
          education_type: this.educationTypeForm.controls.education_type.value,
        },
      };
      const body = {
        user_id: localData._id,
        user_token: localData.user_token,
        temp_data: tempData,
      };
      console.log(body);
      // this.authService.saveTempUser(body).subscribe((res) => {
      if (this.educationTypeForm.controls.education_type.value !== 'Educated') {
        nextModal = 'candidateModalExperience';
        this.authService.saveTempUser(body).subscribe((res) => {});
      } else {
        nextModal = 'candidateModalcentereducation';
      }
      this.moveToNextModal(currentModal, nextModal);
      // })
    } else {
      return false;
    }
  }
  checkEducationStatus(event) {
    if (!event.target.checked) {
      this.educationDetailForm
        .get('end_month')
        .setValidators(Validators.required);
      this.educationDetailForm.controls['end_month'].enable();
      this.educationDetailForm
        .get('end_year')
        .setValidators(Validators.required);
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

    const numbers: String[] = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ];

    for (let num in numbers) {
      if (
        this.educationDetailForm.controls.school_name.value.search(num) >= 0
      ) {
        console.log('Input fields has to be in Alphabets');
        this.isSchoolNum = true;
      }
      if (this.educationDetailForm.controls.degree.value.search(num) >= 0) {
        this.isDegreeNum = true;
        console.log('Input fields has to be in Alphabets');
      }

      if (
        this.educationDetailForm.controls.field_of_study.value.search(num) >= 0
      ) {
        console.log('Input fields has to be in Alphabets');
        this.isStudyNum = true;
      }
    }

    if (this.isStudyNum || this.isDegreeNum || this.isStudyNum) return;

    if (
      this.educationDetailForm.controls.end_month.value === '' ||
      this.educationDetailForm.controls.end_year.value === ''
    ) {
      console.log('end dates empty!!');
    }

    if (this.educationDetailForm.valid) {
      console.log(this.educationDetailForm);
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
      console.log(localData);
      const tempData = {};
      tempData['candidateModalEducation'] = {
        education_data: {
          education_type: this.educationTypeForm.controls.education_type.value,
          education_details: {
            school_name: this.educationDetailForm.controls.school_name.value,
            degree: this.educationDetailForm.controls.degree.value,
            field_of_study:
              this.educationDetailForm.controls.field_of_study.value,
            start_date: {
              month: this.educationDetailForm.controls.start_month.value,
              year: this.educationDetailForm.controls.start_year.value,
            },
            end_date: {
              month: this.educationDetailForm.controls.end_month.value,
              year: this.educationDetailForm.controls.end_year.value,
            },
            grade: this.educationDetailForm.controls.grade.value,
            currently_studying:
              this.educationDetailForm.controls.currently_studying.value,
            description: this.educationDetailForm.controls.description.value,
          },
        },
      };
      const body = {
        user_id: localData._id,
        user_token: localData.user_token,
        temp_data: tempData,
      };
      console.log(body);
      this.authService.saveTempUser(body).subscribe((res) => {
        // if (
        //   this.experienceTypeForm.controls.experience_type.value !==
        //   'Experienced'
        // ) {
        //   nextModal = 'candidateModallastbits';
        // }
        // nextModal = 'candidateModallastbits';
        this.moveToNextModal(currentModal, nextModal);
      });
    } else {
      return false;
    }
  }
  radioCheck(event) {
    console.log(event.target.value);
    if (event.target.value === 'yes') {
      this.lastFewBitsDetailForm.get('change_career').clearValidators();
      this.ischange = true;
    } else {
      this.lastFewBitsDetailForm.get('change_career').clearValidators();
      this.ischange = false;
    }
    this.lastFewBitsDetailForm.get('change_career').updateValueAndValidity();
  }
  lastFewBitsDetailsFormSubmit(currentModal, nextModal) {
    this.lastFewBitsDetailSubmit = true;
    console.log('lastFewBitsDetailFormSubmit', this.lastFewBitsDetailForm);
    if (this.lastFewBitsDetailForm.valid) {
      console.log(this.lastFewBitsDetailForm);
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
      console.log(localData);
      const tempData = {};

      if (this.setCurrentCarrer) {
        tempData[currentModal] = {
          last_few_bits: {
            soft_skills: this.lastFewBitsDetailForm.controls.soft_skills.value,
            technical_skills:
              this.lastFewBitsDetailForm.controls.technical_skills.value,
            current_career: this.currentCarrer,
            changecareer:
              this.lastFewBitsDetailForm.controls.changecareer.value,
            change_career:
              this.lastFewBitsDetailForm.controls.change_career.value !==
                undefined &&
              this.lastFewBitsDetailForm.controls.change_career.value !==
                null &&
              this.lastFewBitsDetailForm.controls.change_career.value !== ''
                ? this.lastFewBitsDetailForm.controls.change_career.value[0]
                : '',
            passion: this.lastFewBitsDetailForm.controls.passion.value,
            language: this.lastFewBitsDetailForm.controls.language.value,
          },
        };
      } else {
        tempData[currentModal] = {
          last_few_bits: {
            soft_skills: this.lastFewBitsDetailForm.controls.soft_skills.value,
            technical_skills:
              this.lastFewBitsDetailForm.controls.technical_skills.value,
            current_career:
              this.lastFewBitsDetailForm.controls.current_career.value[0],
            changecareer:
              this.lastFewBitsDetailForm.controls.changecareer.value,
            change_career:
              this.lastFewBitsDetailForm.controls.change_career.value !==
                undefined &&
              this.lastFewBitsDetailForm.controls.change_career.value !==
                null &&
              this.lastFewBitsDetailForm.controls.change_career.value !== ''
                ? this.lastFewBitsDetailForm.controls.change_career.value[0]
                : '',
            passion: this.lastFewBitsDetailForm.controls.passion.value,
            language: this.lastFewBitsDetailForm.controls.language.value,
          },
        };
      }

      const body = {
        user_id: localData._id,
        user_token: localData.user_token,
        temp_data: tempData,
      };
      console.log(body);
      this.authService.saveTempUser(body).subscribe((res) => {
        // if (this.experienceTypeForm.controls.experience_type.value !== 'Experienced') {
        //   nextModal = 'candidateModallastbits';
        // }
        this.moveToNextModal(currentModal, nextModal);
      });
    } else {
      return false;
    }
  }
  joiningStatus(value) {
    if (value === 'yes') {
      this.goAhead = true;
      this.lastFewBitsJoinDetailForm
        .get('joining_within')
        .setValidators(Validators.required);
    } else {
      this.goAhead = false;
      this.lastFewBitsJoinDetailForm.get('joining_within').clearValidators();
    }
    this.lastFewBitsJoinDetailForm
      .get('joining_within')
      .updateValueAndValidity();
  }
  lastFewBitsJoinDetailsFormSubmit(currentModal, nextModal) {
    this.lastFewBitsJoinDetailsSubmit = true;
    console.log(this.lastFewBitsJoinDetailForm.controls.rangeValues.value);
    console.log(this.lastFewBitsJoinDetailForm);
    if (this.lastFewBitsJoinDetailForm.valid) {
      console.log(this.lastFewBitsJoinDetailForm);
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
      console.log(localData);
      const tempData = {};
      tempData[currentModal] = {
        last_few_join: {
          joining_status:
            this.lastFewBitsJoinDetailForm.controls.joining_status.value,
          join_within:
            this.lastFewBitsJoinDetailForm.controls.joining_within.value,
          salary_range: {
            min: this.value,
            max: this.highValue,
          },
          last_drawn_salary_range: {
            min: this.Dvalue,
            max: this.DhighValue,
          },
          resume_url: this.resumeFileUrl,
          visume_url: this.visumeFileUrl,
        },
      };
      const body = {
        user_id: localData._id,
        user_token: localData.user_token,
        temp_data: tempData,
      };
      console.log(body);
      this.authService.saveTempUser(body).subscribe((res) => {
        // if (this.experienceTypeForm.controls.experience_type.value !== 'Experienced') {
        //   nextModal = 'candidateModallastbits';
        // }
        this.moveToNextModal(currentModal, nextModal);
      });
    } else {
      return false;
    }
  }
  onBoardDetailsFormSubmit(currentModal, nextModal) {
    if (this.onBoardDetailForm.valid) {
      console.log(this.onBoardDetailForm);
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
      console.log(localData);
      const tempData = {};
      tempData[currentModal] = {
        on_board: this.onBoardDetailForm.controls.onboard.value,
      };
      const body = {
        user_id: localData._id,
        user_token: localData.user_token,
        temp_data: tempData,
      };
      console.log(body);
      this.authService.saveTempUser(body).subscribe((res) => {
        // if (this.experienceTypeForm.controls.experience_type.value !== 'Experienced') {
        //   nextModal = 'candidateModallastbits';
        // }
        this.moveToNextModal(currentModal, nextModal);
      });
    } else {
      return false;
    }
  }
  async getStateList(type) {
    const body = {
      lookup_type: type,
    };
    const drpJson = [];
    this.layoutService.getStateList().subscribe((res) => {
      res.data.states?.map((ele) => {
        const json = {
          id: ele.state_code,
          name: ele.name,
        };
        drpJson.push(json);
      });
      this.stateDrp = drpJson;
    });
  }
  async getLocationList(type) {
    const body = {
      lookup_type: type,
    };
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe((res) => {
      res.data?.map((ele) => {
        const json = {
          id: ele._id,
          name: ele.name,
        };
        drpJson.push(json);
      });
      this.locationDrp = drpJson;
    });
  }
  async getCountryList(type) {
    const body = {
      lookup_type: type,
    };
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe((res) => {
      res.data?.map((ele) => {
        const json = {
          id: ele._id,
          name: ele.name,
        };
        drpJson.push(json);
      });
      this.countryDrp = drpJson;
    });
  }
  async getCityList(type) {
    const body = {
      lookup_type: type,
    };
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe((res) => {
      res.data?.map((ele) => {
        const json = {
          id: ele._id,
          name: ele.name,
        };
        drpJson.push(json);
      });
      this.cityDrp = drpJson;
    });
  }
  async getSoftSkillsList(type) {
    const body = {
      lookup_type: type,
    };
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe((res) => {
      res.data?.map((ele) => {
        const json = {
          id: ele._id,
          name: ele.name,
        };
        drpJson.push(json);
      });
      this.dropdownList = drpJson;
    });
  }
  async getTechnicalList(type) {
    const body = {
      lookup_type: type,
    };
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe((res) => {
      res.data?.map((ele) => {
        const json = {
          id: ele._id,
          name: ele.name,
        };
        drpJson.push(json);
      });
      this.technicaldropdownList = drpJson;
    });
  }
  async careerList(type) {
    const body = {
      lookup_type: type,
    };
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe((res) => {
      res.data?.map((ele) => {
        const json = {
          id: ele._id,
          name: ele.name,
        };
        drpJson.push(json);
      });
      this.currentCareerDrp = drpJson;
    });
  }
  async getLanguage(type) {
    const body = {
      lookup_type: type,
    };
    const drpJson = [];
    this.layoutService.getLookupList(body).subscribe((res) => {
      res.data?.map((ele) => {
        const json = {
          id: ele._id,
          name: ele.name,
        };
        drpJson.push(json);
      });
      this.languageDrp = drpJson;
    });
  }
  onItemSelect(item: any) {
    console.log(item);

    if (item.name == 'others') {
      this.setCurrentCarrer = true;
    } else {
      this.setCurrentCarrer = false;
    }
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onCityItemSelect(item: any, experienceControl) {
    if (item.name === 'Other') {
      experienceControl.get('other_city').setValidators(Validators.required);
      experienceControl.controls['other_city'].enable();
    } else {
      experienceControl.controls['other_city'].disable();
      experienceControl.get('other_city').clearValidators();
      experienceControl.controls['other_city'].setValue('');
    }
    experienceControl.get('other_city').updateValueAndValidity();
    console.log(item);
  }
  saveFinalData() {
    const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
    const experienceArray = [];
    const timelineArray = [];
    if (this.experienceTypeForm.controls.experience_type.value !== 'Fresher') {
      this.experienceDetailForm.controls.experienceDetails['controls']?.map(
        (ele) => {
          const json = {
            company: ele.controls.company.value,
            state: ele.controls.state.value[0],
            city: ele.controls.city.value[0],
            other_city: ele.controls.other_city.value,
            start_date: ele.controls.start_date.value,
            end_date: ele.controls.end_date.value,
            currently_working: ele.controls.currently_working.value,
            job_description: ele.controls.job_description.value,
          };
          experienceArray.push(json);
        }
      );
    }
    var json = {};
    // if (this.userRoleForm.controls.user_role.value === '1') {
    if (this.setCurrentCarrer) {
      json = {
        user_id: localData._id,
        profile_url: this.profileImagUrl,
        address_details: {
          street: this.addressForm.controls.street.value,
          state: this.addressForm.controls.state.value[0],
          zip_code: this.addressForm.controls.zip_code.value,
          landmark: this.addressForm.controls.landmark.value,
          // "organization_strength": this.addressForm.controls.organization_strength.value
        },
        education_data: {
          education_type: this.educationTypeForm.controls.education_type.value,
          education_details: {
            school_name: this.educationDetailForm.controls.school_name.value,
            degree: this.educationDetailForm.controls.degree.value,
            field_of_study:
              this.educationDetailForm.controls.field_of_study.value,
            start_date: {
              month: this.educationDetailForm.controls.start_month.value,
              year: this.educationDetailForm.controls.start_year.value,
            },
            end_date: {
              month: this.educationDetailForm.controls.end_month.value,
              year: this.educationDetailForm.controls.end_year.value,
            },
            grade: this.educationDetailForm.controls.grade.value,
            currently_studying:
              this.educationDetailForm.controls.currently_studying.value,
            description: this.educationDetailForm.controls.description.value,
          },
        },
        experience_data: {
          experience_type:
            this.experienceTypeForm.controls.experience_type.value,
          experience_details: experienceArray,
        },
        soft_skills: this.lastFewBitsDetailForm.controls.soft_skills.value,
        technical_skills:
          this.lastFewBitsDetailForm.controls.technical_skills.value,
        resume_url: this.resumeFileUrl,
        visume_url: this.visumeFileUrl,
        current_career: {
          id: '61ea49cce6d0655fd08e759z',
          name: this.currentCarrer,
        },
        changecareer: this.lastFewBitsDetailForm.controls.changecareer.value,
        change_career:
          this.lastFewBitsDetailForm.controls.change_career.value !==
            undefined &&
          this.lastFewBitsDetailForm.controls.change_career.value !== null &&
          this.lastFewBitsDetailForm.controls.change_career.value !== ''
            ? this.lastFewBitsDetailForm.controls.change_career.value[0]
            : '',
        passion: this.lastFewBitsDetailForm.controls.passion.value,
        languages: this.lastFewBitsDetailForm.controls.language.value,
        joining_status:
          this.lastFewBitsJoinDetailForm.controls.joining_status.value,
        join_within:
          this.lastFewBitsJoinDetailForm.controls.joining_within.value,
        salary_range: {
          min: this.value,
          max: this.highValue,
        },
        last_drawn_salary_range: {
          min: this.Dvalue,
          max: this.DhighValue,
        },
        on_board: this.onBoardDetailForm.controls.onboard.value,
      };
    } else {
      json = {
        user_id: localData._id,
        profile_url: this.profileImagUrl,
        address_details: {
          street: this.addressForm.controls.street.value,
          state: this.addressForm.controls.state.value[0],
          zip_code: this.addressForm.controls.zip_code.value,
          landmark: this.addressForm.controls.landmark.value,
          // "organization_strength": this.addressForm.controls.organization_strength.value
        },
        education_data: {
          education_type: this.educationTypeForm.controls.education_type.value,
          education_details: {
            school_name: this.educationDetailForm.controls.school_name.value,
            degree: this.educationDetailForm.controls.degree.value,
            field_of_study:
              this.educationDetailForm.controls.field_of_study.value,
            start_date: {
              month: this.educationDetailForm.controls.start_month.value,
              year: this.educationDetailForm.controls.start_year.value,
            },
            end_date: {
              month: this.educationDetailForm.controls.end_month.value,
              year: this.educationDetailForm.controls.end_year.value,
            },
            grade: this.educationDetailForm.controls.grade.value,
            currently_studying:
              this.educationDetailForm.controls.currently_studying.value,
            description: this.educationDetailForm.controls.description.value,
          },
        },

        experience_data: {
          experience_type:
            this.experienceTypeForm.controls.experience_type.value,
          experience_details: experienceArray,
        },
        soft_skills: this.lastFewBitsDetailForm.controls.soft_skills.value,
        technical_skills:
          this.lastFewBitsDetailForm.controls.technical_skills.value,
        resume_url: this.resumeFileUrl,
        visume_url: this.visumeFileUrl,
        current_career:
          this.lastFewBitsDetailForm.controls.current_career.value[0],
        changecareer: this.lastFewBitsDetailForm.controls.changecareer.value,
        change_career:
          this.lastFewBitsDetailForm.controls.change_career.value !==
            undefined &&
          this.lastFewBitsDetailForm.controls.change_career.value !== null &&
          this.lastFewBitsDetailForm.controls.change_career.value !== ''
            ? this.lastFewBitsDetailForm.controls.change_career.value[0]
            : '',
        passion: this.lastFewBitsDetailForm.controls.passion.value,
        languages: this.lastFewBitsDetailForm.controls.language.value,
        joining_status:
          this.lastFewBitsJoinDetailForm.controls.joining_status.value,
        join_within:
          this.lastFewBitsJoinDetailForm.controls.joining_within.value,
        salary_range: {
          min: this.value,
          max: this.highValue,
        },
        last_drawn_salary_range: {
          min: this.Dvalue,
          max: this.DhighValue,
        },
        on_board: this.onBoardDetailForm.controls.onboard.value,
      };
    }

    console.log(json);
    this.SpinnerService.show();
    this.authService.saveCandidateRegistration(json).subscribe((res) => {
      console.log('is it getting here?');

      console.log(res, 'redirect');
      // window.location.replace('/dashboard/candidate');
      if (res.result === 'success') {
        this.router.navigate(['/dashboard/candidate']);

        const body = {
          user_id: localData._id,
        };
        this.authService.updateCandidateStatus(body).subscribe((res) => {
          this.SpinnerService.hide();
          console.log(res);

          this.router.navigate(['/dashboard/candidate']);
          this._toastrService.success('Registration successfully', 'Success');
        });
        $('#almostdonemodal').modal('hide');
        this.getUserTempData();
      }
    });
    // }
  }
  checkJoiningDaya() {
    console.log('checkJoiningDaya');
    if (
      this.lastFewBitsJoinDetailForm.controls.joining_within.value === 'later'
    ) {
      // this._toastrService.warning(
      //   'Only immediate candidates allow who join within 7 to 15 days',
      //   'Warning'
      // );
      this.cannotGo = true;
    } else {
      this.cannotGo = false;
    }
  }
  setUpFormData() {
    console.log(this.tempFormData);
    const objectKeys = Object.keys(this.tempFormData);
    console.log(objectKeys);
    if (objectKeys.length > 0) {
      if (objectKeys.includes('candidateModalCenter')) {
        console.log(this.tempFormData['candidateModalCenter'].user_role);
        this.userRoleForm.controls.user_role.setValue(
          this.tempFormData['candidateModalCenter'].user_role.toString()
        );
        const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
        localData['role'] = Number(this.userRoleForm.controls.user_role.value);
        sessionStorage.setItem('_ud', JSON.stringify([localData]));
        if (objectKeys.includes('candidateModalCenterupload')) {
          console.log(
            this.tempFormData[
              'candidateModalCenterupload'
            ].address_details.state.toString()
          );
          this.profileImagUrl =
            this.tempFormData[
              'candidateModalCenterupload'
            ].address_details.profile_url;
          this.addressForm.controls.street.setValue(
            this.tempFormData['candidateModalCenterupload'].address_details
              .street
          );
          this.addressForm.controls.state.setValue([
            this.tempFormData['candidateModalCenterupload'].address_details
              .state,
          ]);
          this.addressForm.controls.zip_code.setValue(
            this.tempFormData['candidateModalCenterupload'].address_details
              .zip_code
          );
          this.addressForm.controls.landmark.setValue(
            this.tempFormData['candidateModalCenterupload'].address_details
              .landmark
          );
          // this.addressForm.controls.organization_strength.setValue(this.tempFormData['candidateModalCenterupload'].address_details.organization_strength);
          if (objectKeys.includes('candidateModalExperience')) {
            this.experienceTypeForm.controls.experience_type.setValue(
              this.tempFormData['candidateModalExperience'].experience_data
                .experience_type
            );
            if (
              this.tempFormData['candidateModalExperience'].experience_data
                .experience_type === 'Experienced'
            ) {
              (<FormArray>(
                this.experienceDetailForm.get('experienceDetails')
              )).clear();
              this.tempFormData[
                'candidateModalExperience'
              ].experience_data.experience_details.forEach((x, i) => {
                (<FormArray>(
                  this.experienceDetailForm.get('experienceDetails')
                )).push(
                  this.formBuilder.group({
                    company: [x.company, Validators.required],
                    state: [[x.state], Validators.required],
                    city: [[x.city], Validators.required],
                    other_city: [x.other_city],
                    start_date: [x.start_date, Validators.required],
                    end_date: [x.end_date, Validators.required],
                    job_description: [x.job_description, Validators.required],
                    currently_working: [x.currently_working],
                  })
                );
                if (x.currently_working) {
                  console.log(this.experienceDetailForm.controls);
                  this.experienceDetailForm.controls.experienceDetails[
                    'controls'
                  ][i]['controls']['end_date'].disable();
                  // this.experienceDetailForm.controls.experienceDetails['controls'][i]['end_date'].setValue('')
                }
              });

              this.companyTimeLineData =
                this.tempFormData[
                  'candidateModalExperience'
                ].experience_data.timeline_details;
            }
            if (objectKeys.includes('candidateModalEducation')) {
              this.educationTypeForm.controls.education_type.setValue(
                this.tempFormData['candidateModalEducation'].education_data
                  .education_type
              );
              if (
                this.tempFormData['candidateModalEducation'].education_data
                  .education_type === 'Educated'
              ) {
                this.educationDetailForm.controls.school_name.setValue(
                  this.tempFormData['candidateModalEducation'].education_data
                    .education_details.school_name
                );
                this.educationDetailForm.controls.degree.setValue(
                  this.tempFormData['candidateModalEducation'].education_data
                    .education_details.degree
                );
                this.educationDetailForm.controls.field_of_study.setValue(
                  this.tempFormData['candidateModalEducation'].education_data
                    .education_details.field_of_study
                );
                this.educationDetailForm.controls.start_month.setValue(
                  this.tempFormData['candidateModalEducation'].education_data
                    .education_details.start_date.month
                );
                this.educationDetailForm.controls.start_year.setValue(
                  this.tempFormData['candidateModalEducation'].education_data
                    .education_details.start_date.year
                );
                this.educationDetailForm.controls.end_month.setValue(
                  this.tempFormData['candidateModalEducation'].education_data
                    .education_details.end_date.month
                );
                this.educationDetailForm.controls.end_year.setValue(
                  this.tempFormData['candidateModalEducation'].education_data
                    .education_details.end_date.year
                );
                this.educationDetailForm.controls.currently_studying.setValue(
                  this.tempFormData['candidateModalEducation'].education_data
                    .education_details.currently_studying
                );
                if (
                  this.tempFormData['candidateModalEducation'].education_data
                    .education_details.currently_studying
                ) {
                  this.educationDetailForm.controls.end_month.setValue('');
                  this.educationDetailForm.controls.end_year.setValue('');
                  this.educationDetailForm.controls.end_month.disable();
                  this.educationDetailForm.controls.end_year.disable();
                }
                this.educationDetailForm.controls.grade.setValue(
                  this.tempFormData['candidateModalEducation'].education_data
                    .education_details.grade
                );
                this.educationDetailForm.controls.description.setValue(
                  this.tempFormData['candidateModalEducation'].education_data
                    .education_details.description
                );
              }
              if (objectKeys.includes('candidateModallastbits')) {
                this.lastFewBitsDetailForm.controls.current_career.setValue([
                  this.tempFormData['candidateModallastbits'].last_few_bits
                    .current_career,
                ]);
                this.lastFewBitsDetailForm.controls.soft_skills.setValue(
                  this.tempFormData['candidateModallastbits'].last_few_bits
                    .soft_skills
                );
                this.lastFewBitsDetailForm.controls.technical_skills.setValue(
                  this.tempFormData['candidateModallastbits'].last_few_bits
                    .technical_skills
                );
                this.lastFewBitsDetailForm.controls.changecareer.setValue(
                  this.tempFormData['candidateModallastbits'].last_few_bits
                    .changecareer
                );
                this.lastFewBitsDetailForm.controls.change_career.setValue([
                  this.tempFormData['candidateModallastbits'].last_few_bits
                    .change_career,
                ]);
                this.lastFewBitsDetailForm.controls.passion.setValue(
                  this.tempFormData['candidateModallastbits'].last_few_bits
                    .passion
                );
                this.lastFewBitsDetailForm.controls.language.setValue(
                  this.tempFormData['candidateModallastbits'].last_few_bits
                    .language
                );
                if (objectKeys.includes('candidateModallastbitsfinal')) {
                  this.lastFewBitsJoinDetailForm.controls.joining_status.setValue(
                    this.tempFormData['candidateModallastbitsfinal']
                      .last_few_join.joining_status
                  );
                  this.lastFewBitsJoinDetailForm.controls.joining_within.setValue(
                    this.tempFormData['candidateModallastbitsfinal']
                      .last_few_join.join_within
                  );
                  this.resumeFileUrl =
                    this.tempFormData[
                      'candidateModallastbitsfinal'
                    ].last_few_join.resume_url;
                  this.visumeFileUrl =
                    this.tempFormData[
                      'candidateModallastbitsfinal'
                    ].last_few_join.visume_url;
                  this.value =
                    this.tempFormData['candidateModallastbitsfinal']
                      .last_few_join.salary_range?.min !== undefined
                      ? this.tempFormData['candidateModallastbitsfinal']
                          .last_few_join.salary_range.min
                      : 0;
                  this.highValue =
                    this.tempFormData[
                      'candidateModallastbitsfinal'
                    ].last_few_join.salary_range?.max;
                  if (objectKeys.includes('gainmorevisibilitymodal')) {
                    this.onBoardDetailForm.controls.onboard.setValue(
                      this.tempFormData['gainmorevisibilitymodal'].on_board
                    );
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  setUpEmployerFormData() {
    console.log(this.tempFormData);
    const objectKeys = Object.keys(this.tempFormData);
    console.log(objectKeys);
    if (objectKeys.length > 0) {
      if (objectKeys.includes('candidateModalCenter')) {
        console.log(this.tempFormData['candidateModalCenter'].user_role);
        this.userRoleForm.controls.user_role.setValue(
          this.tempFormData['candidateModalCenter'].user_role.toString()
        );
        const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
        localData['role'] = Number(this.userRoleForm.controls.user_role.value);
        sessionStorage.setItem('_ud', JSON.stringify([localData]));
        if (objectKeys.includes('candidateModalCenterupload')) {
          console.log(
            this.tempFormData[
              'candidateModalCenterupload'
            ].address_details.state.toString()
          );
          this.profileImagUrl =
            this.tempFormData[
              'candidateModalCenterupload'
            ].address_details.profile_url;
          this.addressForm.controls.street.setValue(
            this.tempFormData['candidateModalCenterupload'].address_details
              .street
          );
          this.addressForm.controls.state.setValue([
            this.tempFormData['candidateModalCenterupload'].address_details
              .state,
          ]);
          this.addressForm.controls.zip_code.setValue(
            this.tempFormData['candidateModalCenterupload'].address_details
              .zip_code
          );
          this.addressForm.controls.landmark.setValue(
            this.tempFormData['candidateModalCenterupload'].address_details
              .landmark
          );
          // if(objectKeys.includes(''))
        }
      }
    }
  }
  compantDetailsFormSubmit() {
    this.companySubmit = true;
    if (this.companydetailsForm.valid) {
      const localData = JSON.parse(sessionStorage.getItem('_ud'))[0];
      const json = {
        user_id: localData._id,
        company_logo: this.profileImagUrl,
        address_details: {
          street: this.addressForm.controls.street.value,
          state: this.addressForm.controls.state.value[0],
          zip_code: this.addressForm.controls.zip_code.value,
          landmark: this.addressForm.controls.landmark.value,
          // "organization_strength": this.addressForm.controls.organization_strength.value
        },
        company_name: this.companydetailsForm.controls.company_name.value,
        no_of_employees: this.companydetailsForm.controls.no_of_employees.value,
        website: this.companydetailsForm.controls.company_website.value,
        linkedin_url: this.companydetailsForm.controls.linkedin_url.value,
        official_mail_id:
          this.companydetailsForm.controls.official_mail_address.value,
      };
      console.log(json);
      this.SpinnerService.show();
      this.authService.employerRegister(json).subscribe((res) => {
        if (res.result === 'success') {
          const body = {
            user_id: localData._id,
          };
          this.authService.updateCandidateStatus(body).subscribe((res) => {
            this.SpinnerService.hide();
            this._toastrService.success('Registration successfully', 'Success');
            this.router.navigate(['/dashboard/employer']);
          });
          $('#companyDetailsModal').modal('hide');
          this.getUserTempData();
        }
      });
    }
  }
  uploadFile(file, type) {
    console.log(file);

    const contentType = file[0].type;
    if (file[0].size > 2200000) {
      window.alert('file too large');
      return;
    }
    this.completion = 100;
    const params = {
      Bucket: environment.Bucket,
      Key: 'Rekonnect' + file[0].name,
      Body: file[0],
      ACL: 'public-read',
      ContentType: contentType,
    };
    const self = this;
    this.bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      if (type === 'profile_url') {
        self.profileImagUrl = data.Location;
      }
      if (type === 'resume_url') {
        self.resumeFileUrl = data.Location;
      }
      if (type === 'visume_url') {
        self.visumeFileUrl = data.Location;
      }
    });
  }
  openFile(resumeUrl) {
    console.log(resumeUrl);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.href = resumeUrl;
    a.download = 'resume';
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }
  // log(val) { console.log(val); }
}
