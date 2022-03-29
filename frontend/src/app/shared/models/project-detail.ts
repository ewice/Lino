import { AgeRange } from './age-range';
import { Category } from './category';
import { Project } from './project';
import { Step } from './step';

export class ProjectDetail extends Project {
  categories: Category[];
  tools: string[];
  difficulty: number;
  requiredTime: number;
  steps: Step[];
  likes: string[];
  ageRange: AgeRange;
  materials: [];
  friendResults: string[];
  friendResultsObj: [];
  isActive: boolean;

  favor(projectId: string) {}

  toggleProjectStatus(projectId: string) {}

  toggleLike(userId: string) {}
}
