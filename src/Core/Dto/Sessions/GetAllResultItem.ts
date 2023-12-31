export type GetAllResultItem = {

  id: string;

  sessionName: string | null;

  projectName: string;

  elapsedTime: number;

  steps: number;

  distance: number;

  maxSpeed: number;

  avgSpeed: number;

  events: number;

  startDate: Date;

  finishDate: Date;

  createdDate: Date;

};
