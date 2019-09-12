/**
 * @name UserAccordionPresenter
 * @author Nitesh Sharma
 * @description This is a presenter service for accordion which contains all logic for presentation component
 */

import { Injectable } from '@angular/core';
import { NgbPanelChangeEvent, NgbPanel, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserPresenter {
  private _activeId: string[];
  private primaryColor: string;

  constructor() {
    this._activeId = [];
    this.primaryColor = 'primary-color';
  }

  /** set and get the active id of tabs */
  set activeIds(ids: string[]) {
    this._activeId = ids;
  }
  get activeIds(): string[] {
    return this._activeId;
  }

  /** 
   * @description On change of tabs, it will set the panel type according to its state
   * @param id : This is the panel which we want to set as active
   * @param accordionComponent : This is the accordion component which have the list of panels
   */
  public toggleAccordion(data: NgbPanelChangeEvent, accordionComponent: NgbAccordion): NgbAccordion {
    if (accordionComponent.panels) {
      accordionComponent.panels.toArray().filter((panel: NgbPanel) => {
        if (panel.id === data.panelId && data.nextState) {
          panel.type = this.primaryColor;
        }
        else if (panel.id !== data.panelId) {
          panel.type = '';
        }
      });
    }
    return accordionComponent;
  }

  /** 
   * @description This will set the PrimaryType to the active panel and remove from other panels
   * @param id : This is the panel which we want to set as active
   * @param accordionComponent : This is the accordion component which have the list of panels
   * @param isCancel : This flag is optional, only used when user click on cancel button, then remove the primary type from active tab
   */
  public setPanelPrimaryType(id: string, accordionComponent: NgbAccordion, isCancel?: boolean): NgbAccordion {
    if (accordionComponent.panels) {
      accordionComponent.panels.toArray().forEach((panel: NgbPanel) => {
        panel.type = panel.id === id ? this.primaryColor : '';
      });
    }
    return accordionComponent;
  }


  /** 
   * @description This will set the PrimaryType to the active panel and remove from other panels
   * @param id : This is the panel which we want to set as active
   * @param accordionComponent : This is the accordion component which have the list of panels
   * @param isCancel : This flag is optional, only used when user click on cancel button, then remove the primary type from active tab
   */
  public onCancel(id: string, accordionComponent: NgbAccordion): NgbAccordion {
    if (accordionComponent.panels) {
      this.removeActiveId(id);
      let activePanel = accordionComponent.panels.toArray().find(panel => panel.id === id);
      if (activePanel) {
        this.activeIds = [];
      }
    }
    return accordionComponent;
  }

  /**
   * @description: Remove the active panel id from activeIds list 
   * @param id : This is the panel which we want to remove from the list
   * */
  public removeActiveId(id: string): void {
    const index = this.activeIds.indexOf(id);
    if (index > -1) {
      this.activeIds.splice(index, 1);
    }
  }
}
