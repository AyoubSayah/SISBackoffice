import { Department } from "src/app/core/services/subjects/models/department.model";
import { Level } from "src/app/core/services/subjects/models/level.model";
import { PostedBy } from "src/app/core/services/subjects/models/postedBy.model";
import { Subject } from "src/app/core/services/subjects/models/subject.model";
import { Technology } from "src/app/core/services/subjects/models/technologie.model";
import { Type } from "src/app/core/services/subjects/models/type.model";

export interface SubjectsState {
  subjects: Subject[];
  technologys: Technology[];
  levels: Level[];
  types: Type[];
  persons: PostedBy[];
  departments: Department[];
}
export const initialState: SubjectsState = {
  subjects: [],
  technologys: [],
  levels: [],
  types: [],
  persons: [],
  departments: [],
};
