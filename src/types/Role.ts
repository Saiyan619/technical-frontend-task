export interface Role {
  id: number;
  name: string;
  department: string;
}


export interface FormData {
  name: string;
  description: string;
  selectedRoles: Role[];
}