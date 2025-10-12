import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  pageTitle = "User Management";

  users: IUser[] = [];
  statuses = ['Active', 'Inactive'];

  userForm!: FormGroup;
  editUserForm: FormGroup | null = null;
  editingUserId: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllUsers();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', 
        [
          Validators.required, 
          Validators.pattern(/^[0-9]+$/),
          Validators.min(18),
          Validators.max(60)
        ]],
      active: [false]
    });
  }

  // Add new user
  addUser() {
    const user: IUser = this.userForm.value;

    if(environment.useMockData) {
      if (this.userForm.invalid) return;
      const nextId = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
      this.users.push({ id: nextId, ...this.userForm.value });
      this.userForm.reset({ active: false });
    } else {
      this.userService.createUser(user).subscribe({
        next: (res) => {
          console.log('Created user:', res);
          this.userForm.reset({ active: false });
          this.getAllUsers();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

  }

  // Start editing a user
  startEdit(user: IUser) {
    this.editingUserId = user.id;
    this.editUserForm = this.fb.group({
      id: [user.id],
      name: [user.name, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      age: [user.age, 
        [
          Validators.required, 
          Validators.pattern(/^[0-9]+$/),
          Validators.min(18),
          Validators.max(60)
        ]],
      active: [user.active, Validators.required],
    });
  }

  cancelEdit() {
    this.editingUserId = null;
    this.editUserForm = null;
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  /** Update user */
  updateUser(): void {
    if (!this.editUserForm || this.editUserForm.invalid) return;

    const updatedUser: IUser = this.editUserForm.value;
    const userId = this.editingUserId!;

    if (environment.useMockData) {
      const index = this.users.findIndex(u => u.id === userId);
      if (index > -1) {
        this.users[index] = { ...this.users[index], ...updatedUser };
      }
      this.cancelEdit();
    } else {
      this.userService.updateUser(userId, updatedUser).subscribe({
        next: (response) => {
          console.log('User updated:', response);
          this.cancelEdit();
          this.getAllUsers();
        },
        error: (err) => console.error('Update user error:', err)
      });
    }
  }

  /** Delete user */
  deleteUser(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    if (environment.useMockData) {
      this.users = this.users.filter(u => u.id !== id);
    } else {
      this.userService.deleteUser(id).subscribe({
        next: (response) => {
          console.log('User deleted:', response);
          this.getAllUsers();
        },
        error: (err) => console.error('Delete user error:', err)
      });
    }
  }
  
}
