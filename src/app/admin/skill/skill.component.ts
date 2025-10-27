import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillService } from '../../services/skill/skill.service';
import { ISkill } from '../../models/skill.model';
import { environment } from '../../../environments/environment';

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
      monthsOfExperience: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  // Add new skill
  addSkill() {
    const skill: ISkill = this.skillForm.value;

    if (environment.useMockData) {
      if (this.skillForm.invalid) return;
      const nextId = this.skills.length ? Math.max(...this.skills.map(u => u.id)) + 1 : 1;
      this.skills.push({ id: nextId, ...this.skillForm.value });
      this.skillForm.reset({ active: false });
    } else {
      this.skillService.createSkill(skill).subscribe({
        next: (res) => {
          console.log('Created skill:', res);
          this.skillForm.reset({ active: false });
          this.getAllSkills();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

  }

  // Start editing a skill
  startEdit(skill: ISkill) {
    this.editingSkillId = skill.id;
    this.editSkillForm = this.fb.group({
      id: [skill.id],
      skillName: [skill.skillName, Validators.required],
      proficiency: [skill.proficiency, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      monthsOfExperience: [skill.monthsOfExperience, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  /** Update skill */
  updateSkill(): void {
    if (!this.editSkillForm || this.editSkillForm.invalid) return;

    const updatedSkill: ISkill = this.editSkillForm.value;
    const skillId = this.editingSkillId!;

    if (environment.useMockData) {
      const index = this.skills.findIndex(u => u.id === skillId);
      if (index > -1) {
        this.skills[index] = { ...this.skills[index], ...updatedSkill };
      }
      this.cancelEdit();
    } else {
      this.skillService.updateSkill(skillId, updatedSkill).subscribe({
        next: (response) => {
          console.log('Skill updated:', response);
          this.cancelEdit();
          this.getAllSkills();
        },
        error: (err) => console.error('Update skill error:', err)
      });
    }
  }

  // ✅ Cancel edit
  cancelEdit() {
    this.editingSkillId = null;
    this.editSkillForm = null;
  }

  /** Delete skill */
  deleteSkill(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    if (environment.useMockData) {
      this.skills = this.skills.filter(u => u.id !== id);
    } else {
      this.skillService.deleteSkill(id).subscribe({
        next: (response) => {
          console.log('User deleted:', response);
          this.getAllSkills();
        },
        error: (err) => console.error('Delete user error:', err)
      });
    }
  }

  getAllSkills() {
    this.skillService.getSkills().subscribe(data => {
      this.skills = data;
    });
  }
}
