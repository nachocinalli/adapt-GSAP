import Adapt from 'core/js/adapt';

import { gsap } from 'libraries/gsap';
import { ScrollTrigger } from 'libraries/ScrollTrigger';

class GSAP extends Backbone.Controller {
  initialize() {
    this.listenTo(Adapt, 'app:dataReady', this.onDataReady);
  }

  static get courseConfig() {
    return Adapt.course.get('_GSAP');
  }

  isEnabled() {
    return !(!GSAP.courseConfig || !GSAP.courseConfig._isEnabled);
  }

  onDataReady() {
    if (!this.isEnabled()) {
      return;
    }

    this.lib = gsap;
    this.ScrollTrigger = ScrollTrigger;
    this.setup();
  }

  onReady() {
    Adapt.trigger('GSAP:ready');
  }

  setup() {
    this.lib.registerPlugin(ScrollTrigger);
    this.listenToOnce(Adapt, 'adapt:initialize', this.onReady);
  }
}

export default Adapt.GSAP = new GSAP();
