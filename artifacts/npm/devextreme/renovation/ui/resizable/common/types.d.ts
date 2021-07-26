/**
* DevExtreme (renovation/ui/resizable/common/types.d.ts)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export interface ResizeActionArgs {
  event: Event;
  width: number;
  height: number;
  handles: {
    top: boolean;
    right: boolean;
    left: boolean;
    bottom: boolean;
  };
}

export interface DragOffset { offset: { x: number; y: number } }
export interface DragTarget { targetElements?: [] }
export interface DragPosition { clientX: number; clientY: number }
export type DragEvent = Event & DragOffset & DragPosition;
export type DragStartEvent = Event & DragTarget & DragPosition;

export type AreaProp = (() => Area | HTMLElement) | AreaObject | HTMLElement | Window;
export interface MovingSides {
  top: boolean;
  left: boolean;
  right: boolean;
  bottom: boolean;
}

export type Handle = 'top' | 'right' | 'left' | 'bottom';
export type Corner = 'corner-bottom-right' | 'corner-bottom-left' | 'corner-top-right' | 'corner-top-left';
export interface Area {
  width: number;
  height: number;
  offset: {
    left: number;
    top: number;
  };
}

export interface AreaObject {
  top: number;
  right: number;
  left: number;
  bottom: number;
}
