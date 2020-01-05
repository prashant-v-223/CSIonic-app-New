import { trigger, style, animate, transition, AnimationTriggerMetadata, AnimationTransitionMetadata } from '@angular/animations';

export function fontSizeEnterLeave(timing: string = '.3s'): AnimationTriggerMetadata {

  return trigger('fontSizeEnterLeave', [
    fontSizeEnter(timing),
    fontSizeLeave(timing)
  ]);
}

export function fontSizeEnter(timing: string = '.3s'): AnimationTransitionMetadata {
  return transition(':enter', [
    style({ fontSize: '0px' }),
    animate(timing, style({
      fontSize: '*'
    }))
  ]);
}

export function fontSizeLeave(timing: string = '.3s'): AnimationTransitionMetadata {
  return transition(':leave', [
    animate(timing, style({
      fontSize: '0'
    }))
  ]);
}