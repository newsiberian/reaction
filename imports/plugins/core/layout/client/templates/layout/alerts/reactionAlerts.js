import { Meteor } from "meteor/meteor";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { _ } from "lodash";

// Extends Bootstaps alerts and add more alert types
Meteor.startup(function () {
  sAlert.config({
    effect: "stackslide",
    position: "bottom-left",
    timeout: 5000,
    html: false,
    onRouteClose: true,
    stack: true,
    // or you can pass an object:
    // stack: {
    //     spacing: 10 // in px
    //     limit: 3 // when fourth alert appears all previous ones are cleared
    // }
    offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
    beep: false
    // examples:
    // beep: '/beep.mp3'  // or you can pass an object:
    // beep: {
    //     info: '/beep-info.mp3',
    //     error: '/beep-error.mp3',
    //     success: '/beep-success.mp3',
    //     warning: '/beep-warning.mp3'
    // }
    // onClose: _.noop //
    // examples:
    // onClose: function() {
    //     /* Code here will be executed once the alert closes. */
    // }
  });
});

Object.assign(Alerts, {

  inline(alertMessage, type, alertOptions) {
    // Convert error to danger, for inlineAlerts
    const mode = type === "error" ? "danger" : type;
    return this.add(alertMessage, mode, alertOptions);
  },

  /**
   * Show a popup alert
   * @example
   * // Simple
   * Alerts.alert("title", "message", {}, callbackFunction);
   * // - OR, for more control -
   * Alerts.alert({
   * 	title: "Title",
   * 	text: "Message Text",
   * 	type: "success|info|warning|error|"
   * }, callbackFunction);
   *
   * @param  {String|Object} titleOrOptions Pass a string or an object containing options
   * @param  {[type]}   messageOrCallback [description]
   * @param  {[type]}   options           [description]
   * @param  {Function} callback          [description]
   * @return {[type]}                     [description]
   */
  alert(titleOrOptions, messageOrCallback, options, callback) {
    if (_.isObject(titleOrOptions)) {
      return swal({
        type: "info",
        ...titleOrOptions
      }).then(messageOrCallback);
    }

    let title = titleOrOptions;
    let message = messageOrCallback;

    return swal({
      title,
      message,
      type: "info",
      ...options
    }).then(callback);
  },

  toast(message, type, options) {
    switch (type) {
    case "error":
    case "warning":
    case "success":
    case "info":
      return sAlert[type](message, options);
    default:
      return sAlert.success(message, options);
    }
  }
});
