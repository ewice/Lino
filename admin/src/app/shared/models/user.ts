import { Project } from './project';

export class User {
  // tslint:disable-next-line:variable-name
  _id: string;
  token: string;
  username: string;
  firstname: string;
  email: string;
  password: string;
  profilImageUrl: string;
  birthyear: number;
  activeProjects: Project[];
  finishedProjects: Project[];
  favProjects: Project[];
  friends: string[];
  invitations: string[];

  updateUser?(user: User) {}
}
