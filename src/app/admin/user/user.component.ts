import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  pageTitle = "User Management";

  users: IUser[] = [];

  userForm!: FormGroup;
  editUserForm: FormGroup | null = null;
  editingUserId: number | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllUsers();  // 👈 best place to call it
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  // ✅ Add new user
  addUser() {
    if (this.userForm.invalid) return;
    const nextId = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    this.users.push({ id: nextId, ...this.userForm.value });
    this.userForm.reset();
  }

  // ✅ Start editing a user
  startEdit(user: IUser) {
    this.editingUserId = user.id;
    this.editUserForm = this.fb.group({
      name: [user.name, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  // ✅ Save changes
  saveEdit() {
    if (!this.editUserForm || this.editUserForm.invalid) return;
    const index = this.users.findIndex(u => u.id === this.editingUserId);
    if (index > -1) {
      this.users[index] = { id: this.editingUserId!, ...this.editUserForm.value };
    }
    this.cancelEdit();
  }

  // ✅ Cancel edit
  cancelEdit() {
    this.editingUserId = null;
    this.editUserForm = null;
  }

  // ✅ Delete user
  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

}
