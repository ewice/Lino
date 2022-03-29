import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpService} from '../../../core/http/http.service';
import { ProjectDetail } from 'src/app/shared/models/project-detail';
import { Category } from 'src/app/shared/models/category';
import { Step } from 'src/app/shared/models/step';
import { AgeRange } from 'src/app/shared/models/age-range';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.sass']
})
export class ProjectCreateComponent implements OnInit {

  projectDetail: ProjectDetail = {
    _id: '',
    title: '',
    description: '',
    imgUrl: '',
    categories: [],
    tools: [],
    difficulty: 0,
    requiredTime: 0,
    steps: [],
    likes: [],
    ageRange: {
      minAge: 0,
      maxAge: 0
    },
    materials: [],
    friendResults: [],
    isFav: false,
    isActive: false,
  };

  categories: Category[] = [];
  materials = [];
  tools = [];
  steps = [];
  file: File = null;
  stepFile: File = null;
  saved = false;

  projectForm = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(1),
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.minLength(1),
      Validators.required
    ]),
    category: new FormControl('', [
      Validators.minLength(1),
      Validators.required
    ]),
    difficulty: new FormControl('', [
      Validators.minLength(1),
      Validators.required
    ]),
    time: new FormControl('', [
      Validators.min(1),
      Validators.max(999),
      Validators.required
    ]),
    minAge: new FormControl('', [
      Validators.min(1),
      Validators.max(99),
      Validators.required
    ]),
    maxAge: new FormControl('', [
      Validators.min(1),
      Validators.max(99),
      Validators.required
    ]),
  });

  materialForm = new FormGroup({
    material: new FormControl('', Validators.required)
  });

  toolForm = new FormGroup({
    tool: new FormControl('', Validators.required)
  });

  stepForm = new FormGroup({
    stepTitle: new FormControl('', Validators.required),
    stepDescription: new FormControl('', Validators.required),
    stepImage: new FormControl('', Validators.required)
  });

  constructor(private http: HttpService, private router: Router) {}

  ngOnInit() {
    this.http.getItem('category').subscribe( data => {
      this.categories = data;
    });
  }

  get name() { return this.projectForm.get('name'); }
  get description() { return this.projectForm.get('description'); }
  get category() { return this.projectForm.get('category'); }
  get difficulty() { return this.projectForm.get('difficulty'); }
  get time() { return this.projectForm.get('time'); }
  get minAge() { return this.projectForm.get('minAge'); }
  get maxAge() { return this.projectForm.get('maxAge'); }
  get material() { return this.materialForm.get('material'); }
  get tool() { return this.toolForm.get('tool'); }
  get stepTitle() { return this.stepForm.get('stepTitle'); }
  get stepDescription() { return this.stepForm.get('stepDescription'); }
  get stepImage() { return this.stepForm.get('stepImage'); }

  async createProject() {
    if (this.saved) {
      const image = new FormData();
      image.append('imgUrl', this.file);

      // this.projectDetail.steps = this.steps;
      this.projectDetail.materials = this.materials;
      this.projectDetail.tools = this.tools;

      for (const key in this.steps) {
        if (this.steps.hasOwnProperty(key)) {
          if (this.steps[key].imgUrl != null) {
            const stepImage = new FormData();
            stepImage.append('imgUrl', this.steps[key].imgUrl);

            const upload = await this.uploadImage(stepImage);
            upload.subscribe( data => {
              this.steps[key].imgUrl = data.imgUrl;
              this.projectDetail.steps.push(this.steps[key]);
            });
          }
        }
      }

      this.http.postItem(image, 'upload').subscribe( data => {

        this.projectDetail.imgUrl = data.imgUrl;

        this.http.postItem(this.projectDetail, 'project').subscribe( async newProject => {
          for (const projectCategory of newProject.categories) {
            await this.saveIdInCategory(projectCategory, newProject._id);
          }
          this.router.navigate(['/project']);
        },
        err => {
          console.log(err);
        });
      },
      err => {
        console.log(err);
      });
    }
  }

  /* Project Detail */
  saveProjectDetail() {
    this.projectDetail.title = this.name.value;
    this.projectDetail.description = this.description.value;
    this.projectDetail.categories = this.categories;
    this.projectDetail.difficulty = this.difficulty.value;
    this.projectDetail.requiredTime = this.time.value;
    this.projectDetail.ageRange = {
      minAge: this.minAge.value,
      maxAge: this.maxAge.value
    };
    this.saved = true;
  }

  saveIdInCategory(projectCategory, projectId) {
    this.http.getItem('category', projectCategory._id).subscribe( category => {
      category[0].projects.push(projectId);
      this.http.patchItem(category[0], 'category/' + category[0]._id).subscribe( updatedCategory => {
      });
    });
  }

  /* Materialien */
  addMaterial() {
    this.materials.push(this.material.value);
    this.material.reset();
  }

  deleteMaterial(index) {
    this.materials.splice(index, 1);
  }

  /* Werkzeuge */
  addTool() {
    this.tools.push(this.tool.value);
    this.tool.reset();
  }

  deleteTool(index) {
    this.tools.splice(index, 1);
  }

  /* Anleitung */
  addStep() {
    this.steps.push({
      title: this.stepTitle.value,
      description: this.stepDescription.value,
      imgUrl: this.stepFile
    });
    this.stepTitle.reset();
    this.stepDescription.reset();
    this.stepImage.reset();
    this.stepFile = null;
  }

  deleteStep(index) {
    this.steps.splice(index, 1);
  }

  /* Image Handling */
  onFileSelect(event, type) {
    if (event.target.files.length > 0) {
      if (type === 'step') {
        this.stepFile = (event.target.files[0] as File);
      } else {
        this.file = (event.target.files[0] as File);
      }
    }
  }

  uploadImage(image) {
    return this.http.postItem(image, 'upload');
  }

  /* Accordion */
  toggleAccordion(event) {
    event.target.classList.toggle('active');
    const panel = event.target.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  }
}
