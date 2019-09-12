import { Injectable } from '@angular/core';
import { Tag } from './tag-family.model';
import { Adapter } from 'common-libs';

@Injectable()
export class TagFamilyAdapter implements Adapter<Tag>{

  constructor() { }

  public toRequest(response: any): Tag[] {
    const tags: any[] = response.data.tagFamily && response.data.tagFamily.tags.elements;

    return tags && tags.map((tag: any): Tag => {
      return new Tag(tag.uuid, tag.name);
    });
  }
}
