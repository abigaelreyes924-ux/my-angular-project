import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillService } from '../../services/skill/skill.service';
import { ISkill } from '../../models/skill.model';

@Component({
  selector: 'app-skill.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent {

  pageTitle = "Skill Management";

   skills: ISkill[] = [];

  skillForm!: FormGroup;
  editSkillForm: FormGroup | null = null;
  editingSkillId: number | null = null;

    constructor(private fb: FormBuilder, private skillService: SkillService) {
    }

    ngOnInit(): void {
    this.initForm();
    this.getAllSkills();
  }

    private initForm(): void {
    this.skillForm = this.fb.group({
      skillName: ['', Validators.required],
      proficiency: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],      
      numberOfyears: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }


   // ✅ Add new skill
  addSkill() {
    if (this.skillForm.invalid) return;
    const nextId = this.skills.length ? Math.max(...this.skills.map(u => u.id)) + 1 : 1;
    this.skills.push({ id: nextId, ...this.skillForm.value });
    this.skillForm.reset();
  }

  // ✅ Start editing skill
    startEdit(skill: ISkill) {
      this.editingSkillId = skill.id;
      this.editSkillForm = this.fb.group({
        skillName: [skill.skillName, Validators.required],
        proficiency: [skill.proficiency, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        numberOfyears: [skill.numberOfyears, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      });
    }

    // ✅ Save changes
  saveEdit() {
    if (!this.editSkillForm || this.editSkillForm.invalid) return;
    const index = this.skills.findIndex(u => u.id === this.editingSkillId);
    if (index > -1) {
      this.skills[index] = { id: this.editingSkillId!, ...this.editSkillForm.value };
    }
    this.cancelEdit();
  }

  // ✅ Cancel edit
  cancelEdit() {
    this.editingSkillId = null;
    this.editSkillForm = null;
  }

  // ✅ Delete company
  deleteSkill(id: number) {
    this.skills = this.skills.filter(u => u.id !== id);
  }

  getAllSkills() {
    this.skillService.getSkills().subscribe(data => {
      this.skills = data;
    });
  }
}
