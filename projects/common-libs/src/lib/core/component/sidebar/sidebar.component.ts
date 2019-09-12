
/**
 * @author Mayur Patel.
 * @description This is sidebar component.To render menus in e-servicing portal
 */
import {
  Component, OnInit, Input, ViewContainerRef, ComponentFactoryResolver, ComponentRef, QueryList, ViewChildren, AfterViewInit, TemplateRef, Inject,
  ViewChild, ElementRef, ChangeDetectionStrategy, ComponentFactory,
} from '@angular/core';
import { ToggleAnimation, DropdownAnimation } from './dashboard.animation';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Menu, HelpContent } from '../../models/core.model';
import { SubmenuComponent } from '../../../shared/components/submenu/submenu.component';
import { HelpContentComponent } from '../../../shared/components/help-content/help-content.component';
import { TopbarService } from '../../services/topbar/topbar.service';

/**
 * This is sidebar component.To render menus in e-servicing portal based on user permissions
 */
@Component({
  selector: 'lib-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [ToggleAnimation.bodyExpansion, ToggleAnimation.indicatorRotate, DropdownAnimation.fadeInDown],
  preserveWhitespaces: true,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SidebarComponent implements OnInit, AfterViewInit {


  /** This property is use to store Menus data to render on sidebar from perticular Apps */
  @Input() public menuData: Menu[];
  /** This property is use to store helpContentData data to render on sidebar from perticular Apps */
  @Input() public helpContentData: HelpContent[];
  /** This property is use to store active menu's blank container */
  @ViewChildren('subMenuRef', { read: ViewContainerRef }) public entry: QueryList<ViewContainerRef>;
  /** This property is use to get the reference of active menu position. */
  @ViewChild('menuRef') public elementRef: ElementRef;
  /** Overlay ref for creating helpdesk and submenu */
  public overlayRef: OverlayRef;
  /** Determines whether current route is dashboard or not. */
  public isDashBoard: boolean;
  /** Determines whether side bar collapsed or not. */
  public isSideBarCollapsed: boolean;
  /** To store blank counters for creating submenus */
  public entryArray: ViewContainerRef[];
  /** This property is use to store Window object. */
  private window: Window;

  constructor(
    private resolver: ComponentFactoryResolver,
    private overlay: Overlay,
    @Inject('Window') window: any,
    private topbarService: TopbarService) {
    this.isDashBoard = false;
    this.window = window as Window;
    if (this.window.location.href.indexOf('http://localhost:4200') !== -1) {
      this.isDashBoard = true;
    }
  }

  /**
   * To initalize sidebar and listen service to render menu based on collapsed menu click.
   */
  public ngOnInit(): void {
    this.entryArray = [];
  }

  /**
   * after view init
   */
  public ngAfterViewInit(): void {

    this.entryArray = this.entry.toArray();
    this.topbarService.isCollapsed.subscribe((res: boolean) => {
      this.isSideBarCollapsed = res;
      if (this.menuData != null) {
        if (this.isSideBarCollapsed) {
          this.removeExpandedSubmenu();
        } else {
          this.createExpandedSubmenu();
        }
      }
    });


    this.entry.changes.subscribe(
      () => {
        this.entryArray = this.entry.toArray();
        this.createExpandedSubmenu();
      }
    );
  }

  /**
   * Creates submenu over lay when menu is Collapsed.
   * @param menu to extract submenu from menu object
   * @param index to get the position of container
   */
  public createSubmenuOverLay(menu: Menu, index: number): void {
    const overlayConfigSubmenu: OverlayConfig = new OverlayConfig();
    overlayConfigSubmenu.hasBackdrop = true;
    overlayConfigSubmenu.backdropClass = '';
    overlayConfigSubmenu.positionStrategy = this.overlay.position().flexibleConnectedTo(this.elementRef).withPositions([{
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 0
    }]);
    this.overlayRef = this.overlay.create(overlayConfigSubmenu);
    const portal: ComponentPortal<SubmenuComponent>
      = new ComponentPortal<SubmenuComponent>(SubmenuComponent);
    const componentRef: ComponentRef<SubmenuComponent> = this.overlayRef.attach(portal);
    (componentRef.instance as SubmenuComponent).subMenuData = menu.subMenus;
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach();
    });
  }

  /**
   * Gets overlay help when click on help menu item
   */
  public getOverlayHelp(): void {
    const overlayConfig: OverlayConfig = new OverlayConfig();
    overlayConfig.hasBackdrop = true;
    overlayConfig.backdropClass = '';
    overlayConfig.positionStrategy = this.overlay.position().global().right('0').centerVertically();
    this.overlayRef = this.overlay.create(overlayConfig);
    const portal: ComponentPortal<HelpContentComponent>
      = new ComponentPortal<HelpContentComponent>(HelpContentComponent);
    const componentRef: ComponentRef<HelpContentComponent> = this.overlayRef.attach(portal);
    (componentRef.instance as HelpContentComponent).helpContetData = this.helpContentData;
    (componentRef.instance as HelpContentComponent).removeHelpCentre.subscribe(() => {
      this.overlayRef.detach();
    });
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach();
    });
  }

  /**
   * Disables link
   * @param openFlag 
   */
  public disableLink(openFlag: boolean): void {

  }
  /**
   * Tracks by
   * @param index 
   * @param item 
   * @returns by 
   */
  public trackBy(index: number, item: Menu): number {
    return index;
  }
  /**
   * Creates expanded submenu when isCollasped is false
   */
  private createExpandedSubmenu(): void {
    this.entryArray.forEach((singleEntry: ViewContainerRef) => {
      singleEntry.clear();
    });
    this.menuData.forEach((singleMenu: Menu, index: number) => {
      if (singleMenu.isOpen) {
        const factory: ComponentFactory<SubmenuComponent> = this.resolver.resolveComponentFactory(SubmenuComponent);
        const componentRef: ComponentRef<SubmenuComponent> = this.entryArray[0].createComponent(factory);
        (componentRef.instance as SubmenuComponent).subMenuData = singleMenu.subMenus;
      }
    });
  }

  /**
   * Removes expanded submenu when isCollasped is true
   */
  private removeExpandedSubmenu(): void {
    this.entryArray.forEach((singleEntry: ViewContainerRef) => {
      singleEntry.clear();
    });
  }


}
