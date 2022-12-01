
import { Level } from "./level.model";
import { PostedBy } from "./postedBy.model";
import { Technology } from "./technologie.model";
import { Type } from "./type.model";

export class Subject {
  constructor(
    public subjectId: number,
    public title: string,
    public description: string,
    public technologies: Technology[],
    public level: Level,
    public type: Type,
    public postedBy: PostedBy,
    public subjectState: string,
  ) { }
}
