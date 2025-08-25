import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkService } from '../../services/work/work.service';
import { IWork } from '../../models/work.model';

@Component({
  selector: 'app-work',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent {

  pageTitle = "Work Management";

  works: IWork[] = [];

  workForm!: FormGroup;
  editWorkForm: FormGroup | null = null;
  editingWorkId: number | null = null;

  constructor(private fb: FormBuilder, private workService: WorkService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllWorks();
  }

  private initForm(): void {
    this.workForm = this.fb.group({
      companyName: ['', Validators.required],
      dateStarted: ['', Validators.required],
      dateEnded: ['', Validators.required],
    });
  }

  // ✅ Add new company
  addWork() {
    if (this.workForm.invalid) return;
    const nextId = this.works.length ? Math.max(...this.works.map(u => u.id)) + 1 : 1;
    this.works.push({ id: nextId, ...this.workForm.value });
    this.workForm.reset();
  }

  // ✅ Start editing company
  startEdit(work: IWork) {
    this.editingWorkId = work.id;
    this.editWorkForm = this.fb.group({
      companyName: [work.companyName, Validators.required],
      dateStarted: [work.dateStarted, Validators.required],
      dateEnded: [work.dateEnded, Validators.required],
    });
  }

  // ✅ Save changes
  saveEdit() {
    if (!this.editWorkForm || this.editWorkForm.invalid) return;
    const index = this.works.findIndex(u => u.id === this.editingWorkId);
    if (index > -1) {
      this.works[index] = { id: this.editingWorkId!, ...this.editWorkForm.value };
    }
    this.cancelEdit();
  }

  // ✅ Cancel edit
  cancelEdit() {
    this.editingWorkId = null;
    this.editWorkForm = null;
  }

  // ✅ Delete company
  deleteWork(id: number) {
    this.works = this.works.filter(u => u.id !== id);
  }

  getAllWorks() {
    this.workService.getWorks().subscribe(data => {
      this.works = data;
    });
  }

}
