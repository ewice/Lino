import { Project } from './project';
import { Invitation } from './invitation';

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
  activeProjects: [{pid: string, startTime?: number}];
  finishedProjects: [{pid: string, startTime?: number, endTime?: number}];
  favProjects: string[];
  friends: string[];
  invitations: Invitation[];

  updateUser?(user: User) {}
}
