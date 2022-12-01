import { Level } from "./level.model";
import { PostedBy } from "./postedBy.model";
import { Technology } from "./technologie.model";
import { Type } from "./type.model";

export interface ISubject {
  subjectId?: number,
  title?: string,
  description?: string,
  technologies?: Technology[],
  level?: Level | null,
  type?: Type | null,
  postedBy?: PostedBy,
  subjectState?: string,
}
