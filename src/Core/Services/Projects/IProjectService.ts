import {
  AddActivityRequest,
  CreateProjectRequest,
  DeleteActivityRequest,
  GetAllResult,
  GetResult,
  UpdateActivityRequest,
  UpdateProjectRequest,
} from "@dto/Projects";
import { ProjectId } from "./Types";

export interface IProjectService {

  get(id: ProjectId): Promise<GetResult>;

  getAll(): Promise<GetAllResult>;

  create(request: CreateProjectRequest): Promise<void>;

  update(request: UpdateProjectRequest): Promise<void>;

  delete(id: ProjectId): Promise<void>;

  isAvailableToRun(id: ProjectId): Promise<boolean>;

  addActivity(request: AddActivityRequest): Promise<void>;

  updateActivity(request: UpdateActivityRequest): Promise<void>;

  deleteActivity(request: DeleteActivityRequest): Promise<void>;

}
