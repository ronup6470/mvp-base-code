import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Tag } from './tag-family.model';
import { TagFamilyAdapter } from './tag-family-adapter';

@Injectable()
export class TagFamilyService {
  /**
   * Holds Tag info.
   */
  public tagsInfo: Tag[];

  /**
   * Holds current news tag id.
   */
  public tagDetail: Tag;

  constructor( private apollo: Apollo, private tagFamilyAdapter: TagFamilyAdapter ) {

    // console.log('tag family Called');
    
   }

  /**
   * API to get minimal info of all pages for current site.
   */
  public getTags(tagFamilyName: string) {

    return this.apollo.query<any>({
      query: gql`
      query tagFamily($tagFamilyName: String) {
        tagFamily(name: $tagFamilyName) {
          tags {
            elements {
              uuid
              name
            }
          }
        }
      }
      
      `,
      variables: {
        tagFamilyName: tagFamilyName
      },
    })
    .pipe(
      map(response => {
        this.tagsInfo = this.tagFamilyAdapter.toRequest(response);
        return this.tagsInfo;
      })
    );
  }

  /**
   * Provide tag unique id.
   * @param tagName : Holds tag name.
   */
  public getTagIdByName(tagName: string): string {
    this.tagDetail = this.tagsInfo.find((tagInfo: Tag) => {
      return tagInfo.name === tagName;
    })

    return this.tagDetail && this.tagDetail.id;
  }
}
