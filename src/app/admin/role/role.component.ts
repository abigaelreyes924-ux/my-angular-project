import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../../services/role/role.service';
import { IRole } from '../../models/role.model';

interface Position { id: number; name: string; }
interface Department { id: number; name: string; }

@Component({
  selector: 'app-role.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {

  pageTitle = "Role Management";

   positions: Position[] = [
    { id: 1, name: 'Software Developer' },
    { id: 2, name: 'Cyber Security Analyst' },
    { id: 3, name: 'IT Support Specialist' }
  ];

  departments: Department[] = [
    { id: 1, name: 'Engineering Department' },
    { id: 2, name: 'Cyber Security Department' },
    { id: 3, name: 'Operations Department' }
  ];

  // Dropdown options
  statuses = ['Active', 'Inactive'];

  roles: IRole[] = [];

  roleForm!: FormGroup;
  editRoleForm: FormGroup | null = null;
  editingRoleId: number | null = null;

  constructor(private fb: FormBuilder, private roleService: RoleService) {
      }

   ngOnInit(): void {
    this.initForm();
    this.getAllRoles();
  }

  private initForm(): void {
    this.roleForm = this.fb.group({
      roleName: ['', Validators.required],
      position: [this.positions[0].name, Validators.required],
      department: [this.departments[0].name, Validators.required],
      isActive: ['Active', Validators.required], // default value
    });
  }

  // ✅ Add new role
  addRole() {
    if (this.roleForm.invalid) return;
    const nextId = this.roles.length ? Math.max(...this.roles.map(u => u.id)) + 1 : 1;
    this.roles.push({ id: nextId, ...this.roleForm.value });
    this.roleForm.reset({
      position: this.positions[0].name,
      department: this.departments[0].name,
      isActive: this.statuses[0],
      });
  }

   // ✅ Start editing role
    startEdit(role: IRole) {
      this.editingRoleId = role.id;
      this.editRoleForm = this.fb.group({
        roleName: [role.roleName, Validators.required],
        position: [role.position, Validators.required],
        department: [role.department, Validators.required],
        isActive: [role.isActive, Validators.required],
      });
    }

        // ✅ Save changes
  saveEdit() {
    if (!this.editRoleForm || this.editRoleForm.invalid) return;
    const index = this.roles.findIndex(u => u.id === this.editingRoleId);
    if (index > -1) {
      this.roles[index] = { id: this.editingRoleId!, ...this.editRoleForm.value };
    }
    this.cancelEdit();
  }

   // ✅ Cancel edit
  cancelEdit() {
    this.editingRoleId = null;
    this.editRoleForm = null;
  }

  // ✅ Delete role
  deleteRole(id: number) {
    this.roles = this.roles.filter(u => u.id !== id);
  }

  getAllRoles() {
    this.roleService.getRoles().subscribe(data => {
      this.roles = data;
    });
  }
}
